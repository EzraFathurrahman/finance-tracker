'use client';
import { PiggyBank } from 'lucide-react';
import { useLanguage } from '@/contexts/language-provider';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';

function AppLogo() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2">
      <PiggyBank className="size-8 text-primary" />
      <h1 className="text-xl font-bold font-headline">{t('appName')}</h1>
    </div>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-gradient-to-b from-blue-50 to-blue-100 px-4 backdrop-blur-sm sm:px-6 dark:from-background dark:to-accent/50">
        <div className="flex items-center gap-2">
          <AppLogo />
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <MainContent>{children}</MainContent>;
}
