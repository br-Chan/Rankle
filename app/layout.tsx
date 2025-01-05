import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./ui/topnav";
import { inter } from "./ui/fonts";
import { ThemeProvider } from "next-themes";

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
                <ThemeProvider attribute="class">
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                        <div className="fixed left-0 top-0 z-50 flex w-full justify-center border-b-2 border-black bg-amber-300 pb-1 pt-2 dark:border-white dark:bg-amber-400 lg:p-4">
                            <TopNav />
                        </div>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
