import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/NavBar/SideBar";
import Navbar from "@/components/NavBar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/providers/ToastProviders";
import { ThemeProvider } from "@/components/themes/ThemeProviders";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Admin App",
  description:
    "This is created by Paras Parashar using latest and greatest Next Js with Tailwind-CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-screen">
              <div className="fixed inset-y-0 w-full z-50 h-[80px] md:pl-56">
                <Navbar />
              </div>
              <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
                <SideBar />
              </div>
              <main className="md:pl-56 h-screen pt-[80px]">
                <ToastProvider />
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
