import React from "react";
import { Link } from "wouter";
import { SiGoogleplay, SiWhatsapp } from "react-icons/si";
import { Shield, Smartphone, Lock, Search, BadgeCheck, Bell, PlusCircle, ArrowLeftRight, Check, X, Menu, X as XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
          <div className="flex items-center justify-between h-20">
            {/* Logo (Right in RTL) */}
            <div className="flex items-center gap-2">
              <img src={imeiLogo} alt="IMEI Logo" className="h-10 object-contain" />
              <span className="font-bold text-xl text-primary hidden sm:block">تطبيق IMEI</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-foreground/80">
              <a href="#hero" className="hover:text-primary transition-colors">الرئيسية</a>
              <a href="#features" className="hover:text-primary transition-colors">المميزات</a>
              <a href="#pricing" className="hover:text-primary transition-colors">الباقات</a>
              <a href="#faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</a>
            </nav>

            {/* Actions (Left in RTL) */}
            <div className="flex items-center gap-4">
              <Button asChild className="hidden sm:flex rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20">
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
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm lg:hidden pt-24 px-4">
          <nav className="flex flex-col gap-6 text-lg font-medium text-center">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>المميزات</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>الباقات</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>الأسئلة الشائعة</a>
            <Button asChild className="rounded-full bg-primary mt-4 py-6 text-lg">
              <a href="https://play.google.com/store/apps/details?id=com.imei.app">
                <SiGoogleplay className="ml-2" />
                حمّل من Google Play
              </a>
            </Button>
          </nav>
        </div>
      )}

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EEF4FF] to-white">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <Shield className="absolute top-[20%] left-[10%] w-12 h-12 text-primary/20 animate-float" />
          <Smartphone className="absolute top-[30%] right-[15%] w-10 h-10 text-secondary/30 animate-float-delayed" />
          <Lock className="absolute top-[60%] left-[25%] w-8 h-8 text-primary/20 animate-float-fast" />
          <Search className="absolute bottom-[20%] right-[20%] w-14 h-14 text-primary/10 animate-float" />
          <BadgeCheck className="absolute top-[15%] left-[40%] w-6 h-6 text-secondary/40 animate-float-delayed" />
          <Shield className="absolute bottom-[30%] left-[15%] w-10 h-10 text-primary/15 animate-float-fast" />
          <Smartphone className="absolute top-[70%] right-[30%] w-8 h-8 text-secondary/20 animate-float" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-right"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D2137] leading-[1.2] mb-6">
                حماية هاتفك،<br/>بكل ثقة
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                سجّل جهازك، ابحث عن هاتفك المفقود، وتحقق من أي هاتف قبل الشراء — كل ذلك في تطبيق واحد.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold text-lg shadow-xl shadow-primary/30">
                  <a href="https://play.google.com/store/apps/details?id=com.imei.app" target="_blank" rel="noreferrer">
                    <SiGoogleplay className="ml-2 w-5 h-5" />
                    حمّل من Google Play
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full h-14 px-8 border-primary/20 hover:bg-primary/5 text-primary font-semibold text-lg">
                  <a href="#features">تعرّف على المميزات</a>
                </Button>
              </div>
            </motion.div>

            {/* Hero phones — responsive */}
            <div className="flex justify-center pt-4 lg:pt-0" dir="ltr">

              {/* ── Mobile: single centered phone ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:hidden animate-float"
                style={{ width: "160px" }}
              >
                <div style={{ borderRadius: "28px", overflow: "hidden", border: "5px solid white", boxShadow: "0 24px 48px rgba(25,118,210,0.22)" }}>
                  <img src={homeScreen} alt="IMEI App" className="w-full h-auto block" />
                </div>
              </motion.div>

              {/* ── Desktop: two overlapping angled phones ── */}
              <div className="hidden lg:flex items-start" style={{ position: "relative", height: "540px", width: "440px" }}>
                {/* Back phone — upper-left */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="animate-float-delayed"
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "200px",
                    zIndex: 10,
                    transform: "perspective(900px) rotateY(12deg) rotateX(4deg)",
                  }}
                >
                  <div style={{ borderRadius: "30px", overflow: "hidden", border: "6px solid white", boxShadow: "0 30px 60px rgba(255,109,0,0.16)" }}>
                    <img src={imeiSearch} alt="IMEI Search" className="w-full h-auto block" />
                  </div>
                </motion.div>

                {/* Front phone — lower-right, overlaps back phone */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="animate-float"
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "160px",
                    width: "240px",
                    zIndex: 20,
                    transform: "perspective(900px) rotateY(12deg) rotateX(4deg)",
                  }}
                >
                  <div style={{ borderRadius: "32px", overflow: "hidden", border: "6px solid white", boxShadow: "0 40px 80px rgba(25,118,210,0.24)" }}>
                    <img src={homeScreen} alt="IMEI Home" className="w-full h-auto block" />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Strip */}
      <section id="features" className="py-12 bg-white relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl shadow-xl shadow-black/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { icon: Bell, title: "اخطار فقد", color: "text-secondary", bg: "bg-secondary/10" },
            { icon: PlusCircle, title: "تسجيل هاتف جديد", color: "text-primary", bg: "bg-primary/10" },
            { icon: Search, title: "بحث IMEI", color: "text-secondary", bg: "bg-secondary/10" },
            { icon: ArrowLeftRight, title: "نقل الملكية", color: "text-primary", bg: "bg-primary/10" },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-14 h-14 rounded-full ${feature.bg} flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-[#0D2137]">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Check Before You Buy */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              <h2 className="text-3xl lg:text-4xl font-black text-[#0D2137] mb-6">تحقق قبل الشراء</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                افحص أي هاتف مستعمل قبل الدفع — اكتشف البلاغات، تحقق من القفل، وتأكد من المطابقة لضمان أمان أموالك.
              </p>
              <div className="max-w-md mx-auto lg:mx-0 flex gap-2">
                <Input placeholder="أدخل رقم IMEI (15 رقم)" className="h-14 text-lg bg-gray-50 border-gray-200" dir="ltr" />
                <Button className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-white font-bold text-lg rounded-xl">بحث</Button>
              </div>
              <p className="text-sm text-gray-400 mt-3">*اضغط بحث لتحميل التطبيق وتجربة الخدمة</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Screenshots Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-[#EEF4FF] overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D2137]">كيف يعمل التطبيق؟</h2>
        </div>
        {/* Infinite scroll: render items TWICE — animation moves by -50% then loops back seamlessly */}
        <div className="relative w-full overflow-x-hidden py-10" dir="ltr">
          <div className="animate-scroll-x">
            {[splash, homeScreen, imeiSearch, reportLost, registerPhone, splash, homeScreen, imeiSearch, reportLost, registerPhone].map((img, i) => (
              <div key={i} style={{ width: "clamp(140px, 22vw, 230px)", flexShrink: 0, padding: "0 10px" }}>
                <div className="rounded-[28px] overflow-hidden border-[6px] border-white shadow-xl shadow-primary/10"
                     style={{ height: "clamp(280px, 44vw, 460px)" }}>
                  <img src={img} alt={`App Screenshot ${i}`} className="w-full h-full object-cover object-top block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Video Section */}
      <section className="py-24 bg-[#0D2137] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">شاهد كيف يعمل IMEI</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">نظرة سريعة على كيفية حماية جهازك باستخدام تطبيقنا</p>
          </div>
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black/50 aspect-video relative">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="IMEI App Demo" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D2137] mb-4">اختر الباقة المناسبة لك</h2>
            <p className="text-muted-foreground text-lg">خطط مرنة تناسب احتياجاتك للحماية الكاملة</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-gray-200 shadow-sm relative overflow-hidden flex flex-col">
              <div className="h-2 bg-blue-400 absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-800">الخطة المجانية</CardTitle>
                <div className="mt-4 text-4xl font-black text-blue-500">مجانًا</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> بحث IMEI: 5 مرات يومياً</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> تسجيل هاتف جديد</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> تسجيل بلاغ</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> إشعار داخل التطبيق</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-5 h-5"/> إشعارات فورية (Push)</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-5 h-5"/> إشعارات بريد إلكتروني</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-5 h-5"/> سجل ملكية كامل</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold" variant="outline">اختر الباقة</Button>
              </CardFooter>
            </Card>

            {/* Gold Plan (Highlighted) */}
            <Card className="border-secondary shadow-xl relative overflow-hidden scale-100 lg:scale-105 z-10 flex flex-col bg-gradient-to-b from-[#FFFDF0] to-white">
              <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">الأكثر طلباً</div>
              <div className="h-2 bg-secondary absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-[#0D2137]">خطة جولد</CardTitle>
                <div className="mt-4 text-4xl font-black text-secondary">Premium+</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm font-medium">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> ظهور ذهبي أعلى في الإعلانات</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> بحث IMEI: غير محدود ∞</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> تسجيل بلاغ & هاتف جديد</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> إشعارات فورية وبريد إلكتروني</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> مشاركة الرقم عبر واتساب</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> نقل ملكية هاتف: غير محدود</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> طباعة سجل الملكية PDF</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-secondary"/> دعم فني فوري وشارة مميزة</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 shadow-lg shadow-secondary/20">اشترك الآن</Button>
              </CardFooter>
            </Card>

            {/* Silver Plan */}
            <Card className="border-gray-200 shadow-sm relative overflow-hidden flex flex-col bg-gray-50/50">
              <div className="h-2 bg-gray-400 absolute top-0 left-0 right-0"></div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-800">خطة سيلفر</CardTitle>
                <div className="mt-4 text-4xl font-black text-gray-600">Premium</div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-600"/> ظهور فضي أعلى في الإعلانات</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-600"/> بحث IMEI: 30 مرة يومياً</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-600"/> إشعارات فورية وبريد إلكتروني</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-600"/> نقل ملكية هاتف: غير محدود</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-gray-600"/> سجل ملكية: عرض كامل</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-5 h-5"/> مشاركة الرقم عبر واتساب</li>
                  <li className="flex items-center gap-2 text-gray-400"><X className="w-5 h-5"/> طباعة سجل الملكية PDF</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold" variant="outline">اختر الباقة</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-24 bg-[#EEF4FF]/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D2137] mb-4">الأسئلة الشائعة</h2>
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
                <AccordionTrigger className="text-right font-bold text-[#0D2137] hover:text-primary hover:no-underline py-5 text-base sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5 pr-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 9. Support & CTA */}
      <section className="py-20 bg-[#0D2137] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-black mb-6">تحتاج مساعدة؟ نحن هنا!</h2>
          <p className="text-xl text-blue-200 mb-10">تواصل مع فريق الدعم عبر واتساب أو حمّل التطبيق الآن</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="rounded-full h-16 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xl shadow-xl shadow-[#25D366]/20">
              <a href="https://wa.me/+971000000000" target="_blank" rel="noreferrer">
                <SiWhatsapp className="ml-3 w-6 h-6" />
                تواصل عبر واتساب
              </a>
            </Button>
            <Button size="lg" asChild className="rounded-full h-16 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-xl shadow-primary/20">
              <a href="https://play.google.com/store/apps/details?id=com.imei.app" target="_blank" rel="noreferrer">
                <SiGoogleplay className="ml-3 w-6 h-6" />
                حمّل من Google Play
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#0a1929] text-blue-200 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <img src={imeiLogo} alt="IMEI Logo" className="h-10 opacity-90 brightness-0 invert" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-wider">IMEI</span>
                <span className="text-sm">نحمي جهازك، نؤمن بياناتك</span>
              </div>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6 font-medium">
              <a href="#hero" className="hover:text-white transition-colors">الرئيسية</a>
              <a href="#features" className="hover:text-white transition-colors">المميزات</a>
              <a href="#pricing" className="hover:text-white transition-colors">الباقات</a>
              <a href="#faq" className="hover:text-white transition-colors">الأسئلة الشائعة</a>
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            </nav>
            
            <div className="flex gap-4">
              <a href="https://wa.me/+971000000000" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-white">
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-blue-400 pt-8 border-t border-white/10">
            &copy; 2026 IMEI App. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/+971000000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label="تواصل معنا عبر واتساب"
      >
        <SiWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}
