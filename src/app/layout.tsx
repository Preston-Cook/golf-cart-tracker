import type { Metadata } from "next";
import { Inter, Monoton } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Port-A Getaway Golf Cart Tracker",
  description:
    "A golf cart tracker for Longhorns for Christ during their time at Port Aransas",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌴</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen h-auto ${inter.className} bg-[#5A3E2B]`}
      >
        <Header />
        {children}
        <Footer />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.js"
        ></script>
      </body>
    </html>
  );
}
