"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CircleAlert, KeyRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DEMO_AUTH_STORAGE_KEY } from "@/lib/demo-auth"

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.sessionStorage.setItem(DEMO_AUTH_STORAGE_KEY, email.trim())
    router.replace(nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/account")
  }

  return (
    <Card className="w-full max-w-md gap-0 border border-slate-800 bg-[#101319] py-0 text-slate-100 ring-0">
      <CardHeader className="gap-4 border-b border-slate-800 py-6">
        <Badge variant="outline" className="w-fit border-amber-500/40 text-amber-200"><CircleAlert data-icon="inline-start" /> Demonstração</Badge>
        <div className="grid gap-2">
          <CardTitle className="text-2xl text-white">Iniciar sessão</CardTitle>
          <CardDescription className="text-slate-400">O aluguer requer uma sessão. A compra pode ser feita como convidado.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 py-6">
        <div className="flex gap-3 border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-100/80">
          <KeyRound className="mt-0.5 size-4 shrink-0 text-amber-300" />
          <p>Esta é apenas uma demonstração visual. Não valida identidade e não protege reservas, pedidos ou dados.</p>
        </div>
        <form onSubmit={signIn} className="grid gap-4">
          <label htmlFor="demo-email" className="grid gap-2 text-sm text-slate-300">Email<Input id="demo-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@exemplo.pt" className="h-10 border-slate-700 bg-[#0b0c10] text-white" /></label>
          <Button type="submit" className="h-11 w-full bg-orange-500 text-[#160b04] hover:bg-orange-400">Continuar na demonstração <ArrowRight data-icon="inline-end" /></Button>
        </form>
        <p className="text-center text-xs leading-relaxed text-slate-500">Para comprar, não precisas de iniciar sessão.</p>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />} className="w-full border-slate-700 text-slate-300">Voltar à loja</Button>
      </CardContent>
    </Card>
  )
}
