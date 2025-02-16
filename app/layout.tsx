import { ClerkProvider} from '@clerk/nextjs'
import{dark} from '@clerk/themes'
import { Toaster } from 'sonner'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}} afterSignOutUrl="/">
      <html lang="en">
        <body>
          <ThemeProvider
            attribute='class'
            forcedTheme='dark'
            storageKey='twitchclone-theme'
          >
            <Toaster theme='light' position='bottom-center'/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}