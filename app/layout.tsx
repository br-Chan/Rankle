import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./ui/topnav";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <div className="fixed left-0 top-0 z-50 flex w-full justify-center bg-gradient-to-b from-amber-500 to-yellow-300 border-black border-2 rounded-3xl pb-1 pt-2 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <TopNav />
                    </div>
                    {children}
                </main>
            </body>
        </html>
    );
}
