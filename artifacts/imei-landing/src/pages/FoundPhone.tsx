import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldCheck, MessageCircle, Phone, Shield, Link2, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F0F9FF] text-[#1F2937]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0 w-full sm:w-auto"
          >
            <div className="flex items-center justify-center w-full sm:w-auto px-2 py-1 sm:px-0 sm:py-0 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <motion.div 
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-[#2F80ED] to-[#2563EB] flex items-center justify-center shadow-lg flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Shield className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
              </motion.div>
              <motion.div 
                className="ml-3 sm:ml-4 flex items-center space-x-2 sm:space-x-3 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/imei-logo-nobg.png" 
                  alt="شعار IMEI SAFE" 
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain flex-shrink-0"
                />
                <div className="hidden sm:block">
                  <p className="text-xs text-[#6B7280] tracking-wider font-medium">الحماية أولاً</p>
                </div>
              </motion.div>
            </div>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")}>
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </motion.div>
          <nav id="mobile-menu" className="hidden md:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 w-full sm:w-auto justify-center mt-4 sm:mt-0 px-2 sm:px-0">
            {["الرئيسية", "كيف يعمل", "اتصل بنا"].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-[#1F2937] hover:text-[#2F80ED] relative font-medium text-center px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2F80ED] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(247,147,30,0.1),transparent_50%)]" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full flex-col gap-10 sm:gap-12 mt-12 sm:mt-16 px-4 sm:px-0"
          >
            {status === "loading" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[70vh] flex-col items-center justify-center rounded-[28px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#F8FAFC] p-6 sm:p-14 shadow-2xl backdrop-blur-lg overflow-hidden w-full max-w-5xl mx-auto relative overflow-hidden"
              >
                {/* الخلفيات المتحركة */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute -top-40 -right-40 w-80 h-80 bg-[#2F80ED]/5 rounded-full blur-3xl"
                    animate={{ 
                      x: [0, 40, 0],
                      y: [0, -40, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl"
                    animate={{ 
                      x: [0, -40, 0],
                      y: [0, 40, 0]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                
                <motion.div 
                  className="flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#2F80ED]/10 to-[#2563EB]/10 text-[#2F80ED] shadow-xl shadow-[#2F80ED]/10 relative overflow-hidden z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full border-4 border-t-[#2F80ED] border-[#E5E7EB] h-20 sm:h-24 w-20 sm:w-24" />
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-[#2F80ED]/20"
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </motion.div>
                <motion.p 
                  className="mt-8 sm:mt-10 text-center text-2xl sm:text-3xl font-bold text-[#1F2937] px-4"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  جارٍ التحقق من حالة الهاتف...
                </motion.p>
                <motion.p 
                  className="mt-4 sm:mt-6 max-w-2xl text-center text-base sm:text-lg text-[#6B7280] px-4 font-medium"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  نبحث في قاعدة بيانات IMEI SAFE للتأكد من حالة هذا الجهاز بأمان تام.
                </motion.p>
              </motion.div>
            )}

            {(status === "error" || status === "not-found") && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto w-full max-w-2xl sm:max-w-3xl rounded-[28px] border border-[#EF4444]/20 bg-gradient-to-br from-white to-[#FEF2F2] shadow-2xl overflow-hidden backdrop-blur-lg px-6 sm:px-10 relative overflow-hidden"
              >
                <div className="px-8 pt-10 pb-6 text-right bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-b border-[#EF4444]/20">
                  <motion.div 
                    className="flex justify-center mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444] shadow-lg shadow-[#EF4444]/10">
                      <AlertTriangle className="h-12 w-12" />
                    </div>
                  </motion.div>
                  <div className="space-y-4 text-center">
                    <motion.h1 
                      className="text-4xl font-bold text-[#1F2937] bg-gradient-to-r from-[#991B1B] to-[#EF4444] bg-clip-text text-transparent"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      رمز QR غير صالح
                    </motion.h1>
                    <motion.p 
                      className="max-w-xl mx-auto text-base text-[#991B1B] font-medium"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      تعذر العثور على بيانات هذا الهاتف.
                    </motion.p>
                  </div>
                </div>
                <div className="px-8 py-8 text-center bg-gradient-to-b from-white to-[#FEF2F2]">
                  <motion.p 
                    className="text-lg font-medium text-[#991B1B] mb-6"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {status === "error"
                      ? "يرجى التأكد من أن الرابط صحيح أو المحاولة مرة أخرى لاحقاً."
                      : "الرابط الذي فتحته قد يكون منتهي الصلاحية أو يحتوي على رمز غير معتمد."}
                  </motion.p>
                  <motion.button 
                    className="bg-[#EF4444] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-[#DC2626] transition-all duration-300 hover:shadow-lg flex items-center justify-center mx-auto gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AlertTriangle className="h-5 w-5" />
                    المحاولة مرة أخرى
                  </motion.button>
                </div>
              </motion.div>
            )}

            {status === "safe" && data && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto w-full max-w-7xl rounded-[28px] border border-[#22C55E]/20 bg-gradient-to-br from-white to-[#F0FDF4] shadow-2xl overflow-hidden backdrop-blur-lg px-6 sm:px-10 relative overflow-hidden"
              >
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="px-8 py-10 lg:px-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/10 text-[#22C55E] shadow-xl shadow-[#22C55E]/10 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-full bg-[#22C55E]/20 animate-ping"></div>
                      <ShieldCheck className="h-12 w-12 z-10" />
                    </motion.div>
                    <motion.h1 
                      className="mt-8 text-4xl font-bold tracking-tight text-[#1F2937] bg-gradient-to-r from-[#1F2937] to-[#4B5563] bg-clip-text text-transparent"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      هذا الهاتف غير مسجل به إخطار فقد حتى الآن
                    </motion.h1>
                    <motion.p 
                      className="mt-4 max-w-2xl text-lg leading-8 text-[#4B5563] font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      لم يتم تسجيل أي بلاغ فقد أو سرقة لهذا الجهاز.
                    </motion.p>

                    <motion.div 
                      className="mt-10 space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="rounded-[20px] border border-[#22C55E]/20 bg-gradient-to-br from-white to-[#F0FDF4] shadow-lg overflow-hidden"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-right bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] pb-6 pt-8 px-8 border-b border-[#22C55E]/20">
                          <h3 className="text-xl font-bold text-[#1F2937] flex items-center justify-end gap-2">
                            <Sparkles className="h-5 w-5 text-[#22C55E]" />
                            ماذا يعني هذا؟
                          </h3>
                          <p className="mt-2 text-[#6B7280] font-medium">
                            قد يكون الهاتف آمناً، لكن ننصح دائماً بالتأكد من البائع قبل شراء أي هاتف مستعمل.
                          </p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="rounded-[20px] border border-[#22C55E]/20 bg-gradient-to-br from-white to-[#F0FDF4] shadow-lg overflow-hidden"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-right bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] pb-6 pt-8 px-8 border-b border-[#22C55E]/20">
                          <h3 className="text-xl font-bold text-[#1F2937] flex items-center justify-end gap-2">
                            <Shield className="h-5 w-5 text-[#22C55E]" />
                            خصوصية الهاتف
                          </h3>
                          <p className="mt-2 text-[#6B7280] font-medium">
                            لا نعرض أي بيانات شخصية لأن الهاتف غير مُبلغ عنه.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-[20px] border border-[#2F80ED]/15 bg-gradient-to-br from-white to-[#F0F9FF] p-8 shadow-xl shadow-[#2F80ED]/5 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#2F80ED]/5 to-transparent rounded-full blur-3xl"></div>
                      <div className="flex items-center justify-between gap-3 text-right relative z-10">
                        <div className="rounded-2xl bg-gradient-to-br from-[#2F80ED]/10 to-[#2563EB]/10 p-4 text-[#2F80ED] shadow-md shadow-[#2F80ED]/10">
                          <Shield className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-[#2F80ED] font-bold">IMEI SAFE</p>
                          <motion.h2 
                            className="mt-3 text-3xl font-bold text-[#1F2937] bg-gradient-to-r from-[#1F2937] to-[#3B82F6] bg-clip-text text-transparent"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            منصة موثوقة للمساعدة في حماية الهواتف.
                          </motion.h2>
                        </div>
                      </div>
                      <motion.div 
                        className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 text-right text-sm text-[#4B5563] shadow-sm shadow-[#E5E7EB] overflow-hidden relative z-10"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        هذه الصفحة تعرض حالة الجهاز بعد مسح رمز QR الخاص به، وتؤكد أن الهاتف لم يُبلغ عنه بعد.
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "reported" && data && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto w-full max-w-7xl rounded-[28px] border border-[#EF4444]/20 bg-gradient-to-br from-white to-[#FEF2F2] shadow-2xl overflow-hidden backdrop-blur-lg px-6 sm:px-10 relative overflow-hidden"
              >
                <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="px-8 py-10 lg:px-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 text-[#EF4444] shadow-xl shadow-[#EF4444]/10 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-full bg-[#EF4444]/20 animate-ping"></div>
                      <AlertTriangle className="h-12 w-12 z-10" />
                    </motion.div>
                    <motion.h1 
                      className="mt-8 text-4xl font-bold tracking-tight text-[#1F2937] bg-gradient-to-r from-[#1F2937] to-[#991B1B] bg-clip-text text-transparent"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      هذا الهاتف مُبلغ عنه
                    </motion.h1>
                    <motion.p 
                      className="mt-4 max-w-2xl text-lg leading-8 text-[#4B5563] font-medium"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      إذا عثرت على هذا الهاتف يرجى التواصل مع المالك.
                    </motion.p>

                    <motion.div 
                      className="mt-10 space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="rounded-[20px] border border-[#EF4444]/20 bg-gradient-to-br from-white to-[#FEF2F2] shadow-lg overflow-hidden"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-right bg-gradient-to-r from-[#FEF2F2] to-[#FECACA] pb-6 pt-8 px-8 border-b border-[#EF4444]/20">
                          <h3 className="text-xl font-bold text-[#1F2937] flex items-center justify-end gap-2">
                            <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
                            معلومات المالك
                          </h3>
                          <p className="mt-2 text-[#6B7280] font-medium">
                            جميع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                          </p>
                        </div>
                        <CardContent className="grid gap-4 pt-0 text-right bg-white px-8 pb-8">
                          <motion.div 
                            className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ y: -3 }}
                          >
                            <p className="text-sm text-[#6B7280]">اسم المالك</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.owner_name || "غير متوفر"}</p>
                          </motion.div>
                          <motion.div 
                            className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ y: -3 }}
                          >
                            <p className="text-sm text-[#6B7280]">رقم الهاتف</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.phone || "غير متوفر"}</p>
                          </motion.div>
                          <motion.div 
                            className="rounded-2xl bg-white p-4 shadow-sm shadow-[#E5E7EB] border border-[#E5E7EB] overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ y: -3 }}
                          >
                            <p className="text-sm text-[#6B7280]">كود الجهاز</p>
                            <p className="mt-2 text-lg font-semibold text-[#1F2937]">{data.code || "غير متوفر"}</p>
                          </motion.div>
                        </CardContent>
                      </motion.div>

                      <motion.div 
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <AnimatePresence>
                          {data.whatsapp_enabled && data.whatsapp_number && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Button
                                asChild
                                className="bg-[#22C55E] text-white hover:bg-[#16A34A] rounded-xl text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2 px-6 py-3"
                                size="lg"
                              >
                                <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="flex items-center gap-2 px-6 py-3">
                                  <MessageCircle className="h-5 w-5" />
                                  واتساب
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
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="ml-0 sm:ml-4"
                            >
                              <Button
                                asChild
                                className="bg-[#2F80ED] text-white hover:bg-[#2563EB] rounded-xl text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2 px-6 py-3"
                                size="lg"
                              >
                                <a href={phoneHref} className="flex items-center gap-2 px-6 py-3">
                                  <Phone className="h-5 w-5" />
                                  اتصل الآن
                                </a>
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="px-8 py-10 lg:px-10">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-[20px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#F9FAFB] p-8 shadow-lg shadow-[#E5E7EB] overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EF4444]/5 to-transparent rounded-full blur-3xl"></div>
                      <div className="flex items-center justify-between gap-3 text-right relative z-10">
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] text-[#6B7280] font-bold">تنبيه أمني</p>
                          <motion.h2 
                            className="mt-3 text-3xl font-bold text-[#1F2937] bg-gradient-to-r from-[#1F2937] to-[#EF4444] bg-clip-text text-transparent"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            احفظ معلومات المالك
                          </motion.h2>
                        </div>
                        <div className="rounded-2xl bg-[#EF4444]/10 p-4 text-[#EF4444] shadow-md shadow-[#EF4444]/10 relative z-10">
                          <Link2 className="h-7 w-7" />
                        </div>
                      </div>

                      <motion.div 
                        className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 text-right text-[#4B5563] shadow-sm shadow-[#E5E7EB] overflow-hidden relative z-10"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        جميـع البيانات المعروضة هدفها المساعدة في إعادة الهاتف إلى مالكه.
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-24 w-full border-t border-[#E5E7EB] bg-gradient-to-b from-white to-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-10 shadow-inner relative overflow-hidden"
          >
            {/* الخلفيات المتحركة */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 bg-[#2F80ED]/5 rounded-full blur-2xl"
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#10B981]/5 rounded-full blur-2xl"
                animate={{ 
                  x: [0, -20, 0],
                  y: [0, 20, 0]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
            
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-right relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className="flex flex-col items-center mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm w-full max-w-xs">
                  <div className="flex items-center justify-center mb-3 p-2 rounded-xl bg-gradient-to-br from-[#2F80ED] to-[#2563EB] shadow-lg mb-3">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src="/imei-logo-nobg.png" 
                      alt="شعار IMEI SAFE" 
                      className="h-10 w-10 object-contain flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#1F2937]">IMEI SAFE</h3>
                      <p className="text-xs text-[#6B7280] mt-[-2px]">الحماية أولاً</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] font-medium text-center sm:text-left">منصة موثوقة لحماية هاتفك من السرقة والضياع</p>
              </motion.div>
              
              {["روابط سريعة", "الدعم", "تواصل معنا"].map((title, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-4">{title}</h3>
                  <ul className="space-y-2 text-sm text-[#6B7280]">
                    {title === "روابط سريعة" && (
                      <>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">الرئيسية</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">كيف يعمل</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">الأسئلة الشائعة</a></li>
                      </>
                    )}
                    {title === "الدعم" && (
                      <>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">اتصل بنا</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">الشروط والأحكام</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">سياسة الخصوصية</a></li>
                      </>
                    )}
                    {title === "تواصل معنا" && (
                      <>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">support@imeisafe.com</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">+966 50 123 4567</a></li>
                        <li><a href="#" className="hover:text-[#2F80ED] transition-colors">الرياض، المملكة العربية السعودية</a></li>
                      </>
                    )}
                  </ul>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">تابعنا</h3>
                <div className="flex space-x-4 justify-end">
                  {["فيسبوك", "تويتر", "انستغرام", "يوتيوب"].map((platform, index) => (
                    <motion.a 
                      key={index}
                      href="#" 
                      className="h-12 w-12 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] hover:bg-[#2F80ED]/20 transition-colors shadow-md hover:shadow-lg relative overflow-hidden group"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <span className="sr-only">{platform}</span>
                      {platform === "فيسبوك" && (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      )}
                      {platform === "تويتر" && (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      )}
                      {platform === "انستغرام" && (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {platform === "يوتيوب" && (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                        </svg>
                      )}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-[#2F80ED] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="container mx-auto mt-10 pt-8 border-t border-[#E5E7EB] text-center text-sm text-[#6B7280] relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#2F80ED] to-transparent animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="font-medium relative z-10"
              >
                © {new Date().getFullYear()} IMEI SAFE. جميع الحقوق محفوظة.
              </motion.p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
