import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
});

export const metadata = {
  title: "FundForge - The Ultimate Crowdfunding Platform",
  description: "Transform your creative vision into reality. FundForge is the ultimate crowdfunding platform connecting creators with supporters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white`}>
        <SessionWrapper> 
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
