import { ArrowLeft, Scale, ShieldAlert, FolderLock, FileCheck, Gavel, Mail, Ban } from "lucide-react";
import { Link } from "wouter";

const sections = [
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
];

const highlights = [
  { icon: ShieldAlert, title: "السلامة القانونية", text: "نلتزم بعدم السماح ببلاغات كاذبة أو استخدامات غير قانونية." },
  { icon: FileCheck, title: "الملكية المسجلة", text: "تستند عمليات نقل الملكية إلى مصادقة رقمية وآليات حماية داخل التطبيق." },
  { icon: FolderLock, title: "حماية الحساب", text: "يتم حفظ الحسابات وبطاقات المستخدمين وفق معايير أمنية صارمة." },
  { icon: Scale, title: "المساءلة", text: "نطبق هذه الشروط وفق القوانين السارية في جمهورية مصر العربية." },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Gavel className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">IMEI Safe</p>
                <h1 className="text-2xl font-black text-slate-900">الشروط والأحكام</h1>
              </div>
            </div>

            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-200 hover:text-amber-700">
                <ArrowLeft className="h-4 w-4" />
                العودة إلى الرئيسية
              </a>
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-lg font-bold text-slate-900">{title}</h2>
              <p className="text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <main className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            <p className="font-bold">ملاحظة:</p>
            <p>
              باستخدامك لهذا التطبيق أو تصفحك للموقع الإلكتروني التابع له، فإنك توافق تماماً على الالتزام بالشروط
              والأحكام التالية. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام التطبيق أو الخدمات المرتبطة به.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
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

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
              <Mail className="h-5 w-5 text-slate-700" />
              التواصل مع الدعم
            </h2>
            <p className="text-base leading-8 text-slate-700">
              للتواصل مع الدعم: <a href="mailto:imeisafe@gmail.com" className="font-bold text-amber-700">imeisafe@gmail.com</a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-500">
                <Ban className="h-4 w-4" />
                العودة إلى الصفحة الرئيسية
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
