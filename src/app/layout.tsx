import { Providers } from "./providers"
export const metadata = {
  title: 'TOOP',
  description: 'Created by Cristhian Tapiero',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
