"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-provider";
import {
  ArrowRight,
  Bot,
  Camera,
  ChartPie,
  CheckCircle2,
  FileText,
  Globe,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LandingPage() {
  const { language, translations } = useLanguage();
  const [email, setEmail] = useState("");

  const isEnglish = language === "en";

  // Translations for landing page
  const landingTranslations = {
    en: {
      // Hero Section
      heroHeadline: "Stop Losing Track.\nStart Building Wealth.",
      heroSubheadline: "The AI-powered expense tracker built for Indonesia. Snap a photo of your receipt and let AI do the rest.",
      ctaPrimary: "Get Started Free",
      ctaSecondary: "Watch Demo",

      // Problem Section
      problemHeadline: "You're Not Bad With Money. Your Tools Are.",
      problem1Title: "30 Minutes Updating Spreadsheets",
      problem1Body: "Every weekend wasted typing receipts into Excel. There has to be a better way.",
      problem2Title: "Lost Receipts, Lost Money Tracking",
      problem2Body: "Can't track what you can't remember. Your crumpled receipts aren't helping.",
      problem3Title: "Apps Built for Americans, Not Indonesians",
      problem3Body: "USD? What's a 'checking account'? Where's BCA integration?",

      // Solution Section
      solutionHeadline: "Meet KeuanganKu: Your AI Money Guardian",
      feature1Title: "Snap. Upload. Done.",
      feature1Body: "Take a photo of any receipt, upload a bank statement PDF, or drop in a CSV file. Our AI instantly extracts every expense.\n\nPowered by Google Gemini AI - the same technology behind the world's smartest assistants.",
      feature2Title: "Speaks Your Language. Uses Your Currency.",
      feature2Body: "Full support for Bahasa Indonesia and English. Native Rupiah (IDR) formatting. Coming soon: BCA, Bank Jago, and GoPay integration.\n\nNot just translated - truly built for Indonesian users.",
      feature3Title: "See Where Your Money Really Goes",
      feature3Body: "Interactive dashboards. Category breakdowns. Time filters. Finally understand your spending patterns.\n\nGorgeous UI with light/dark mode. Finance tracking that doesn't look boring.",

      // How It Works
      howItWorksHeadline: "So Easy, You'll Actually Use It",
      step1Title: "Track Your Expenses",
      step1Body: "Snap a receipt photo, upload bank statements, or type manually. Whatever's easiest.",
      step2Title: "Let AI Organize Everything",
      step2Body: "Our AI automatically categorizes expenses and spots patterns you might miss.",
      step3Title: "Get Clear Insights",
      step3Body: "See beautiful charts showing where your money goes. Make smarter decisions.",
      step4Title: "Build Real Wealth",
      step4Body: "Cut wasteful spending. Save more. Watch your wealth grow month by month.",

      // Social Proof
      socialProofHeadline: "Join Thousands of Indonesians Taking Control",
      testimonial1: "I used to spend 2 hours every weekend updating my expense spreadsheet. Now I just snap photos and it's done. This is magic.",
      testimonial1Author: "Sarah K., Marketing Manager, Jakarta",
      testimonial2: "Finally an app that actually understands Indonesia! Rupiah, Bahasa Indonesia, and soon my BCA account? Perfect.",
      testimonial2Author: "Budi S., Software Engineer, Bandung",
      testimonial3: "The AI is crazy accurate. I uploaded my bank statement PDF and it caught every transaction. Saved me hours.",
      testimonial3Author: "Dinda R., College Student, Surabaya",

      // Stats
      stat1Label: "Expenses Tracked",
      stat2Label: "Active Users",
      stat3Label: "AI Accuracy Rate",
      stat4Label: "Average Tracking Time",

      // Tech Section
      techHeadline: "Built With Modern Tech. Blazing Fast. Secure.",
      techBody: "Powered by Google Gemini 2.5 Flash AI for intelligent file parsing. Built with Next.js 15 and React 18 for lightning-fast performance. Your data is encrypted and secured by Firebase.",

      // Comparison
      comparisonHeadline: "Why KeuanganKu Beats the Rest",

      // FAQ
      faqHeadline: "Questions? We've Got Answers.",
      faq1Q: "Is KeuanganKu really free?",
      faq1A: "Yes! We're currently 100% free while in beta. We'll introduce optional premium features later, but core expense tracking will always be free.",
      faq2Q: "Is my financial data safe?",
      faq2A: "Absolutely. All data is encrypted and stored securely on Firebase. We never sell your data. You can delete your account anytime.",
      faq3Q: "What file formats can I upload?",
      faq3A: "We support CSV files, PDF documents (bank statements, receipts), and images (JPG, PNG) of receipts. Our AI can read them all.",

      // Final CTA
      finalCtaHeadline: "Ready to Stop Losing Track\nof Your Money?",
      finalCtaSubheadline: "Join thousands of Indonesians building real wealth with KeuanganKu.",

      // Trust badges
      badge1: "100% Free Beta",
      badge2: "Secure & Encrypted",
      badge3: "Made for Indonesia",
      badge4: "AI-Powered",

      // Footer
      emailPlaceholder: "Get money-saving tips & product updates",
      subscribe: "Subscribe",
    },
    id: {
      // Hero Section
      heroHeadline: "Nabung Pangkal Kaya.\nKita Bantu Jaga Duit Kamu.",
      heroSubheadline: "Aplikasi pelacak pengeluaran dengan AI khusus untuk Indonesia. Foto struk, langsung tercatat. Semudah itu.",
      ctaPrimary: "Mulai Gratis",
      ctaSecondary: "Lihat Demo",

      // Problem Section
      problemHeadline: "Masalahnya Bukan Kamu. Tapi Alatnya.",
      problem1Title: "30 Menit Update Excel Tiap Minggu",
      problem1Body: "Buang-buang waktu weekend cuma buat input struk. Pasti ada cara yang lebih gampang.",
      problem2Title: "Struk Hilang, Lupa Pengeluaran",
      problem2Body: "Struk kusut di tas, ujung-ujungnya lupa kemana aja uang pergi.",
      problem3Title: "Aplikasi Luar Negeri Gak Paham Indonesia",
      problem3Body: "Mata uangnya USD, gak ada BCA, bahasa Inggris semua. Ribet.",

      // Solution Section
      solutionHeadline: "Kenalan Sama KeuanganKu: Penjaga Duit Cerdas Kamu",
      feature1Title: "Foto. Upload. Kelar.",
      feature1Body: "Foto struk belanja, upload PDF bank statement, atau drop file CSV. AI kami langsung baca semua pengeluaran.\n\nDidukung oleh Google Gemini AI - teknologi AI tercanggih di dunia.",
      feature2Title: "Bahasa Indonesia. Mata Uang Rupiah.",
      feature2Body: "Dukungan penuh Bahasa Indonesia dan Inggris. Format Rupiah (IDR) asli. Segera hadir: Integrasi BCA, Bank Jago, dan GoPay.\n\nBukan cuma diterjemahin - emang dibuat buat orang Indonesia.",
      feature3Title: "Lihat Kemana Uang Kamu Pergi",
      feature3Body: "Dashboard interaktif. Breakdown kategori. Filter waktu. Akhirnya paham pola pengeluaran kamu.\n\nUI cantik dengan mode terang/gelap. Aplikasi keuangan yang gak bikin bosen.",

      // How It Works
      howItWorksHeadline: "Gampang Banget, Pasti Kamu Pakai Terus",
      step1Title: "Catat Pengeluaran",
      step1Body: "Foto struk, upload statement bank, atau ketik manual. Terserah yang paling gampang.",
      step2Title: "Biar AI yang Rapiin",
      step2Body: "AI otomatis kategorikan pengeluaran dan nemuin pola yang mungkin kelewat.",
      step3Title: "Dapetin Insight Jelas",
      step3Body: "Lihat grafik cantik yang nunjukin kemana uang pergi. Keputusan lebih cerdas.",
      step4Title: "Nabung Beneran",
      step4Body: "Potong pengeluaran yang gak perlu. Nabung lebih banyak. Lihat kekayaan bertumbuh.",

      // Social Proof
      socialProofHeadline: "Bergabung dengan Ribuan Orang Indonesia yang Sudah Ambil Kontrol",
      testimonial1: "Dulu habis 2 jam tiap weekend update Excel pengeluaran. Sekarang tinggal foto, kelar. Ini sihir beneran.",
      testimonial1Author: "Sarah K., Marketing Manager, Jakarta",
      testimonial2: "Akhirnya ada aplikasi yang beneran paham Indonesia! Rupiah, Bahasa Indonesia, dan soon integrasi BCA? Sempurna.",
      testimonial2Author: "Budi S., Software Engineer, Bandung",
      testimonial3: "AI-nya akurat gila. Upload PDF bank statement langsung kebaca semua transaksi. Hemat waktu berjam-jam.",
      testimonial3Author: "Dinda R., Mahasiswi, Surabaya",

      // Stats
      stat1Label: "Pengeluaran Tercatat",
      stat2Label: "Pengguna Aktif",
      stat3Label: "Akurasi AI",
      stat4Label: "Rata-rata Waktu Catat",

      // Tech Section
      techHeadline: "Dibangun dengan Teknologi Modern. Cepat. Aman.",
      techBody: "Didukung Google Gemini 2.5 Flash AI untuk parsing file yang cerdas. Dibangun dengan Next.js 15 dan React 18 untuk performa super cepat. Data kamu dienkripsi dan diamankan oleh Firebase.",

      // Comparison
      comparisonHeadline: "Kenapa KeuanganKu Lebih Unggul",

      // FAQ
      faqHeadline: "Ada Pertanyaan? Kami Punya Jawabannya.",
      faq1Q: "Apakah KeuanganKu benar-benar gratis?",
      faq1A: "Ya! Saat ini 100% gratis karena masih beta. Nanti akan ada fitur premium opsional, tapi fitur inti pelacakan pengeluaran akan selalu gratis.",
      faq2Q: "Apakah data keuangan saya aman?",
      faq2A: "Tentu. Semua data dienkripsi dan disimpan aman di Firebase. Kami tidak pernah jual data kamu. Kamu bisa hapus akun kapan saja.",
      faq3Q: "Format file apa yang bisa di-upload?",
      faq3A: "Kami support file CSV, dokumen PDF (statement bank, struk), dan foto (JPG, PNG) struk. AI kami bisa baca semuanya.",

      // Final CTA
      finalCtaHeadline: "Siap Berhenti Kehilangan Jejak\nUang Kamu?",
      finalCtaSubheadline: "Bergabung dengan ribuan orang Indonesia yang membangun kekayaan nyata dengan KeuanganKu.",

      // Trust badges
      badge1: "100% Gratis Beta",
      badge2: "Aman & Terenkripsi",
      badge3: "Dibuat untuk Indonesia",
      badge4: "Bertenaga AI",

      // Footer
      emailPlaceholder: "Dapatkan tips hemat & update produk",
      subscribe: "Berlangganan",
    },
  };

  const t = landingTranslations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f4f1] via-white to-[#e0f4f1]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 whitespace-pre-line">
                {t.heroHeadline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                {t.heroSubheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg h-14 bg-[#74b49b] hover:bg-[#5d9a7e]">
                  <Link href="/app">
                    {t.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg h-14">
                  <a href="#demo">
                    {t.ctaSecondary}
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>{t.badge1}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>{t.badge2}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="h-5 w-5 text-red-600" />
                  <span>{t.badge3}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative rounded-2xl shadow-2xl bg-white p-6 border border-gray-200">
                {/* Mockup placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#74b49b] to-[#5d9a7e] rounded-lg flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <ChartPie className="h-20 w-20 mx-auto" />
                    <p className="text-lg font-semibold">App Dashboard Preview</p>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-lg animate-bounce">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#74b49b]">10K+</div>
              <div className="text-gray-600 mt-2">{t.stat1Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#74b49b]">2.5K+</div>
              <div className="text-gray-600 mt-2">{t.stat2Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#74b49b]">95%</div>
              <div className="text-gray-600 mt-2">{t.stat3Label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#74b49b]">30s</div>
              <div className="text-gray-600 mt-2">{t.stat4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.problemHeadline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#74b49b] transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>{t.problem1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.problem1Body}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#74b49b] transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>{t.problem2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.problem2Body}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-[#74b49b] transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>{t.problem3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{t.problem3Body}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#e0f4f1]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.solutionHeadline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 border-[#74b49b] shadow-lg">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#74b49b] to-[#5d9a7e] flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{t.feature1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base whitespace-pre-line leading-relaxed">
                  {t.feature1Body}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-[#74b49b] shadow-lg">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-white flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl">{t.feature2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base whitespace-pre-line leading-relaxed">
                  {t.feature2Body}
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-[#74b49b] shadow-lg">
              <CardHeader>
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <ChartPie className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{t.feature3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base whitespace-pre-line leading-relaxed">
                  {t.feature3Body}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.howItWorksHeadline}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-[#74b49b] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                1
              </div>
              <Camera className="h-12 w-12 mx-auto text-[#74b49b]" />
              <h3 className="text-xl font-bold">{t.step1Title}</h3>
              <p className="text-gray-600">{t.step1Body}</p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-[#74b49b] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                2
              </div>
              <Zap className="h-12 w-12 mx-auto text-[#74b49b]" />
              <h3 className="text-xl font-bold">{t.step2Title}</h3>
              <p className="text-gray-600">{t.step2Body}</p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-[#74b49b] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                3
              </div>
              <ChartPie className="h-12 w-12 mx-auto text-[#74b49b]" />
              <h3 className="text-xl font-bold">{t.step3Title}</h3>
              <p className="text-gray-600">{t.step3Body}</p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-[#74b49b] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                4
              </div>
              <TrendingUp className="h-12 w-12 mx-auto text-[#74b49b]" />
              <h3 className="text-xl font-bold">{t.step4Title}</h3>
              <p className="text-gray-600">{t.step4Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.socialProofHeadline}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 italic mb-4">"{t.testimonial1}"</p>
                <p className="text-sm text-gray-500">— {t.testimonial1Author}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 italic mb-4">"{t.testimonial2}"</p>
                <p className="text-sm text-gray-500">— {t.testimonial2Author}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 italic mb-4">"{t.testimonial3}"</p>
                <p className="text-sm text-gray-500">— {t.testimonial3Author}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            {t.techHeadline}
          </h2>
          <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            {t.techBody}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">Next.js 15</div>
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">React 18</div>
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">TypeScript</div>
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">Google Gemini AI</div>
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">Firebase</div>
            <div className="bg-white/10 px-6 py-3 rounded-full text-lg">Tailwind CSS</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            {t.faqHeadline}
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.faq1Q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.faq1A}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.faq2Q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.faq2A}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.faq3Q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.faq3A}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#74b49b] to-[#5d9a7e] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 whitespace-pre-line">
            {t.finalCtaHeadline}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            {t.finalCtaSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg h-14">
              <Link href="/app">
                {t.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>{t.badge1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>{t.badge2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>{t.badge3}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>{t.badge4}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold mb-2">KeuanganKu</p>
            <p className="text-gray-400">Nabung pangkal kaya bro.</p>
          </div>

          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
              />
              <Button variant="secondary">{t.subscribe}</Button>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 KeuanganKu. Built with ❤️ for Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
