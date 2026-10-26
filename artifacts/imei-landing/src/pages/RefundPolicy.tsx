import { ArrowLeft, CalendarDays, Clock3, CreditCard, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const sections = [
  {
    title: "2. سياسة استرداد المدفوعات",
    paragraphs: [
      "يحرص تطبيق IMEI Safe على توفير تجربة دفع واضحة وآمنة للمستخدمين. تخضع طلبات استرداد الأموال لشروط الخدمة المشتراة، وحالة الاشتراك، وطبيعة المعاملة، والقوانين المعمول بها في جمهورية مصر العربية.",
    ],
  },
  {
    title: "3. الاشتراكات والخدمات الرقمية",
    paragraphs: [
      "يمكن للمستخدم طلب إلغاء الاشتراك أو مراجعة طلب استرداد المبلغ المدفوع من خلال التواصل مع فريق الدعم عبر واتساب أو البريد الإلكتروني. تتم مراجعة كل طلب وفقًا لشروط الاشتراك والخدمة المقدمة والحقوق المقررة للمستهلك بموجب القانون.",
    ],
  },
  {
    title: "4. المدفوعات المكررة أو الخاطئة",
    paragraphs: [
      "في حالة خصم المبلغ مرتين مقابل المعاملة نفسها، أو حدوث خطأ في الدفع، يمكن للمستخدم التواصل معنا لتقديم تفاصيل المعاملة والتحقق منها واتخاذ الإجراء المناسب.",
    ],
  },
  {
    title: "5. كيفية طلب الاسترداد",
    paragraphs: [
      "لطلب استرداد الأموال، يرجى التواصل عبر واتساب على الرقم +201023579280 أو البريد الإلكتروني imeisafe@gmail.com، مع توضيح رقم المعاملة وتاريخ الدفع وسبب الطلب.",
      "يرجى عدم إرسال كلمات المرور أو أرقام البطاقات البنكية الكاملة أو رموز التحقق.",
    ],
  },
  {
    title: "6. مدة مراجعة الطلبات",
    paragraphs: [
      "تستغرق مراجعة طلبات الاسترداد من يوم إلى 3 أيام عمل، بدءًا من استلام الطلب واكتمال المعلومات اللازمة لمراجعته. وسيتم إبلاغ المستخدم بنتيجة المراجعة بعد الانتهاء منها.",
      "في حال الموافقة على الاسترداد، تتم معالجة المبلغ وفقًا لإجراءات مزود الدفع والبنك المعني، وقد تستغرق عملية وصول المبلغ مدة إضافية.",
    ],
  },
  {
    title: "7. إلغاء الاشتراكات",
    paragraphs: [
      "يمكن للمستخدم التواصل مع فريق الدعم لطلب إلغاء الاشتراك أو إيقاف التجديد، حسب آلية الاشتراك المستخدمة. ولا يعني إلغاء الاشتراك تلقائيًا استرداد المدفوعات السابقة.",
    ],
  },
  {
    title: "8. التواصل والدعم",
    paragraphs: ["للاستفسارات المتعلقة بالمدفوعات أو الإلغاء أو الاسترداد، يرجى التواصل عبر وسائل الاتصال الموضحة أدناه."],
  },
];

export default function RefundPolicy() {
  return (
    <div dir="rtl" className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/50 to-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/imei-logo-nobg.png" alt="IMEI Safe" className="h-11 w-auto object-contain" />
            <span className="font-bold text-emerald-800">IMEI Safe</span>
          </a>
          <Link href="/">
            <a className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800">
              <ArrowLeft className="h-4 w-4" />
              الرئيسية
            </a>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-8 border-b border-slate-200 pb-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              IMEI Safe
            </div>
            <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">سياسة الاسترجاع والاسترداد</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays className="h-4 w-4" />
              تاريخ آخر تحديث: 26 أكتوبر 2026
            </p>
          </div>

          <section className="mb-8 rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
              <CreditCard className="h-5 w-5 text-emerald-700" />
              1. معلومات النشاط التجاري
            </h2>
            <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <div><dt className="font-semibold text-slate-500">اسم التطبيق</dt><dd className="mt-1 text-slate-800">IMEI Safe</dd></div>
              <div><dt className="font-semibold text-slate-500">الدولة</dt><dd className="mt-1 text-slate-800">جمهورية مصر العربية (Egypt)</dd></div>
              <div><dt className="font-semibold text-slate-500">البريد الإلكتروني</dt><dd className="mt-1"><a className="text-emerald-800 underline underline-offset-2" href="mailto:imeisafe@gmail.com">imeisafe@gmail.com</a></dd></div>
              <div><dt className="font-semibold text-slate-500">التواصل عبر واتساب</dt><dd className="mt-1"><a className="text-emerald-800 underline underline-offset-2" href="https://wa.me/201023579280">+201023579280</a></dd></div>
              <div className="sm:col-span-2"><dt className="font-semibold text-slate-500">الموقع الإلكتروني</dt><dd className="mt-1"><a className="text-emerald-800 underline underline-offset-2" href="https://app.imei-safe.me">https://app.imei-safe.me</a></dd></div>
            </dl>
          </section>

          <div className="space-y-4">
            {sections.map((section) => (
              <section key={section.title} className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl">{section.title}</h2>
                <div className="space-y-3 text-sm leading-8 text-slate-700 sm:text-base">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.title.startsWith("8.") && (
                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:gap-6">
                      <a className="inline-flex items-center gap-2 font-semibold text-emerald-800" href="mailto:imeisafe@gmail.com"><Mail className="h-4 w-4" />imeisafe@gmail.com</a>
                      <a className="inline-flex items-center gap-2 font-semibold text-emerald-800" href="https://wa.me/201023579280"><MessageCircle className="h-4 w-4" />+201023579280</a>
                      <span className="inline-flex items-center gap-2 text-slate-600"><Clock3 className="h-4 w-4" />جمهورية مصر العربية</span>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-6 rounded-lg border-r-4 border-emerald-600 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-950">
            تُطبق هذه السياسة بما يتوافق مع القوانين المعمول بها في جمهورية مصر العربية، بما في ذلك حقوق المستهلك الإلزامية.
          </p>
        </motion.div>
      </main>
    </div>
  );
}