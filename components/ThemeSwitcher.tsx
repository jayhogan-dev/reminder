"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)

    // useEffect runs on component Mount
    useEffect(() => {
        setMounted(true)
    }, [])

  return (
    <Tabs defaultValue={theme}>
        <TabsList className="border dark:border-neutral-800 dark:bg-gray-900">
            <TabsTrigger value="light" onClick={(e) => setTheme("light")}>
                <SunIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}>
                <MoonIcon className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
            </TabsTrigger>
            <TabsTrigger value="system" onClick={(e) => setTheme("system")}>
                <DesktopIcon className="h-4 w-4" />
            </TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher