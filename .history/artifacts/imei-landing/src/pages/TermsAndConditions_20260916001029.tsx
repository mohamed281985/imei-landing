import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, ShieldAlert, FolderLock, FileCheck, Gavel, Mail, Ban, Menu, X, Play } from "lucide-react";
import { Link } from "wouter";

const translations = {
  ar: {
    title: "الشروط والأحكام",
    back: "العودة إلى الرئيسية",
    noticeTitle: "ملاحظة:",
    noticeText:
      "باستخدامك لهذا التطبيق أو تصفحك للموقع الإلكتروني التابع له، فإنك توافق تماماً على الالتزام بالشروط والأحكام التالية. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام التطبيق أو الخدمات المرتبطة به.",
    highlights: [
      { icon: ShieldAlert, title: "السلامة القانونية", text: "نلتزم بعدم السماح ببلاغات كاذبة أو استخدامات غير قانونية." },
      { icon: FileCheck, title: "الملكية المسجلة", text: "تستند عمليات نقل الملكية إلى مصادقة رقمية وآليات حماية داخل التطبيق." },
      { icon: FolderLock, title: "حماية الحساب", text: "يتم حفظ الحسابات وبطاقات المستخدمين وفق معايير أمنية صارمة." },
      { icon: Scale, title: "المساءلة", text: "نطبق هذه الشروط وفق القوانين السارية في جمهورية مصر العربية." },
    ],
    supportTitle: "التواصل مع الدعم",
    supportText: "للتواصل مع الدعم:",
    footer: "العودة إلى الصفحة الرئيسية",
    languageLabel: "اللغة",
    sections: [
      {
        title: "1. شروط إنشاء الحساب والأهلية",
        content: [
          "يشترط لاستخدام التطبيق أن تقوم بإنشاء حساب حقيقي ببيانات صحيحة ودقيقة (البريد الإلكتروني).",
          "أنت مسؤول مسؤولية كاملة عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك، وعن أي أنشطة تتم من خلال حسابك.",
          "يتعهد المستخدم بأن الهاتف الذي يقوم بتسجيله في التطبيق هو ملكيته الشخصية القانونية، أو يمتلك تفويضاً رسمياً بإدارته وتأمينه.",
        ],
      },
      {
        title: "2. الاستخدام العادل ومنع البلاغات الكاذبة",
        content: [
          "وفقاً لقانون مكافحة جرائم تقنية المعلومات المصري رقم 175 لسنة 2018، يحظر تماماً استخدام التطبيق للإدلاء ببلاغات كاذبة أو محاولة حظر أو تشويه سمعة هواتف لا تخصك.",
          "يُعد تعمد الإبلاغ عن هاتف كـ \"مفقود أو مسروق\" وهو ليس كذلك، أو محاولة قرصنة حسابات مستخدمين آخرين، جريمة إلكترونية يعاقب عليها القانون، ويحق لإدارة التطبيق إيقاف حسابك نهائياً وتقديم بياناتك للجهات الأمنية المعنية.",
        ],
      },
      {
        title: "3. نظام الباقات والخدمات (Free & Gold)",
        content: [
          "يوفر التطبيق باقة مجانية وباقات مدفوعة (فضية وذهبية). تختلف الميزات المتاحة لكل باقة بناءً على خطة الاشتراك الموضحة داخل التطبيق.",
          "في الباقات المدفوعة، يوافق المستخدم بمحض إرادته وصلاحيته الكاملة (عبر مربع الاختيار الصريح) على إظهار رقم هاتفه أو رابط الواتساب الخاص به على صفحة الويب لتسهيل العثور على جهازه، ويحق له إلغاء هذا الإذن في أي وقت.",
          "الرسوم المدفوعة للاشتراكات تخضع لسياسة الدفع الإلكتروني المعتمدة، ولا يتم ردها إلا في الحالات التقنية التي تحددها إدارة التطبيق.",
        ],
      },
      {
        title: "4. نقل الملكية وفض النزاعات",
        content: [
          "يجب أن تتم عمليات نقل الملكية داخل التطبيق بالتراضي بين الطرفين (البائع والمشتري) وبالمصادقة الرقمية المعتمدة.",
          "في حال البيع خارج التطبيق ونسيان نقل الملكية، يحق للمشتري الجديد تقديم طلب إثبات ملكية يدوي يرفق فيه صورة العلبة الأصلية والفاتورة. وتملك إدارة التطبيق الصلاحية الكاملة لنقل الملكية قسرياً بعد انقضاء المهلة المقررة للمالك القديم (48-72 ساعة) وثبوت صحة المستندات، وذلك لحماية سوق الهواتف المستعملة في مصر.",
        ],
      },
      {
        title: "5. إخلاء المسؤولية القانونية",
        content: [
          "تطبيق IMEI Safe هو أداة تقنية مساعدة لحماية الهواتف وتسهيل التواصل لاسترجاعها، ولا يعتبر بديلاً عن الإجراءات القانونية الرسمية (مثل عمل محضر سرقة في قسم الشرطة أو تتبع الهاتف عبر النيابة العامة والمشغلين).",
          "لا تتحمل إدارة التطبيق أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة تنتج عن تعاملات المستخدمين المالية أو الواقعية أثناء بيع الهواتف أو استلامها من أشخاص عثروا عليها. ننصح دائماً بلقاء الطرف الآخر في أماكن عامة ومؤمنة.",
          "تبذل إدارة التطبيق أقصى جهد لتأمين قاعدة البيانات وتدقيق البلاغات بكابتشا Cloudflare Turnstile، لكنها لا تتحمل مسؤولية أي اختراق تقني خارج عن الإرادة، بشرط التزامها بالمعايير القياسية للتشفير وحماية البيانات.",
        ],
      },
      {
        title: "6. إنهاء الخدمة",
        content: [
          "يحق لإدارة IMEI Safe تعديل أو إيقاف أي جزء من الخدمة، أو إلغاء حساب أي مستخدم يثبت انتهاكه لهذه الشروط والأحكام، دون إشعار مسبق.",
        ],
      },
      {
        title: "7. القانون الواجب التطبيق",
        content: [
          "تخضع هذه الشروط والأحكام وتُفسر وفقاً للقوانين السارية في جمهورية مصر العربية، وتختص المحاكم المصرية بالفصل في أي نزاع ينشأ عنها.",
          "بهذا النص، تكون قد أمنت تطبيقك قانونياً وتجارياً تماماً داخل مصر وأمام مراجعي Google Play.",
        ],
      },
    ],
  },
  en: {
    title: "Terms & Conditions",
    back: "Back to Home",
    noticeTitle: "Important:",
    noticeText:
      "By using this app or visiting the website, you agree to these Terms and Conditions. If you do not agree, please do not use the app or its services.",
    highlights: [
      { icon: ShieldAlert, title: "Safety", text: "We prohibit false reports and misuse of the platform." },
      { icon: FileCheck, title: "Ownership proof", text: "Device transfer is subject to authenticated digital verification and documentation." },
      { icon: FolderLock, title: "Account security", text: "We protect account access through secure validation and control mechanisms." },
      { icon: Scale, title: "Legal compliance", text: "These terms are interpreted under Egyptian law and applicable rules." },
    ],
    supportTitle: "Contact support",
    supportText: "For support and legal inquiries:",
    footer: "Back to Home",
    languageLabel: "Language",
    sections: [
      {
        title: "1. Account Creation and Eligibility",
        content: [
          "To use the app, you must create a real account using accurate information, including a valid email address.",
          "You are fully responsible for maintaining the confidentiality of your account credentials and for all activities performed through your account.",
          "The user confirms that the device registered in the app is legally owned by them or is under their authorized management and protection.",
        ],
      },
      {
        title: "2. Fair Use and Prohibition of False Reports",
        content: [
          "The use of this application for false reporting, impersonation, or attempts to damage the reputation of devices that do not belong to you is strictly prohibited.",
          "Submitting a false lost or stolen device report, or attempting unauthorized access to another person’s account, is a criminal offense and may result in account suspension and legal action.",
        ],
      },
      {
        title: "3. Plans and Services",
        content: [
          "The app offers a free plan and paid plans (Silver and Gold). Features vary according to the subscription plan visible in the app.",
          "For paid plans, the user may choose, through an explicit checkbox, to display their phone number or WhatsApp link on the website to help locate the device. This permission can be withdrawn at any time.",
          "Subscription fees are subject to the applicable payment policy and are refundable only in the circumstances determined by the app administration.",
        ],
      },
      {
        title: "4. Ownership Transfer and Dispute Resolution",
        content: [
          "Device transfer operations must be completed by mutual agreement between buyer and seller through authenticated digital verification within the app.",
          "If a device is sold outside the app and ownership is not updated, the new buyer may submit a manual ownership proof request with the original box photo and invoice. The app administration may transfer ownership automatically after the specified period (48-72 hours) if the documents are valid and the prior owner does not respond.",
        ],
      },
      {
        title: "5. Legal Disclaimer",
        content: [
          "IMEI Safe is a technical support tool designed to protect devices and facilitate communication for recovery. It is not a replacement for official legal procedures, such as filing a police report for theft or working with authorities and telecom operators.",
          "The app administration is not responsible for any direct or indirect damages resulting from financial or real-world transactions between users. We recommend meeting in safe, public places when dealing with other users.",
          "We make reasonable efforts to protect our database and verify reports using Cloudflare Turnstile, but we are not liable for technically unauthorized breaches outside our control when standard security measures have been implemented.",
        ],
      },
      {
        title: "6. Termination of Service",
        content: [
          "The app administration may modify or discontinue any part of the service or suspend accounts that violate these Terms and Conditions without prior notice.",
        ],
      },
      {
        title: "7. Governing Law",
        content: [
          "These Terms and Conditions are governed by the laws of the Arab Republic of Egypt, and Egyptian courts shall have jurisdiction over any disputes arising from them.",
        ],
      },
    ],
  },
} as const;

