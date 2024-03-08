import './global.css';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'CoinSentry',
  description: 'O CoinSentry é website para controle de finanças pessoais',
  icons: [
    './images/android-chrome-192x192.png',
    './images/favicon.ico',
    'images/',
  ],
  manifest: 'manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body id="root" className={font.className}>
        {children}
      </body>
    </html>
  );
}
