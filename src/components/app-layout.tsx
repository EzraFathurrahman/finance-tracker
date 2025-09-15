'use client';
import { CircleDollarSign, Landmark, LayoutDashboard, Wallet, PiggyBank } from 'lucide-react';
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleComingSoon = () => {
    toast({
      title: t('comingSoon'),
    });
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <PiggyBank className="size-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">{t('appName')}</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span>{t('dashboard')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>{t('connectBank')}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleComingSoon} tooltip={t('bca')}>
                  <Landmark />
                  <span>{t('bca')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleComingSoon} tooltip={t('jago')}>
                  <CircleDollarSign />
                  <span>{t('jago')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleComingSoon} tooltip={t('gopay')}>
                  <Wallet />
                  <span>{t('gopay')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {/* You can add user profile info here later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl font-headline">{t('dashboard')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
