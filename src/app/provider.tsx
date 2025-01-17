import { ReactNode } from "react";
import { AuthProvider } from "../features/firebaseAuth/components/authProvider";
import { ThemeProvider } from "next-themes";


export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};
