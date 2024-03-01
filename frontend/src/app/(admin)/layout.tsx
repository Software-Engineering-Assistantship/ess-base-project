import { HeaderAdmin } from '@/components/header/header-admin'
import '../globals.css'
import { Footer } from '@/components/footer'

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
        <Footer />
      </body>
    </html>
  )
}
