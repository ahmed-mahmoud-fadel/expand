"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [isDarkMode, setDarkMode] = useState(resolvedTheme === "dark" ? true : false)

  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  return (
    <Button
      onClick={() => setDarkMode(p => !p)}
      variant="secondary"
      size="icon"
    >
      {
        isDarkMode &&
        <MdDarkMode />
      }
      {
        !isDarkMode &&
        <MdLightMode />
      }
    </Button>
  );
}
 
export default ThemeButton;