import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Daily Talk",
  description: "Engage in meaningful conversations with ease.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Daily Talk",
    description: "Engage in meaningful conversations with ease.",
    images: "/og-image.png",
    url: "https://dailytalk.com",
    siteName: "Daily Talk",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = `${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Thêm metadata OpenGraph */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={bodyClasses}>
        {children}
        <div id="portals"></div>

        <noscript>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
            <video
              src="/nojs.mp4"
              className="w-64 h-64 mb-4 rounded-lg"
              muted
              loop
              autoPlay
              playsInline
              disablePictureInPicture
            />
            <h1 className="text-2xl font-bold">Daily Talk Web</h1>
            <p className="text-sm">
              Please enable JavaScript to experience the full functionality of the app.
            </p>
          </div>
        </noscript>

      </body>
    </html>
  );
}
