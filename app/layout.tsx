import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/firebase/auth-context';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'TRIOMA Home Kit — Your Home. Under One Intelligence.',
  description: 'Smart home ecosystem: automation, security, energy.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider><ToastProvider>{children}</ToastProvider></AuthProvider>
      </body>
    </html>
  );
}
