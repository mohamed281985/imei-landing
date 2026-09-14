import { ArrowLeft, Scale, ShieldAlert, FolderLock, FileCheck, Gavel, Mail, Ban } from "lucide-react";
import { Link } from "wouter";

const sections = [
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
];

const highlights = [
  { icon: ShieldAlert, title: "Safety", text: "We prohibit false reports and misuse of the platform." },
  { icon: FileCheck, title: "Ownership proof", text: "Device transfer is subject to authenticated digital verification and documentation." },
  { icon: FolderLock, title: "Account security", text: "We protect account access through secure validation and control mechanisms." },
  { icon: Scale, title: "Legal compliance", text: "These terms are interpreted under Egyptian law and applicable rules." },
];

export default function TermsAndConditionsEN() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800" dir="ltr">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Gavel className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">IMEI Safe</p>
                <h1 className="text-2xl font-black text-slate-900">Terms & Conditions</h1>
              </div>
            </div>

            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-200 hover:text-amber-700">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
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
            <p className="font-bold">Important:</p>
            <p>
              By using this app or visiting the website, you agree to these Terms and Conditions. If you do not agree,
              please do not use the app or its services.
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
              Contact support
            </h2>
            <p className="text-base leading-8 text-slate-700">
              For support and legal inquiries: <a href="mailto:imeisafe@gmail.com" className="font-bold text-amber-700">imeisafe@gmail.com</a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-500">
                <Ban className="h-4 w-4" />
                Back to Home
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
