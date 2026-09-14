import { ArrowLeft, ShieldCheck, Lock, Smartphone, UserCog, RefreshCcw, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const sections = [
  {
    title: "1. Information We Collect and How We Use It",
    content: [
      "Account data: We collect your email address and encrypted password only to create and manage your account, verify your identity, and support in-app subscriptions and access control.",
      "Device identifiers (Google-required): We do not collect, store, or transmit your original IMEI number to our servers in plain form. Your IMEI is converted locally on the device to a non-reversible SHA-256 hash before it is sent, ensuring maximum privacy and preventing direct linking between the hardware ID and your personal account.",
      "Optional contact information: In premium plans (Silver and Gold), you may voluntarily provide your phone number or WhatsApp link to help you be contacted if your device is found.",
    ],
  },
  {
    title: "2. Plan Structure and Identity Protection",
    content: [
      "Free plan: When a lost device is scanned on the free plan, no personal contact details are shown to the finder on the website. A secure message box is used, protected by Cloudflare Turnstile and rate limiting to prevent abuse. The finder can leave a voluntary contact detail that is sent securely to the owner’s internal account notification system.",
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
];

const highlights = [
  { icon: ShieldCheck, title: "Full protection", text: "We protect your data according to high international security standards." },
  { icon: Lock, title: "Encrypted data", text: "All data transfer and storage are protected with secure encryption." },
  { icon: Smartphone, title: "No direct IMEI linkage", text: "IMEI is hashed locally before being sent to the server." },
  { icon: UserCog, title: "Explicit consent", text: "We only show contact details after the user gives clear permission." },
];

export default function PrivacyPolicyEN() {
  return (
    <div className="min-h-screen bg-[#f5f8ff] text-slate-800" dir="ltr">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-sky-700">IMEI Safe</p>
                <h1 className="text-2xl font-black text-slate-900">Privacy Policy & Data Security</h1>
              </div>
            </div>

            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
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
            <p className="font-bold">Important note:</p>
            <p>
              This policy is intended to support compliance with Google Play privacy and data safety requirements,
              as well as applicable personal data protection laws.
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

          <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
              <CheckCircle2 className="h-5 w-5 text-sky-700" />
              Compliance statement
            </h2>
            <ul className="space-y-3 text-base leading-8 text-slate-700">
              <li>• We process only the minimum data required to provide the service.</li>
              <li>• We do not share original IMEI values with third parties unless strictly necessary and authorized.</li>
              <li>• We obtain explicit consent before showing user contact information in premium plan features.</li>
              <li>• We update this policy regularly and notify users about material changes in the app.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-slate-900">
              <Mail className="h-5 w-5 text-slate-700" />
              Contact support
            </h2>
            <p className="text-base leading-8 text-slate-700">
              For any privacy or security questions, please contact us at <a href="mailto:imeisafe@gmail.com" className="font-bold text-sky-700">imeisafe@gmail.com</a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500">
                <RefreshCcw className="h-4 w-4" />
                Back to Home
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
