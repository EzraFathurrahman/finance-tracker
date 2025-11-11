import { LandingPage } from "@/components/landing-page";

export const metadata = {
  title: "KeuanganKu - AI Expense Tracker for Indonesia | Free Personal Finance App",
  description: "Track expenses effortlessly with AI. Snap receipts, upload bank statements, get instant insights. Built for Indonesia with Rupiah & Bahasa Indonesia. Free.",
  keywords: ["aplikasi keuangan Indonesia", "expense tracker Indonesia", "pelacak pengeluaran", "AI finance app", "budgeting app Indonesia", "personal finance Indonesia"],
  openGraph: {
    title: "KeuanganKu - AI Expense Tracker for Indonesia",
    description: "Stop losing track. Start building wealth with AI-powered expense tracking.",
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeuanganKu - AI Expense Tracker for Indonesia",
    description: "Stop losing track. Start building wealth with AI-powered expense tracking.",
  },
};

export default function LandingRoute() {
  return <LandingPage />;
}
