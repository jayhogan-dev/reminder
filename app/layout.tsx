import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import NavBar from '@/components/NavBar'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reminder',
  description: 'Reminder Application created by Jay Hogan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.className, "dark")} style={{
        colorScheme: "dark"
      }}>
        <body>
          <ThemeProvider>
            <div className="flex min-h-screen w-full flex-col dark:bg-black">
              <NavBar />
              <Separator />
              {children}
            </div>
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}
