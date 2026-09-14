import { ArrowLeft, ShieldCheck, Lock, Smartphone, UserCog, RefreshCcw, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const sections = [
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
];

const highlights = [
  { icon: ShieldCheck, title: "حماية كاملة", text: "نحمي بياناتك وفق أعلى معايير الأمان والتشفير." },
  { icon: Lock, title: "تشفير البيانات", text: "يتم تشفير نقل البيانات وتخزينها داخل بنية آمنة." },
  { icon: Smartphone, title: "عدم ربط IMEI بهويتك", text: "يتم تحويل IMEI إلى هوية مشفّرة محلياً قبل الإرسال." },
  { icon: UserCog, title: "موافقة صريحة", text: "لا نعرض بيانات التواصل إلا بعد إذن صريح من المستخدم." },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f8ff] text-slate-800" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-sky-700">IMEI Safe</p>
                <h1 className="text-2xl font-black text-slate-900">سياسة الخصوصية وأمان البيانات</h1>
              </div>
            </div>

            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
                <ArrowLeft className="h-4 w-4" />
                العودة إلى الرئيسية
              </a>
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-lg font-bold text-slate-900">{title}</h2>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <main className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
            <p className="font-bold">ملاحظة مهمة:</p>
            <p>
              هذه السياسة تم إعدادها بهدف مراجعة التزام التطبيق بمعايير Google Play المتعلقة بالخصوصية وأمان
              البيانات، وتوافقها مع قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h2 className="mb-4 text-xl font-black text-slate-900 sm:text-2xl">{section.title}</h2>
                <div className="space-y-4 text-base leading-8 text-slate-700">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
              <CheckCircle2 className="h-5 w-5 text-sky-700" />
              بيان الالتزام
            </h2>
            <ul className="space-y-3 text-base leading-8 text-slate-700">
              <li>• يتم التعامل مع بيانات الهواتف والملكية وفق مبدأ الحد الأدنى من البيانات والمعالجة المشروعة.</li>
              <li>• لا يتم تبادل أرقام IMEI الصريحة مع أطراف خارجية دون الحاجة التقنية المصرح بها.</li>
              <li>• يتم الحصول على موافقة صريحة قبل مشاركة أي بيانات تواصل عند التفعيل الاختياري للباقات المدفوعة.</li>
              <li>• نلتزم بتحديث السياسة بانتظام وابلاغ المستخدمين بأي تغييرات جوهرية داخل التطبيق.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
              <Mail className="h-5 w-5 text-slate-700" />
              التواصل مع الدعم
            </h2>
            <p className="text-base leading-8 text-slate-700">
              لأي استفسارات أو طلبات حذف البيانات أو مراجعة الحسابات المسجلة، يمكنك التواصل معنا عبر البريد
              الإلكتروني: <a href="mailto:imeisafe@gmail.com" className="font-bold text-sky-700">imeisafe@gmail.com</a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500">
                <RefreshCcw className="h-4 w-4" />
                العودة إلى الصفحة الرئيسية
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
