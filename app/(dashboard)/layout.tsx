import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reminder Dashboard',
  description: 'Reminder Application created by Jay Hogan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex flex-grow w-full justify-center dark:bg-neutral-950">
            <div className="max-w-4xl flex flex-col flex-grow px-4 py-12">
                {children}
            </div>
        </div>
    </div>
  )
}