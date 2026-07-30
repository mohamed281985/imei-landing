import React from "react";
import { Link } from "wouter";
import { SiGoogleplay, SiWhatsapp } from "react-icons/si";
import { Shield, Smartphone, Lock, Search, BadgeCheck, Bell, PlusCircle, ArrowLeftRight, Check, X, Menu, X as XIcon, FileText, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import heroPhones from "@/assets/images/hero-phones.png";
// Assets — logo uses public/ path (background already removed)
const imeiLogo = "/imei-logo-nobg.png";
import splash from "@assets/Screenshot_٢٠٢٦٠٦١١_١٥١١٤٧_1781269330762.jpg";
import homeScreen from "@assets/Screenshot_٢٠٢٦٠٦١١_١٥٢٢١٢_1781269330788.jpg";
import imeiSearch from "@assets/Screenshot_٢٠٢٦٠٦١١_١٥٢٢٣٤_1781269330799.jpg";
import reportLost from "@assets/Screenshot_٢٠٢٦_٠٦١١_١٥٢٣٣٣_1781269330813.jpg";
import registerPhone from "@assets/Screenshot_٢٠٢٦_٠٦١١_١٥٢٣٥٧_1781269330827.jpg";
import checkBefore from "@assets/file_000000007fc872469719a458b4803be1_1781269330840.png";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden" dir="rtl">
      {/* 1. Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo (Right in RTL) */}
            <div className="flex items-center gap-2">
              <img src={imeiLogo} alt="IMEI Logo" className="h-8 md:h-10 object-contain" />
              <span className="font-bold text-lg md:text-xl text-primary hidden sm:block">تطبيق IMEI</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 md:gap-8 text-sm font-medium text-foreground/80">
              <a href="#hero" className="hover:text-primary transition-colors">الرئيسية</a>
              <a href="#features" className="hover:text-primary transition-colors">المميزات</a>
              <a href="#pricing" className="hover:text-primary transition-colors">الباقات</a>
              <a href="#faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</a>
            </nav>

            {/* Actions (Left in RTL) */}
            <div className="flex items-center gap-3 md:gap-4">
              <Button asChild className="hidden sm:flex rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 text-sm md:text-base px-4 md:px-6 py-2">
                <a href="https://play.google.com/store/apps/details?id=com.imei.app" target="_blank" rel="noreferrer">
                  <SiGoogleplay className="ml-2 w-4 h-4" />
                  حمّل التطبيق
                </a>
              </Button>
              <button className="lg:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <XIcon /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm lg:hidden pt-20 px-4">
          <nav className="flex flex-col gap-6 text-lg font-medium text-center">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>المميزات</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>الباقات</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>الأسئلة الشائعة</a>
            <Button asChild className="rounded-full bg-primary mt-4 py-4 text-base">
              <a href="https://play.google.com/store/apps/details?id=com.imei.app">
                <SiGoogleplay className="ml-2" />
                حمّل من Google Play
              </a>
            </Button>
          </nav>
        </div>
      )}

      {/* 2. Hero Section — Premium Redesign */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden pt-20 md:pt-24"
        style={{ background: "linear-gradient(145deg,#EBF3FF 0%,#F6F9FF 45%,#FFF6EE 100%)" }}
      >
        {/* ── Background: dot grid ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* ── Background: glow orbs ── */}
        <div className="absolute pointer-events-none" style={{ top: "-120px", right: "0%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "-100px", left: "15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,0,0.14) 0%,transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute pointer-events-none" style={{ top: "35%", left: "35%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />

        {/* ── Background: SVG tech rings ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
          <circle cx="28%" cy="52%" r="200" stroke="#2563EB" strokeWidth="1" fill="none" />
          <circle cx="28%" cy="52%" r="340" stroke="#2563EB" strokeWidth="0.7" fill="none" />
          <circle cx="28%" cy="52%" r="490" stroke="#2563EB" strokeWidth="0.4" fill="none" />
          <line x1="4%" y1="22%" x2="28%" y2="52%" stroke="#2563EB" strokeWidth="0.8" />
          <line x1="2%" y1="80%" x2="28%" y2="52%" stroke="#2563EB" strokeWidth="0.8" />
          <line x1="28%" y1="0%" x2="28%" y2="52%" stroke="#2563EB" strokeWidth="0.6" />
          <line x1="28%" y1="100%" x2="28%" y2="52%" stroke="#2563EB" strokeWidth="0.6" />
          <line x1="56%" y1="15%" x2="28%" y2="52%" stroke="#FF8A00" strokeWidth="0.6" />
          <line x1="58%" y1="88%" x2="28%" y2="52%" stroke="#FF8A00" strokeWidth="0.6" />
        </svg>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">

            {/* ══════════ TEXT COLUMN (right in RTL) ══════════ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center md:text-right flex flex-col justify-center order-2 md:order-1"
            >
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 self-center md:self-start mb-3 md:mb-6"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(37,99,235,0.18)",
                  borderRadius: "100px",
                  padding: "4px 14px md:padding: 6px 18px",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.10)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-xs md:text-sm" style={{ color: "#2563EB" }}>منصة موثوقة لفحص الهواتف</span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-black text-[#0D2137] mb-3 md:mb-5 leading-[1.7]" // 将 leading-[1.18] 改为 leading-[1.4]
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}
              >
                اجعل شراء وبيع<br />
                الهواتف أكثر{" "}
                <span style={{
                  background: "linear-gradient(90deg,#FF8A00,#FF5500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>أمانًا</span>
              </motion.h1>


              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-gray-500 mb-4 md:mb-8 leading-[1.8] max-w-md mx-auto md:mx-0"
                style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)" }}
              >
                تحقق من حالة الهاتف قبل الشراء، استعرض سجل الملكية، واكتشف الأجهزة المبلغ عنها من مكان واحد.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start mb-4 md:mb-8"
              >
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.imei.app"
                  target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                    borderRadius: "16px", padding: "10px 20px md:padding: 12px 24px", fontSize: "0.9rem md:fontSize: 0.95rem",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.38),0 2px 8px rgba(37,99,235,0.18)",
                  }}
                >
                  <SiGoogleplay className="w-4 h-4 md:w-5 h-5" />
                  تحميل التطبيق
                </motion.a>

                <motion.a
                  href="#check"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 font-bold"
                  style={{
                    background: "rgba(255,255,255,0.80)",
                    backdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(37,99,235,0.22)",
                    borderRadius: "16px", padding: "10px 20px md:padding: 12px 24px", fontSize: "0.9rem md:fontSize: 0.95rem",
                    color: "#2563EB",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.09)",
                  }}
                >
                  <Search className="w-3.5 h-3.5 md:w-4 h-4" />
                  فحص IMEI الآن
                </motion.a>
              </motion.div>

              {/* Rating row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="flex" dir="ltr">
                  {["#3B82F6", "#F97316", "#10B981", "#8B5CF6"].map((c, i) => (
                    <div key={i} className="w-8 h-8 md:w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: `linear-gradient(135deg,${c}99,${c})`, marginLeft: i > 0 ? "-8px md:marginLeft: -10px" : "0", zIndex: 4 - i, position: "relative" }}>
                      {["م", "أ", "س", "ع"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1" dir="ltr">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 md:w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-200 text-yellow-200"}`} />
                    ))}
                    <span className="font-black text-[#0D2137] text-xs md:text-sm mr-1.5">4.8</span>
                  </div>
                  <p className="text-xs text-gray-400">أكثر من 10,000 مستخدم يثقون بنا</p>
                </div>
              </motion.div>
            </motion.div>

            <div className="flex justify-center md:justify-start order-1 md:order-2 relative">
  <motion.img
    src={heroPhones}
    alt="IMEI Safe"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: [0, -10, 0] }}
    transition={{
      opacity: { duration: 0.8 },
      y: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
    className="w-full min-w-[500px] max-w-[900px] h-auto drop-shadow-2xl relative z-10"
  />
  
  {/* الإشعار الأول: التحقق من الهاتف */}
  <motion.div
    initial={{ opacity: 0, x: 15, y: 10 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [15, 0, 0, -15],
      y: [10, 0, 0, -10]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity,
      repeatDelay: 2,
      times: [0, 0.1, 0.8, 1]
    }}
    className="absolute top-[8%] right-[20%] md:top-[12%] md:right-[15%] lg:top-[15%] lg:right-[10%] bg-white rounded-md shadow-sm p-1 md:p-1.5 z-20 w-[28vw] md:w-[22vw] lg:w-[140px]"
  >
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <Check className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 text-green-600" />
      </div>
      <div>
        <p className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-500">تم التحقق</p>
        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-bold text-gray-800">الهاتف آمن</p>
      </div>
    </div>
  </motion.div>

  {/* الإشعار الثاني: تسجيل الجهاز */}
  <motion.div
    initial={{ opacity: 0, x: -15, y: 10 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [-15, 0, 0, 15],
      y: [10, 0, 0, -10]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity,
      repeatDelay: 2,
      delay: 1.5,
      times: [0, 0.1, 0.8, 1]
    }}
    className="absolute bottom-[35%] left-[20%] md:bottom-[40%] md:left-[15%] lg:bottom-[45%] lg:left-[10%] bg-white rounded-md shadow-sm p-1 md:p-1.5 z-20 w-[28vw] md:w-[22vw] lg:w-[140px]"
  >
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Shield className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 text-blue-600" />
      </div>
      <div>
        <p className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-500">حماية</p>
        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-bold text-gray-800">تم تسجيل الجهاز</p>
      </div>
    </div>
  </motion.div>

  {/* الإشعار الثالث: إرسال إشعار */}
  <motion.div
    initial={{ opacity: 0, x: 15, y: -10 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [15, 0, 0, -15],
      y: [-10, 0, 0, 10]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity,
      repeatDelay: 2,
      delay: 3,
      times: [0, 0.1, 0.8, 1]
    }}
    className="absolute top-[50%] right-[15%] md:top-[55%] md:right-[10%] lg:top-[60%] lg:right-[5%] bg-white rounded-md shadow-sm p-1 md:p-1.5 z-20 w-[28vw] md:w-[22vw] lg:w-[140px]"
  >
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
        <Bell className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 text-orange-600" />
      </div>
      <div>
        <p className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-500">تنبيه</p>
        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-bold text-gray-800">تم إرسال إشعار</p>
      </div>
    </div>
  </motion.div>

  {/* الإشعار الرابع: البحث عن IMEI */}
  <motion.div
    initial={{ opacity: 0, x: -15, y: -10 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [-15, 0, 0, 15],
      y: [-10, 0, 0, 10]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity,
      repeatDelay: 2,
      delay: 4.5,
      times: [0, 0.1, 0.8, 1]
    }}
    className="absolute top-[65%] left-[15%] md:top-[70%] md:left-[10%] lg:top-[75%] lg:left-[5%] bg-white rounded-md shadow-sm p-1 md:p-1.5 z-20 w-[28vw] md:w-[22vw] lg:w-[140px]"
  >
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
        <Search className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 text-purple-600" />
      </div>
      <div>
        <p className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-500">بحث</p>
        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-bold text-gray-800">تم العثور على IMEI</p>
      </div>
    </div>
  </motion.div>

  {/* الإشعار الخامس: نقل الملكية */}
  <motion.div
    initial={{ opacity: 0, x: 15, y: 10 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [15, 0, 0, -15],
      y: [10, 0, 0, -10]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity,
      repeatDelay: 2,
      delay: 6,
      times: [0, 0.1, 0.8, 1]
    }}
    className="absolute bottom-[25%] right-[20%] md:bottom-[30%] md:right-[15%] lg:bottom-[35%] lg:right-[10%] bg-white rounded-md shadow-sm p-1 md:p-1.5 z-20 w-[28vw] md:w-[22vw] lg:w-[140px]"
  >
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
        <ArrowLeftRight className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 text-indigo-600" />
      </div>
      <div>
        <p className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-500">نقل</p>
        <p className="text-[8px] md:text-[9px] lg:text-[10px] font-bold text-gray-800">تم نقل الملكية</p>
      </div>
    </div>
  </motion.div>
</div>



          </div>
        </div>
      </section>


      {/* 3. Features Strip */}
      <section id="features" className="py-8 md:py-12 bg-white relative z-20 -mt-6 md:-mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl shadow-xl shadow-black/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6">
          {[
            { icon: Bell, title: "اخطار فقد", color: "text-secondary", bg: "bg-secondary/10" },
            { icon: PlusCircle, title: "تسجيل هاتف جديد", color: "text-primary", bg: "bg-primary/10" },
            { icon: Search, title: "بحث IMEI", color: "text-secondary", bg: "bg-secondary/10" },
            { icon: ArrowLeftRight, title: "نقل الملكية", color: "text-primary", bg: "bg-primary/10" },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${feature.bg} flex items-center justify-center`}>
                <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-sm md:text-base text-[#0D2137]">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Check Before You Buy */}
      <section className="py-16 md:py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="order-2 lg:order-1"
            >
              <img src={checkBefore} alt="تحقق قبل الشراء" className="w-full max-w-md mx-auto drop-shadow-2xl rounded-2xl" />
            </motion.div>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="order-1 lg:order-2 text-center lg:text-right"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0D2137] mb-4 md:mb-6">تحقق قبل الشراء</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                افحص أي هاتف مستعمل قبل الدفع — اكتشف البلاغات، تحقق من القفل، وتأكد من المطابقة لضمان أمان أموالك.
              </p>
              <div className="max-w-md mx-auto lg:mx-0 flex gap-2">
                <Input placeholder="أدخل رقم IMEI (15 رقم)" className="h-12 md:h-14 text-base md:text-lg bg-gray-50 border-gray-200" dir="ltr" />
                <Button className="h-12 md:h-14 px-6 md:px-8 bg-secondary hover:bg-secondary/90 text-white font-bold text-base md:text-lg rounded-xl">بحث</Button>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-3">*اضغط بحث لتحميل التطبيق وتجربة الخدمة</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Screenshots Showcase */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#EEF4FF] overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0D2137]">كيف يعمل التطبيق؟</h2>
        </div>
        {/* Infinite scroll: render items TWICE — animation moves by -50% then loops back seamlessly */}
        <div className="relative w-full overflow-x-hidden py-8 md:py-10" dir="ltr">
          <div className="animate-scroll-x">
            {[splash, homeScreen, imeiSearch, reportLost, registerPhone, splash, homeScreen, imeiSearch, reportLost, registerPhone].map((img, i) => (
              <div key={i} style={{ width: "clamp(120px, 20vw, 230px)", flexShrink: 0, padding: "0 8px" }}>
                <div className="rounded-[24px] md:rounded-[28px] overflow-hidden border-[5px] md:border-[6px] border-white shadow-xl shadow-primary/10"
                  style={{ height: "clamp(240px, 40vw, 460px)" }}>
                  <img src={img} alt={`App Screenshot ${i}`} className="w-full h-full object-cover object-top block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Video Section */}
      <section className="py-16 md:py-24 bg-[#0D2137] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">شاهد كيف يعمل IMEI</h2>
            <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">نظرة سريعة على كيفية حماية جهازك باستخدام تطبيقنا</p>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/50 aspect-video relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/imei-safe.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0D2137] mb-3 md:mb-4">اختر الباقة المناسبة لك</h2>
            <p className="text-base md:text-lg text-muted-foreground">خطط مرنة تناسب احتياجاتك للحماية الكاملة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-gray-200 shadow-sm relative overflow-hidden flex flex-col">
              <div className="h-2 bg-blue-400 absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-6 md:pb-8 pt-6 md:pt-8">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">الخطة المجانية</CardTitle>
                <div className="mt-3 md:mt-4 text-3xl md:text-4xl font-black text-blue-500">مجانًا</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 md:space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> بحث IMEI: 5 مرات يومياً</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> تسجيل هاتف جديد</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> تسجيل بلاغ</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> إشعار داخل التطبيق</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4 md:w-5 md:h-5" /> إشعارات فورية (Push)</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4 md:w-5 md:h-5" /> إشعارات بريد إلكتروني</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4 md:w-5 md:h-5" /> سجل ملكية كامل</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm md:text-base" variant="outline">اختر الباقة</Button>
              </CardFooter>
            </Card>

            {/* Gold Plan (Highlighted) */}
            <Card className="border-secondary shadow-xl relative overflow-hidden scale-100 lg:scale-105 z-10 flex flex-col bg-gradient-to-b from-[#FFFDF0] to-white">
              <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">الأكثر طلباً</div>
              <div className="h-2 bg-secondary absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-6 md:pb-8 pt-6 md:pt-8">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#0D2137]">خطة جولد</CardTitle>
                <div className="mt-3 md:mt-4 text-3xl md:text-4xl font-black text-secondary">Premium+</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 md:space-y-3 text-sm md:text-sm font-medium">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> ظهور ذهبي أعلى في الإعلانات</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> بحث IMEI: غير محدود ∞</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> تسجيل بلاغ & هاتف جديد</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> إشعارات فورية وبريد إلكتروني</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> مشاركة الرقم عبر واتساب</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> نقل ملكية هاتف: غير محدود</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> طباعة سجل الملكية PDF</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-secondary" /> دعم فني فوري وشارة مميزة</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-10 md:h-12 shadow-lg shadow-secondary/20 text-sm md:text-base">اشترك الآن</Button>
              </CardFooter>
            </Card>

            {/* Silver Plan */}
            <Card className="border-gray-200 shadow-sm relative overflow-hidden flex flex-col bg-gray-50/50">
              <div className="h-2 bg-gray-400 absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-6 md:pb-8 pt-6 md:pt-8">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">خطة سيلفر</CardTitle>
                <div className="mt-3 md:mt-4 text-3xl md:text-4xl font-black text-gray-600">Premium</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 md:space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-gray-600" /> ظهور فضي أعلى في الإعلانات</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-gray-600" /> بحث IMEI: 30 مرة يومياً</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-gray-600" /> إشعارات فورية وبريد إلكتروني</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-gray-600" /> نقل ملكية هاتف: غير محدود</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 md:w-5 md:h-5 text-gray-600" /> سجل ملكية: عرض كامل</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4 md:w-5 md:h-5" /> مشاركة الرقم عبر واتساب</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-4 h-4 md:w-5 md:h-5" /> طباعة سجل الملكية PDF</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-sm md:text-base" variant="outline">اختر الباقة</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-[#EEF4FF]/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0D2137] mb-3 md:mb-4">الأسئلة الشائعة</h2>
          </div>
          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-sm p-2 border border-blue-100">
            {[
              { q: "ما هو تطبيق IMEI؟", a: "تطبيق IMEI هو منصة أمان للهواتف تتيح لك تسجيل جهازك، الإبلاغ عن فقدانه أو سرقته، والبحث عن أي هاتف باستخدام رقم IMEI الخاص به." },
              { q: "كيف أسجّل هاتفي في التطبيق؟", a: "بعد تحميل التطبيق وإنشاء حساب، اضغط على 'تسجيل هاتف جديد' وأدخل رقم IMEI المكوّن من 15 رقماً الموجود في إعدادات الجهاز أو على العلبة." },
              { q: "ماذا أفعل إذا فُقد أو سُرق هاتفي؟", a: "اضغط على 'اخطار فقد' في التطبيق، أدخل معلومات الجهاز والفقدان، وسيتم نشر بلاغ فوري في الشبكة لمساعدتك في استعادته." },
              { q: "كيف أتحقق من هاتف مستعمل قبل الشراء؟", a: "أدخل رقم IMEI للهاتف في خاصية 'بحث IMEI' لمعرفة حالة الجهاز، وجود بلاغات، وضع القفل، وأصالته." },
              { q: "ما الفرق بين الباقة المجانية والمدفوعة؟", a: "الباقة المجانية تتيح لك الوظائف الأساسية مع عدد محدود من عمليات البحث. الباقة الفضية والذهبية توفر بحثاً أوسع، إشعارات فورية، دعم واتساب، وظهور مميز في الإعلانات." },
              { q: "هل التطبيق متاح على iOS؟", a: "حالياً التطبيق متاح على Android عبر Google Play. سيكون متاحاً قريباً على iOS." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 border-blue-50 px-4">
                <AccordionTrigger className="text-right font-bold text-[#0D2137] hover:text-primary hover:no-underline py-4 md:py-5 text-sm md:text-base sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-4 md:pb-5 pr-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 9. Support & CTA */}
      <section className="py-16 md:py-20 bg-[#0D2137] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black mb-4 md:mb-6">تحتاج مساعدة؟ نحن هنا!</h2>
          <p className="text-base md:text-lg md:text-xl text-blue-200 mb-6 md:mb-10">تواصل مع فريق الدعم عبر واتساب أو حمّل التطبيق الآن</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button size="lg" asChild className="rounded-full h-14 md:h-16 px-6 md:px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base md:text-xl shadow-xl shadow-[#25D366]/20">
              <a href="https://wa.me/+201023579280" target="_blank" rel="noreferrer">
                <SiWhatsapp className="ml-3 w-5 h-5 md:w-6 md:h-6" />
                تواصل عبر واتساب
              </a>
            </Button>
            <Button size="lg" asChild className="rounded-full h-14 md:h-16 px-6 md:px-8 bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-xl shadow-xl shadow-primary/20">
              <a href="https://play.google.com/store/apps/details?id=com.imei.app" target="_blank" rel="noreferrer">
                <SiGoogleplay className="ml-3 w-5 h-5 md:w-6 md:h-6" />
                حمّل من Google Play
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#0a1929] text-blue-200 py-8 md:py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <img src={imeiLogo} alt="IMEI Logo" className="h-8 md:h-10 opacity-90 brightness-0 invert" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg md:text-xl tracking-wider">IMEI</span>
                <span className="text-xs md:text-sm">نحمي جهازك، نؤمن بياناتك</span>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-medium text-sm md:text-base">
              <a href="#hero" className="hover:text-white transition-colors">الرئيسية</a>
              <a href="#features" className="hover:text-white transition-colors">المميزات</a>
              <a href="#pricing" className="hover:text-white transition-colors">الباقات</a>
              <a href="#faq" className="hover:text-white transition-colors">الأسئلة الشائعة</a>
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            </nav>

            <div className="flex gap-3 md:gap-4">
              <a href="https://wa.me/+201023579280" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-white">
                <SiWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          <div className="text-center text-xs md:text-sm text-blue-400 pt-6 md:pt-8 border-t border-white/10">
            &copy; 2026 IMEI App. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+201023579280"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label="تواصل معنا عبر واتساب"
      >
        <SiWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
      </a>
    </div>
  );
}
