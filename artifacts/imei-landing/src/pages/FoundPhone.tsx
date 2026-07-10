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

    fetch(`/api/found/${encodeURIComponent(token)}`, {
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

        if (json.success && json.reported === false) {
          setStatus("safe");
          return;
        }

        if (json.reported) {
          setStatus("reported");
          return;
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(21,101,192,0.25),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(255,140,0,0.18),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 py-10 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex w-full flex-col gap-6"
          >
            {status === "loading" && (
              <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-blue-200 shadow-inner shadow-slate-950/30">
                  <div className="animate-spin rounded-full border-4 border-t-blue-400 border-slate-600 h-16 w-16" />
                </div>
                <p className="mt-6 text-center text-lg font-semibold text-slate-100/90">جارٍ التحقق من حالة الهاتف...</p>
                <p className="mt-2 max-w-xl text-center text-sm text-slate-400">نبحث في قاعدة بيانات IMEI SAFE للتأكد من حالة هذا الجهاز بأمان تام.</p>
              </div>
            )}

            {(status === "error" || status === "not-found") && (
              <Card className="mx-auto w-full max-w-2xl rounded-[32px] border border-red-500/20 bg-red-950/10 shadow-2xl shadow-red-950/20 backdrop-blur-xl">
                <CardHeader className="items-start gap-4 px-8 pt-8 text-right">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 text-red-300">
                    <AlertTriangle className="h-9 w-9" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl text-white">رمز QR غير صالح</CardTitle>
                    <CardDescription className="max-w-xl text-sm text-red-100/80">
                      تعذر العثور على بيانات هذا الهاتف.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-4 text-right">
                  <p className="text-sm leading-7 text-red-100/80">
                    {status === "error"
                      ? "يرجى التأكد من أن الرابط صحيح أو المحاولة مرة أخرى لاحقاً."
                      : "الرابط الذي فتحته قد يكون منتهي الصلاحية أو يحتوي على رمز غير معتمد."}
                  </p>
                </CardContent>
              </Card>
            )}

            {status === "safe" && data && (
              <Card className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="px-8 py-10 text-right lg:px-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300 shadow-xl shadow-emerald-500/10">
                      <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white">هذا الهاتف غير مسجل به إخطار فقد حتى الآن</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      لم يتم تسجيل أي بلاغ فقد أو سرقة لهذا الجهاز.
                    </p>

                    <div className="mt-10 space-y-6">
                      <Card className="rounded-[28px] border border-white/10 bg-slate-900/80 shadow-lg shadow-slate-950/20">
                        <CardHeader className="text-right">
                          <CardTitle className="text-xl text-white">ماذا يعني هذا؟</CardTitle>
                          <CardDescription className="text-slate-400">
                            قد يكون الهاتف آمناً، لكن ننصح دائماً بالتأكد من البائع قبل شراء أي هاتف مستعمل.
                          </CardDescription>
                        </CardHeader>
                      </Card>

                      <Card className="rounded-[28px] border border-white/10 bg-slate-900/80 shadow-lg shadow-slate-950/20">
                        <CardHeader className="text-right">
                          <CardTitle className="text-xl text-white">خصوصية الهاتف</CardTitle>
                          <CardDescription className="text-slate-400">
                            لا نعرض أي بيانات شخصية لأن الهاتف غير مُبلغ عنه.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <div className="rounded-[28px] border border-blue-500/15 bg-slate-950/80 p-8 shadow-xl shadow-blue-950/10">
                      <div className="flex items-center gap-3 text-right">
                        <div className="rounded-3xl bg-blue-600/15 p-3 text-blue-300">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-blue-300/90">IMEI SAFE</p>
                          <h2 className="mt-3 text-3xl font-semibold text-white">منصة موثوقة للمساعدة في حماية الهواتف.</h2>
                        </div>
                      </div>
                      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-right text-sm text-slate-300 shadow-sm shadow-slate-950/10">
                        هذه الصفحة تعرض حالة الجهاز بعد مسح رمز QR الخاص به، وتؤكد أن الهاتف لم يُبلغ عنه بعد.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {status === "reported" && data && (
              <Card className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/95 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="px-8 py-10 text-right lg:px-10">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-600 shadow-xl shadow-red-500/10">
                      <AlertTriangle className="h-10 w-10" />
                    </div>
                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950">هذا الهاتف مُبلغ عنه</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                      إذا عثرت على هذا الهاتف يرجى التواصل مع المالك.
                    </p>

                    <div className="mt-10 space-y-6">
                      <Card className="rounded-[28px] border border-slate-200 bg-slate-50 shadow-lg shadow-slate-950/10">
                        <CardHeader className="text-right">
                          <CardTitle className="text-xl text-slate-950">معلومات المالك</CardTitle>
                          <CardDescription className="text-slate-600">
                            جميع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-0 text-right">
                          <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-950/5">
                            <p className="text-sm text-slate-500">اسم المالك</p>
                            <p className="mt-2 text-lg font-semibold text-slate-950">{data.owner_name || "غير متوفر"}</p>
                          </div>
                          <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-950/5">
                            <p className="text-sm text-slate-500">رقم الهاتف</p>
                            <p className="mt-2 text-lg font-semibold text-slate-950">{data.phone || "غير متوفر"}</p>
                          </div>
                          <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-950/5">
                            <p className="text-sm text-slate-500">كود الجهاز</p>
                            <p className="mt-2 text-lg font-semibold text-slate-950">{data.code || "غير متوفر"}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                        {data.whatsapp_enabled && data.whatsapp_number && (
                          <Button
                            asChild
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                            size="lg"
                          >
                            <a href={whatsappHref} target="_blank" rel="noreferrer noopener">
                              <MessageCircle className="h-4 w-4" />
                              واتساب
                            </a>
                          </Button>
                        )}
                        {data.phone && (
                          <Button
                            asChild
                            className="bg-sky-600 text-white hover:bg-sky-700"
                            size="lg"
                          >
                            <a href={phoneHref}>
                              <Phone className="h-4 w-4" />
                              اتصل الآن
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-lg shadow-slate-950/10">
                      <div className="flex items-center justify-between gap-3 text-right">
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">تنبيه أمني</p>
                          <h2 className="mt-3 text-3xl font-semibold text-slate-950">احفظ معلومات المالك</h2>
                        </div>
                        <div className="rounded-3xl bg-red-500/10 p-3 text-red-600">
                          <Link2 className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-right text-slate-600 shadow-sm shadow-slate-950/5">
                        جميـع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
