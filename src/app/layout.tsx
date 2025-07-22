import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/features/topnav/components/topnav";
import { inter } from "@/fonts";
import { AppProvider } from "./provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Rankle",
    description: "for NYT Games",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.className} overflow-y-scroll bg-background text-black antialiased dark:text-white`}
            >
                <AppProvider>
                    <main className="flex min-h-screen flex-col items-center justify-between py-20">
                        <TopNav />
                        <div className="container flex flex-col items-center justify-center px-5">
                            {children}
                        </div>
                    </main>
                    <Toaster richColors />
                </AppProvider>
            </body>
        </html>
    );
}
