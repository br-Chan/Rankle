import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/features/firebaseAuth/components/authProvider";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};
