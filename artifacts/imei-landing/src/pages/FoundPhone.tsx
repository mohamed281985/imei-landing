import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, MessageCircle, Phone, Shield, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FoundResponse {
  success: boolean;
  reported?: boolean;
  message?: string;
  owner_name?: string;
  phone?: string;
  whatsapp_enabled?: boolean;
  whatsapp_number?: string;
  code?: string;
}

export default function FoundPhone() {
  const [match, params] = useRoute("/found/:token");
  const token = params?.token;
  const [status, setStatus] = useState<"loading" | "error" | "not-found" | "safe" | "reported">("loading");
  const [data, setData] = useState<FoundResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("not-found");
      return;
    }

    const controller = new AbortController();

    fetch(`https://imei-safe.me/api/found/${encodeURIComponent(token)}`, {
      method: "GET",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("not-found");
          }
          const text = await response.text();
          throw new Error(text || "network-error");
        }

        const json: FoundResponse = await response.json();
        setData(json);

        // تعديل: التحقق من حالة الهاتف بشكل صحيح
        if (json.success) {
          if (json.reported === true) {
            setStatus("reported");
            return;
          } else if (json.reported === false) {
            setStatus("safe");
            return;
          }
        }

        throw new Error(json.message || "not-found");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        if (error.message === "not-found") {
          setStatus("not-found");
          return;
        }

        setErrorMessage(error.message || "حدث خطأ غير متوقع");
        setStatus("error");
      });

    return () => controller.abort();
  }, [token]);

  const whatsappHref = useMemo(() => {
    if (!data?.whatsapp_number) return "";
    return `https://wa.me/${data.whatsapp_number.replace(/[^0-9]/g, "")}`;
  }, [data]);

  const phoneHref = useMemo(() => {
    if (!data?.phone) return "";
    return `tel:${data.phone}`;
  }, [data]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-[#2F80ED] flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#1F2937]">IMEI SAFE</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-[#1F2937] hover:text-[#2F80ED]">الرئيسية</a>
            <a href="#" className="text-[#1F2937] hover:text-[#2F80ED]">كيف يعمل</a>
            <a href="#" className="text-[#1F2937] hover:text-[#2F80ED]">اتصل بنا</a>
          </nav>
          <button className="bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-[#2563EB] transition-colors">
            تسجيل الدخول
          </button>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(247,147,30,0.1),transparent_50%)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 py-10 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex w-full flex-col gap-6 mt-16"
          >
            {status === "loading" && (
              <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-[24px] border border-[#E5E7EB] bg-white/80 p-10 shadow-lg backdrop-blur-lg">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2F80ED]/10 text-[#2F80ED] shadow-inner shadow-[#2F80ED]/10">
                  <div className="animate-spin rounded-full border-4 border-t-[#2F80ED] border-[#E5E7EB] h-16 w-16" />
                </div>
                <p className="mt-6 text-center text-lg font-semibold text-[#1F2937]">جارٍ التحقق من حالة الهاتف...</p>
                <p className="mt-2 max-w-xl text-center text-sm text-[#6B7280]">نبحث في قاعدة بيانات IMEI SAFE للتأكد من حالة هذا الجهاز بأمان تام.</p>
              </div>
            )}

            {(status === "error" || status === "not-found") && (
              <Card className="mx-auto w-full max-w-2xl rounded-[24px] border border-[#EF4444]/20 bg-white shadow-xl backdrop-blur-lg overflow-hidden">
                <CardHeader className="items-start gap-4 px-8 pt-8 text-right bg-[#FEE2E2] pb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444]">
                    <AlertTriangle className="h-9 w-9" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl text-[#1F2937]">رمز QR غير صالح</CardTitle>
                    <CardDescription className="max-w-xl text-sm text-[#991B1B]">
                      تعذر العثور على بيانات هذا الهاتف.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-4 text-right bg-white">
                  <p className="text-sm leading-7 text-[#991B1B]">
                    {status === "error"
                      ? "يرجى التأكد من أن الرابط صحيح أو المحاولة مرة أخرى لاحقاً."
                      : "الرابط الذي فتحته قد يكون منتهي الصلاحية أو يحتوي على رمز غير معتمد."}
                  </p>
                </CardContent>
              </Card>
            )}

            {status === "safe" && data && (
              <Card className="mx-auto w-full max-w-5xl rounded-[24px] border border-[#E5E7EB] bg-white shadow-xl overflow-hidden backdrop-blur-lg">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="px-8 py-10 text-right lg:px-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#22C55E]/10 text-[#22C55E] shadow-lg shadow-[#22C55E]/10">
                      <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-[#1F2937]">هذا الهاتف غير مسجل به إخطار فقد حتى الآن</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4B5563]">
                      لم يتم تسجيل أي بلاغ فقد أو سرقة لهذا الجهاز.
                    </p>

                    <div className="mt-10 space-y-6">
                      <Card className="rounded-[20px] border border-[#E5E7EB] bg-white shadow-lg overflow-hidden">
                        <CardHeader className="text-right bg-[#F0FDF4] pb-6 pt-8 px-8 border-b border-[#E5E7EB]">
                          <CardTitle className="text-xl text-[#1F2937]">ماذا يعني هذا؟</CardTitle>
                          <CardDescription className="text-[#6B7280]">
                            قد يكون الهاتف آمناً، لكن ننصح دائماً بالتأكد من البائع قبل شراء أي هاتف مستعمل.
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card className="rounded-[20px] border border-[#E5E7EB] bg-white shadow-lg overflow-hidden">
                        <CardHeader className="text-right bg-[#F0FDF4] pb-6 pt-8 px-8 border-b border-[#E5E7EB]">
                          <CardTitle className="text-xl text-[#1F2937]">خصوصية الهاتف</CardTitle>
                          <CardDescription className="text-[#6B7280]">
                            لا نعرض أي بيانات شخصية لأن الهاتف غير مُبلغ عنه.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <div className="rounded-[20px] border border-[#2F80ED]/15 bg-white p-8 shadow-xl shadow-[#2F80ED]/5 overflow-hidden">
                      <div className="flex items-center gap-3 text-right">
                        <div className="rounded-2xl bg-[#2F80ED]/10 p-3 text-[#2F80ED]">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-[#2F80ED]">IMEI SAFE</p>
                          <h2 className="mt-3 text-3xl font-semibold text-[#1F2937]">منصة موثوقة للمساعدة في حماية الهواتف.</h2>
                        </div>
                      </div>
                      <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 text-right text-sm text-[#4B5563] shadow-sm shadow-[#E5E7EB] overflow-hidden">
                        هذه الصفحة تعرض حالة الجهاز بعد مسح رمز QR الخاص به، وتؤكد أن الهاتف لم يُبلغ عنه بعد.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {status === "reported" && data && (
              <Card className="mx-auto w-full max-w-5xl rounded-[24px] border border-[#E5E7EB] bg-white shadow-xl overflow-hidden backdrop-blur-lg">
                <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="px-8 py-10 text-right lg:px-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444] shadow-xl shadow-[#EF4444]/10">
                      <AlertTriangle className="h-10 w-10" />
                    </div>
                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-[#1F2937]">هذا الهاتف مُبلغ عنه</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4B5563]">
                      إذا عثرت على هذا الهاتف يرجى التواصل مع المالك.
                    </p>

                    <div className="mt-10 space-y-6">
                      <Card className="rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] shadow-lg overflow-hidden">
                        <CardHeader className="text-right bg-[#FEF2F2] pb-6 pt-8 px-8 border-b border-[#E5E7EB]">
                          <CardTitle className="text-xl text-[#1F2937]">معلومات المالك</CardTitle>
                          <CardDescription className="text-[#6B7280]">
                            جميع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-0 text-right bg-white px-8 pb-8">
                          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden">
                            <p className="text-sm text-[#6B7280]">اسم الماتف</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.owner_name || "غير متوفر"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden">
                            <p className="text-sm text-[#6B7280]">رقم الهاتف</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.phone || "غير متوفر"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden">
                            <p className="text-sm text-[#6B7280]">كود الجهاز</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.code || "غير متوفر"}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                        {data.whatsapp_enabled && data.whatsapp_number && (
                          <Button
                            asChild
                            className="bg-[#22C55E] text-white hover:bg-[#16A34A] rounded-xl text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                            size="lg"
                          >
                            <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 px-6 py-3">
                              <MessageCircle className="h-5 w-5" />
                              واتساب
                            </a>
                          </Button>
                        )}
                        {data.phone && (
                          <Button
                            asChild
                            className="bg-[#2F80ED] text-white hover:bg-[#2563EB] rounded-xl text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                            size="lg"
                          >
                            <a href={phoneHref} className="flex items-center gap-2 px-6 py-3">
                              <Phone className="h-5 w-5" />
                              اتصل الآن
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <div className="rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] p-8 shadow-lg shadow-[#E5E7EB] overflow-hidden">
                      <div className="flex items-center justify-between gap-3 text-right">
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] text-[#6B7280]">تنبيه أمني</p>
                          <h2 className="mt-3 text-3xl font-semibold text-[#1F2937]">احفظ معلومات المالك</h2>
                        </div>
                        <div className="rounded-2xl bg-[#EF4444]/10 p-3 text-[#EF4444]">
                          <Link2 className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 text-right text-[#4B5563] shadow-sm shadow-[#E5E7EB] overflow-hidden">
                        جميـع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>

          {/* Footer */}
          <footer className="mt-16 w-full border-t border-[#E5E7EB] bg-white py-8 px-4 lg:px-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">IMEI SAFE</h3>
                <p className="text-sm text-[#6B7280]">منصة موثوقة لحماية هاتفك من السرقة والضياع</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">روابط سريعة</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li><a href="#" className="hover:text-[#2F80ED]">الرئيسية</a></li>
                  <li><a href="#" className="hover:text-[#2F80ED]">كيف يعمل</a></li>
                  <li><a href="#" className="hover:text-[#2F80ED]">الأسئلة الشائعة</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">الدعم</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li><a href="#" className="hover:text-[#2F80ED]">اتصل بنا</a></li>
                  <li><a href="#" className="hover:text-[#2F80ED]">الشروط والأحكام</a></li>
                  <li><a href="#" className="hover:text-[#2F80ED]">سياسة الخصوصية</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">تابعنا</h3>
                <div className="flex space-x-4 justify-end">
                  <a href="#" className="h-10 w-10 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] hover:bg-[#2F80ED]/20 transition-colors">
                    <span className="sr-only">فيسبوك</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] hover:bg-[#2F80ED]/20 transition-colors">
                    <span className="sr-only">تويتر</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] hover:bg-[#2F80ED]/20 transition-colors">
                    <span className="sr-only">انستغرام</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="container mx-auto mt-8 pt-8 border-t border-[#E5E7EB] text-center text-sm text-[#6B7280]">
              <p>© {new Date().getFullYear()} IMEI SAFE. جميع الحقوق محفوظة.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
