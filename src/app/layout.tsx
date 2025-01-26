import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/features/topnav/components/topnav";
import { inter } from "@/fonts";
import { AppProvider } from "./provider";

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
                className={`${inter.className} bg-zinc-200 text-black antialiased dark:bg-zinc-800 dark:text-white`}
            >
                <AppProvider>
                    <main className="flex min-h-screen flex-col items-center justify-between py-24">
                        <TopNav />
                        <div className="container flex justify-center px-10">
                            {children}
                            </div>
                    </main>
                </AppProvider>
            </body>
        </html>
    );
}
