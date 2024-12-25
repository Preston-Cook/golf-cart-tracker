import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { Toaster } from '@/components/ui/toaster';
import { LogsProvider } from '@/context/LogsContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Port-A Getaway Golf Cart Tracker',
  description:
    'A golf cart tracker for Longhorns for Christ during their time at Port Aransas',
  icons: {
    icon: '/images/lfc-logo.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '500',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '300',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${roboto.variable}`}
    >
      <body className={'flex min-h-screen flex-col antialiased'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LogsProvider>
            <ProgressBar />
            <Header />
            <main className="flex flex-1 flex-col p-4">{children}</main>
            <Footer />
            <Toaster />
          </LogsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
