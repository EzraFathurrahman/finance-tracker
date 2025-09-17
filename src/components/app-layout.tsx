'use client';
import { LayoutDashboard, PiggyBank } from 'lucide-react';
import { useLanguage } from '@/contexts/language-provider';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

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
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold md:text-xl font-headline">{t('dashboard')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </SidebarInset>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip={t('dashboard')}>
                <LayoutDashboard />
                <span>{t('dashboard')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* You can add user profile info here later */}
        </SidebarFooter>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
