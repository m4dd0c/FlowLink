"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ToggleThemeMode() {
  const [mount, setMount] = React.useState(false);
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <Button
      variant={"ghost"}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100" />
      )}
    </Button>
  );
}
