import { Header } from '@/components/header'
import '../globals.css'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
