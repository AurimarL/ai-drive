"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { href: "/#why", label: "Vantagens" },
  { href: "/catalog", label: "Ver biblioteca" },
  { href: "/account", label: "Área do cliente" },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0c10]/90 text-slate-100 backdrop-blur-xl">
      <div className="mx-auto max-w-310 px-5 md:px-8">
        <nav aria-label="Navegação principal" className="relative flex h-19 items-center justify-between gap-6">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-2.5 text-sm font-extrabold tracking-[0.16em] text-white">
            <span aria-hidden="true" className="flex h-4.5 items-end gap-0.5">
              <i className="h-2 w-0.75 rounded-sm bg-orange-500" />
              <i className="h-3.75 w-0.75 rounded-sm bg-orange-500" />
              <i className="h-2.75 w-0.75 rounded-sm bg-orange-500" />
            </span>
            AI<span className="text-orange-500">DRIVE</span>
          </Link>

          <div className="hidden items-center gap-7 font-mono text-[10px] tracking-widest text-slate-400 md:flex">
            {navigation.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-orange-300">{item.label}</Link>)}
          </div>

          <Button nativeButton={false} render={<Link href="/catalog" />} className="hidden h-10 gap-2 border border-orange-500/60 bg-orange-500 px-4 font-mono text-[10px] tracking-[0.08em] text-[#160b04] hover:bg-orange-400 md:inline-flex">
            Ver seleção prevista <ArrowRight data-icon="inline-end" />
          </Button>

          <Button type="button" variant="ghost" size="icon-lg" aria-label={menuOpen ? "Fechar navegação" : "Abrir navegação"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="size-11 text-slate-200 md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </Button>

          {menuOpen && (
            <div className="absolute inset-x-0 top-full grid gap-1 border border-slate-800 bg-[#101319] p-3 shadow-2xl md:hidden">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="px-3 py-3 font-mono text-xs tracking-[0.08em] text-slate-300 transition-colors hover:bg-white/5 hover:text-orange-200">
                  {item.label}
                </Link>
              ))}
              <Button nativeButton={false} render={<Link href="/catalog" />} onClick={() => setMenuOpen(false)} className="mt-1 h-11 justify-between bg-orange-500 px-3 font-mono text-[10px] tracking-[0.08em] text-[#160b04] hover:bg-orange-400">
                Ver seleção prevista <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
