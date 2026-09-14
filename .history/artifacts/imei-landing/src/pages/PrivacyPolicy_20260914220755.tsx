import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Lock, Smartphone, UserCog, RefreshCcw, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const translations = {
  ar: {
    title: "سياسة الخصوصية وأمان البيانات",
    back: "العودة إلى الرئيسية",
    noticeTitle: "ملاحظة مهمة:",
    noticeText:
      "هذه السياسة تم إعدادها بهدف مراجعة التزام التطبيق بمعايير Google Play المتعلقة بالخصوصية وأمان البيانات، وتوافقها مع قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.",
    highlights: [
      { icon: ShieldCheck, title: "حماية كاملة", text: "نحمي بياناتك وفق أعلى معايير الأمان والتشفير." },
      { icon: Lock, title: "تشفير البيانات", text: "يتم تشفير نقل البيانات وتخزينها داخل بنية آمنة." },
      { icon: Smartphone, title: "عدم ربط IMEI بهويتك", text: "يتم تحويل IMEI إلى هوية مشفّرة محلياً قبل الإرسال." },
      { icon: UserCog, title: "موافقة صريحة", text: "لا نعرض بيانات التواصل إلا بعد إذن صريح من المستخدم." },
    ],
    sectionTitle: "بيان الالتزام",
    sectionItems: [
      "يتم التعامل مع بيانات الهواتف والملكية وفق مبدأ الحد الأدنى من البيانات والمعالجة المشروعة.",
      "لا يتم تبادل أرقام IMEI الصريحة مع أطراف خارجية دون الحاجة التقنية المصرح بها.",
      "يتم الحصول على موافقة صريحة قبل مشاركة أي بيانات تواصل عند التفعيل الاختياري للباقات المدفوعة.",
      "نلتزم بتحديث السياسة بانتظام وابلاغ المستخدمين بأي تغييرات جوهرية داخل التطبيق.",
    ],
    supportTitle: "التواصل مع الدعم",
    supportText: "لأي استفسارات أو طلبات حذف البيانات أو مراجعة الحسابات المسجلة، يمكنك التواصل معنا عبر البريد الإلكتروني:",
    footer: "العودة إلى الصفحة الرئيسية",
    languageLabel: "اللغة",
    sections: [
      {
        title: "1. البيانات التي نجمعها وكيفية معالجتها",
        content: [
          "بيانات الحساب الشخصي: نجمع البريد الإلكتروني وكلمة المرور المشفرة فقط لغرض إنشاء الحساب وتوثيق الهوية وإدارة الاشتراكات داخل التطبيق.",
          "معرّفات الأجهزة (المهمة لجوجل): تطبيقنا لا يقوم بجمع أو تخزين أو نقل أرقام الـ IMEI الصريحة الخاصة بهاتفك إلى الخوادم. يتم تحويل رقم الـ IMEI محلياً داخل جهازك إلى رمز مشفر غير قابل للتراجع (SHA-256 Hash) قبل إرساله، لضمان السرية المطلقة وعدم ربط عتاد الهاتف بهويتك الشخصية برمجياً [1.1.3، 1.3.1].",
          "بيانات التواصل (اختيارية): في الخطط المتقدمة (الفضية والذهبية)، نتيح لك خياراً اختيارياً بالكامل لمشاركة رقم هاتفك أو رابط الواتساب لتسهيل التواصل معك عند العثور على جهازك المفقود [1.1.3، 1.3.1].",
        ],
      },
      {
        title: "2. آلية عمل الباقات وحماية الهوية (Data Sharing)",
        content: [
          "الباقة المجانية (Free): عند مسح الباركود لهاتف مفقود على الباقة المجانية، لا تظهر أي بيانات تواصل أو معلومات شخصية للمالك على الويب. يتم تفعيل نظام \"صندوق البريد الآمن\" محميًا بكابتشا Cloudflare Turnstile وRate Limiting لمنع الإغراق، حيث يترك واجد الهاتف رقم تواصله طواعية، ليرسله السيرفر كإشعار داخلي وآمن تماماً إلى حساب المالك دون تسريب بيانات أي طرف.",
          "الباقات المدفوعة (Silver / Gold): تمنح المستخدم مربع اختيار صريح (Checkbox). إذا قام المستخدم بتفعيله برغبته الكاملة وموافقته الصريحة عند الإبلاغ عن الفقدان، يسمح النظام بظهور رقم هاتفه أو زر الواتساب الخاص به على صفحة الويب لتمكين المكتشف من الاتصال به مباشرة. يحق للمستخدم إلغاء هذا الإذن فوراً في أي وقت [1.1.3، 1.3.1].",
        ],
      },
      {
        title: "3. أمن وحفظ البيانات",
        content: [
          "يتم نقل كافة البيانات بين التطبيق والخادم عبر بروتوكول اتصال آمن ومشفر بالكامل (HTTPS / SSL).",
          "يتم تخزين البيانات وإدارة سياسات الوصول إليها عبر خوادم مشفرة وقواعد بيانات آمنة مدعومة بسياسات حماية صارمة على مستوى الصفوف (Row Level Security - RLS)، مما يضمن عدم وصول أي مستخدم غير مصرح له لبيانات جهاز آخر.",
        ],
      },
      {
        title: "4. نقل ملكية الأجهزة",
        content: [
          "تتم عمليات نقل ملكية الهواتف بين المستخدمين من خلال عمليات مصادقة رقمية مشفرة تعتمد على الحسابات النشطة والـ User ID المعمى وكلمات المرور المؤقتة، دون الحاجة لتداول أو حفظ نصوص صريحة لبيانات الـ IMEI أو البيانات الشخصية للبائع والمشتري معاً على واجهة واحدة، امتثالاً لسياسات المتجر لحظر ربط المعرفات الدائمة بالهوية [1.1.3، 1.3.1].",
        ],
      },
      {
        title: "5. التعديلات على سياسة الخصوصية",
        content: [
          "نحتفظ بالحق في تحديث سياسة الخصوصية هذه لمواكبة أي تحديثات تقنية أو قانونية. سيتم إشعار المستخدمين بأي تغييرات جوهرية من خلال التطبيق، ويُعد استمرار استخدامك للتطبيق بعد التحديث موافقة صريحة منك عليها.",
        ],
      },
      {
        title: "6. حقوق المستخدم والتواصل",
        content: [
          "بموجب القوانين المعمول بها، يحق لك في أي وقت مراجعة بياناتك، أو تعديلها، أو طلب حذف حسابك وأجهزتك المسجلة نهائياً من قاعدة بياناتنا. لأي استفسارات، يمكنك التواصل مع الدعم الفني عبر بريدنا الرسمي: imeisafe@gmail.com",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy & Data Security",
    back: "Back to Home",
    noticeTitle: "Important note:",
    noticeText:
      "This policy was prepared to support compliance with Google Play privacy and data safety requirements and applicable personal data protection laws.",
    highlights: [
      { icon: ShieldCheck, title: "Full protection", text: "We protect your data according to the highest security standards." },
      { icon: Lock, title: "Encrypted data", text: "All transfer and storage is protected with secure encryption." },
      { icon: Smartphone, title: "No IMEI linkage", text: "The IMEI is converted to a one-way hash locally before it is sent." },
      { icon: UserCog, title: "Explicit consent", text: "We only display contact data after receiving clear user approval." },
    ],
    sectionTitle: "Compliance statement",
    sectionItems: [
      "We handle phone and ownership data using the minimum necessary information and lawful processing principles.",
      "We do not exchange plain IMEI values with third parties without strictly necessary authorized technical need.",
      "We obtain explicit consent before any contact data is shared in premium plans.",
      "We update this policy regularly and notify users of important changes in the app.",
    ],
    supportTitle: "Contact support",
    supportText: "For any privacy or security questions, you can contact us by email:",
    footer: "Back to Home",
    languageLabel: "Language",
    sections: [
      {
        title: "1. Information We Collect and How We Use It",
        content: [
          "Account data: We collect your email address and encrypted password only to create and manage your account, verify your identity, and support in-app subscriptions and access control.",
          "Device identifiers (Google-required): We do not collect, store, or transmit your original IMEI number to our servers in plain form. Your IMEI is converted locally on the device to a non-reversible SHA-256 hash before it is sent, ensuring maximum privacy and preventing direct linking between the hardware ID and your personal account.",
          "Optional contact information: In premium plans (Silver and Gold), you may voluntarily provide your phone number or WhatsApp link to help you be contacted if your device is found.",
        ],
      },
      {
        title: "2. Plan Function and Identity Protection",
        content: [
          "Free plan: When a lost device is scanned under the free plan, no contact or personal data is shown to the finder on the website. A secure message box is used, protected by Cloudflare Turnstile and rate limiting to prevent abuse. The finder can leave a voluntary contact detail that is sent securely to the owner’s internal account notification system.",
          "Paid plans (Silver / Gold): Users receive an explicit checkbox option. If they choose to enable it willingly and clearly during a lost-device report, their phone number or WhatsApp button may appear on the web page so the finder can contact them directly. The user may revoke this consent at any time.",
        ],
      },
      {
        title: "3. Data Security and Retention",
        content: [
          "All data transmitted between the app and servers is protected using HTTPS/SSL encryption.",
          "Data is stored in secure environments with strict access policies, including Row Level Security (RLS) controls, to prevent unauthorized access to another user’s device or profile.",
        ],
      },
      {
        title: "4. Device Ownership Transfer",
        content: [
          "Device ownership transfer processes are handled through encrypted digital authentication based on active accounts, protected user IDs, and temporary passwords or verification codes. We do not require the explicit sharing of plain IMEI values or personal data between buyer and seller on a single interface, in line with marketplace rules against using permanent device IDs as personal identity links.",
        ],
      },
      {
        title: "5. Changes to This Privacy Policy",
        content: [
          "We reserve the right to update this Privacy Policy to reflect technical, legal, or regulatory changes. We will notify users of any material changes through the app, and continued use after an update constitutes your explicit consent to the revised policy.",
        ],
      },
      {
        title: "6. User Rights and Contact",
        content: [
          "Under applicable law, you may review, update, or request deletion of your account and registered devices at any time. For questions, contact our support team at imeisafe@gmail.com.",
        ],
      },
    ],
  },
} as const;

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const content = translations[language];
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex justify-start px-4 py-2">
          <motion.img
            src="/imei-logo-nobg.png"
            alt="IMEI Safe logo"
            className="h-14 w-24"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-linear-to-b from-blue-100/30 to-transparent" />

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
                <p className="mt-2 text-sm text-slate-500">IMEI Safe • أمان البيانات والخصوصية</p>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-end">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 text-sm shadow-sm">
                  <span className="px-2 text-slate-600">{content.languageLabel}</span>
                  <button
                    type="button"
                    onClick={() => setLanguage("ar")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      isArabic ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    عربي
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      !isArabic ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    English
                  </button>
                </div>

                <Link href="/">
                  <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-700">
                    <ArrowLeft className="h-4 w-4" />
                    {content.back}
                  </a>
                </Link>
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-emerald-200 bg-white shadow-lg overflow-hidden">
              <div className="bg-linear-to-r from-emerald-50 to-sky-50 px-8 py-6 text-center">
                <p className="text-lg font-bold text-emerald-700">{content.noticeTitle}</p>
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
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
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
              className="mt-8 rounded-3xl border border-sky-200 bg-linear-to-br from-sky-50 to-slate-50 p-5 shadow-md"
            >
              <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-sky-700" />
                {content.sectionTitle}
              </h2>
              <ul className="space-y-3 text-base leading-8 text-slate-700">
                {content.sectionItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>

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
                <a href="mailto:imeisafe@gmail.com" className="font-bold text-sky-700">imeisafe@gmail.com</a>
              </p>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <Link href="/">
                <a className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500">
                  <RefreshCcw className="h-4 w-4" />
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
