import React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

const ShadcnThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default ShadcnThemeProvider;
