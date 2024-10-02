import type { Metadata } from "next";
import "./styles/global.css";
import favicon from "./favicon.ico";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