export default function TermsAndConditions() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = translations[language];
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50 to-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between md:h-24">
            <a href="/#hero" className="flex items-center gap-3">
              <motion.img
                src="/imei-logo-nobg.png"
                alt="IMEI Safe logo"
                className="h-12 w-auto object-contain md:h-16"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className="hidden text-xl font-bold text-amber-700 sm:block md:text-2xl">تطبيق IMEI</span>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
              <a href="/#hero" className="transition-colors hover:text-amber-700">الرئيسية</a>
              <a href="/#features" className="transition-colors hover:text-amber-700">المميزات</a>
              <a href="/#pricing" className="transition-colors hover:text-amber-700">الباقات</a>
              <a href="/#faq" className="transition-colors hover:text-amber-700">الأسئلة الشائعة</a>
              <Link href="/terms-and-conditions"><a className="font-bold text-amber-700">شروط الاستخدام</a></Link>
              <Link href="/privacy-policy"><a className="transition-colors hover:text-amber-700">سياسة الخصوصية</a></Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.imei.app"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center rounded-full bg-amber-600 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-500 sm:flex"
              >
                <Play className="ml-2 h-5 w-5" />
                حمّل التطبيق
              </a>
              <button
                type="button"
                aria-label="فتح القائمة"
                className="p-2 text-slate-700 lg:hidden"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 px-4 pt-24 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col gap-6 text-center text-lg font-medium text-slate-800">
            <a href="/#hero" onClick={() => setMobileMenuOpen(false)}>الرئيسية</a>
            <a href="/#features" onClick={() => setMobileMenuOpen(false)}>المميزات</a>
            <a href="/#pricing" onClick={() => setMobileMenuOpen(false)}>الباقات</a>
            <a href="/#faq" onClick={() => setMobileMenuOpen(false)}>الأسئلة الشائعة</a>
            <Link href="/terms-and-conditions" onClick={() => setMobileMenuOpen(false)}><a>شروط الاستخدام</a></Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)}><a>سياسة الخصوصية</a></Link>
            <a href="https://play.google.com/store/apps/details?id=com.imei.app" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-amber-600 py-4 text-base font-bold text-white">
              <Play className="ml-2 h-5 w-5" />
              حمّل من Google Play
            </a>
          </nav>
        </div>
      )}

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-linear-to-b from-amber-100/30 to-transparent" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 py-8 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-right">
                <h1 className="text-3xl font-bold text-slate-900">{content.title}</h1>
                <p className="mt-2 text-sm text-slate-500">IMEI Safe • الشروط والأحكام</p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-end">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-sm shadow-sm">
                  <span className="px-2 text-slate-600">{content.languageLabel}</span>
                  <button
                    type="button"
                    onClick={() => setLanguage("ar")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      isArabic ? "bg-amber-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    عربي
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      !isArabic ? "bg-amber-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    English
                  </button>
                </div>

                <Link href="/">
                  <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-amber-200 hover:text-amber-700">
                    <ArrowLeft className="h-4 w-4" />
                    {content.back}
                  </a>
                </Link>
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-amber-200 bg-white shadow-lg overflow-hidden">
              <div className="bg-linear-to-r from-amber-50 to-sky-50 px-8 py-6 text-center">
                <p className="text-lg font-bold text-amber-700">{content.noticeTitle}</p>
                <p className="mt-2 text-slate-600 leading-8">{content.noticeText}</p>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.highlights.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md"
                >
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-slate-900">{title}</h2>
                  <p className="text-sm leading-7 text-slate-600">{text}</p>
                </motion.div>
              ))}
            </div>

            <main className="space-y-8">
              {content.sections.map((section) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:p-6"
                >
                  <h2 className="mb-4 text-xl font-black text-slate-900 sm:text-2xl">{section.title}</h2>
                  <div className="space-y-4 text-base leading-8 text-slate-700">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </main>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-md"
            >
              <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
                <Mail className="h-5 w-5 text-slate-700" />
                {content.supportTitle}
              </h2>
              <p className="text-base leading-8 text-slate-700">
                {content.supportText}{" "}
                <a href="mailto:imeisafe@gmail.com" className="font-bold text-amber-700">imeisafe@gmail.com</a>
              </p>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <Link href="/">
                <a className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-500">
                  <Ban className="h-4 w-4" />
                  {content.footer}
                </a>
              </Link>
            </div>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 w-full border-t border-slate-200 bg-white/50 py-12 px-4"
          >
            <div className="text-center">
              <p className="text-sm text-slate-600">© {new Date().getFullYear()} IMEI SAFE. جميع الحقوق محفوظة.</p>
              <p className="mt-2 text-xs text-slate-500">منصة موثوقة لحماية هاتفك من السرقة والضياع</p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
