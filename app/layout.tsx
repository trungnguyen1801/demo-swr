import { ReactQueryProvider } from './reactQueryProvider';
import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ReactQueryProvider>
        <body>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}