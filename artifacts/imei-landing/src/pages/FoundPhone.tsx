import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldCheck, MessageCircle, Phone, Shield, Lock, QrCode } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-start">
          <motion.img
            src="/imei-logo-nobg.png"
            alt="شعار الأمان"
            className="h-14 w-24"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-100/30 to-transparent" />
        
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 py-6 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full flex-col gap-8 mt-1"
          >
            <div className="w-full text-center">
              <h1 className="text-3xl font-bold text-slate-900">نتأكد معا من أمان أجهزتك</h1>
              <p className="mt-2 text-sm text-slate-500">منصة موثوقة لحماية الأجهزة من الفقد أو السرقة</p>
            </div>
            {/* LOADING STATE */}
            {status === "loading" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[60vh] flex-col items-center justify-center"
              >
                <motion.div 
                  className="flex h-24 w-24 items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-blue-600" />
                </motion.div>
                <motion.p 
                  className="mt-8 text-center text-xl font-semibold text-slate-900"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  جارٍ التحقق من حالة الهاتف...
                </motion.p>
                <motion.p 
                  className="mt-3 text-center text-sm text-slate-600"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  يرجى الانتظار قليلاً
                </motion.p>
              </motion.div>
            )}

            {/* ERROR / NOT FOUND STATE */}
            {(status === "error" || status === "not-found") && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto w-full max-w-2xl"
              >
                <div className="rounded-[24px] border border-red-200 bg-white shadow-lg overflow-hidden">
                  <div className="px-8 py-12 text-center bg-gradient-to-br from-red-50 to-orange-50 border-b border-red-200">
                    <motion.div 
                      className="flex justify-center mb-6"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-lg">
                        <AlertTriangle className="h-10 w-10" />
                      </div>
                    </motion.div>
                    <motion.h1 
                      className="text-3xl font-bold text-red-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      رمز QR غير صالح
                    </motion.h1>
                    <motion.p 
                      className="mt-4 text-red-600 font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {status === "error"
                        ? "يرجى التأكد من أن الرابط صحيح أو المحاولة مرة أخرى لاحقاً."
                        : "تعذر العثور على بيانات هذا الهاتف في قاعدة البيانات."}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SAFE STATUS */}
            {status === "safe" && data && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
              >
                {/* Top Status Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[24px] border border-green-200 bg-white shadow-lg overflow-hidden mb-8"
                >
                  <div className="px-8 py-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-200">
                    <motion.div 
                      className="flex justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-600 shadow-lg">
                        <ShieldCheck className="h-10 w-10" />
                      </div>
                    </motion.div>
                    <motion.h1 
                      className="text-3xl font-bold text-green-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      هذا الهاتف غير مسجل به إخطار فقد
                    </motion.h1>
                    <motion.p 
                      className="mt-4 text-slate-600 font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      لم يتم تسجيل أي بلاغ فقد أو سرقة لهذا الجهاز
                    </motion.p>
                  </div>
                </motion.div>

                {/* Info Cards */}
                <motion.div 
                  className="grid gap-6 md:grid-cols-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-[24px] border border-slate-200 bg-white shadow-md p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <QrCode className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">معلومات الجهاز</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      جهازك آمن وغير مسجل في قاعدة البيانات. ننصح دائماً بالتحقق من بيانات الجهاز قبل شراء هاتف مستعمل.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-[24px] border border-slate-200 bg-white shadow-md p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <Shield className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">حماية إضافية</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      قم بتسجيل هاتفك الآن لتحصل على حماية كاملة من السرقة والضياع.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Register Promotion Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 shadow-lg p-10 text-center"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    سجل هاتفك الآن
                  </h2>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    احم هاتفك من خلال تسجيل IMEI الخاص بك. في حالة فقدانه أو سرقته، يمكن لأي شخص يجده تتبعك بسهولة.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[16px] px-8 py-3 font-semibold">
                    ابدأ التسجيل الآن
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* REPORTED STATUS */}
            {status === "reported" && data && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
              >
                {/* Top Status Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[24px] border border-red-200 bg-white shadow-lg overflow-hidden mb-8"
                >
                  <div className="px-8 py-12 text-center bg-gradient-to-br from-red-50 to-orange-50 border-b border-red-200">
                    <motion.div 
                      className="flex justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-lg">
                        <AlertTriangle className="h-10 w-10" />
                      </div>
                    </motion.div>
                    <motion.h1 
                      className="text-3xl font-bold text-red-700"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      هذا الهاتف مُبلغ عن فقده أو سرقته
                    </motion.h1>
                    <motion.p 
                      className="mt-4 text-slate-600 font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      إذا عثرت على هذا الهاتف، يرجى التواصل مع المالك الفوري
                    </motion.p>
                  </div>
                </motion.div>

                {/* Owner Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-[24px] border border-slate-200 bg-white shadow-lg p-8 mb-8"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-6 text-right flex items-center justify-end gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    معلومات المالك
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-right rounded-[16px] bg-slate-50 p-6 border border-slate-200"
                    >
                      <p className="text-sm text-slate-600 font-medium">اسم المالك</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">{data.owner_name || "غير متوفر"}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-right rounded-[16px] bg-slate-50 p-6 border border-slate-200"
                    >
                      <p className="text-sm text-slate-600 font-medium">رقم الهاتف</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">{data.phone || "غير متوفر"}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-right rounded-[16px] bg-slate-50 p-6 border border-slate-200"
                    >
                      <p className="text-sm text-slate-600 font-medium">رمز الجهاز</p>
                      <p className="mt-2 text-lg font-bold text-slate-900">{data.code || "غير متوفر"}</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col gap-4 sm:flex-row sm:justify-end mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <AnimatePresence>
                    {data.whatsapp_enabled && data.whatsapp_number && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          className="bg-green-600 hover:bg-green-700 text-white rounded-[16px] px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            مراسلة واتساب
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {data.phone && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-[16px] px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <a href={phoneHref} className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            اتصل بالمالك
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Privacy Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 shadow-lg p-8 text-right"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">حماية الخصوصية</h3>
                      <p className="text-slate-600 leading-relaxed">
                        جميع البيانات المعروضة بهدف مساعدتك في إعادة الهاتف إلى مالكه. لن يتم مشاركة أي بيانات شخصية إضافية.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 w-full border-t border-slate-200 bg-white/50 py-12 px-4"
          >
            <div className="text-center">
              <p className="text-sm text-slate-600">
                © {new Date().getFullYear()} IMEI SAFE. جميع الحقوق محفوظة.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                منصة موثوقة لحماية هاتفك من السرقة والضياع
              </p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
