import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI伴侣调教工坊",
  description: "AI角色扮演提示词生成器 - 为乙女和RP爱好者打造",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
