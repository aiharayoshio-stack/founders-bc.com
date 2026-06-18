import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PLAY BOLD | Baseball Team LP",
  description:
    "PLAY BOLDを掲げる野球チームの選手紹介、募集情報、スポンサー情報を伝えるランディングページです。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
