import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/features/firebaseAuth/components/authProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};
