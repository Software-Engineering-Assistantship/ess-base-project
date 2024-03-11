import { HeaderUser } from '@/components/header/header-user'
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
        <HeaderUser />
        {children}
        <Footer />
      </body>
    </html>
  )
}
