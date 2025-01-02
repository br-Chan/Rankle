import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./ui/topnav";
import { inter } from "./ui/fonts";

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
            <body className={`${inter.className} antialiased`}>
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <div className="fixed left-0 top-0 z-50 flex w-full justify-center border-b-2 border-black dark:border-white bg-amber-300 pb-1 pt-2 lg:p-4 dark:bg-amber-400">
                        <TopNav />
                    </div>
                    {children}
                </main>
            </body>
        </html>
    );
}
