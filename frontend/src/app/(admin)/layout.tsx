'use client'

import { HeaderAdmin } from '@/components/header/header-admin'
import '../globals.css'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <HeaderAdmin />
        {children}
      </body>
    </html>
  )
}
