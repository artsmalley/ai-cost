import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Coating Cost Tool — Input Form",
  description: "Help shape a simple AI tool for e-coating vendor quote management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
