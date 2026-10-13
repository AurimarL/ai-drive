"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { DEMO_AUTH_STORAGE_KEY } from "@/lib/demo-auth"

export function DemoAuthGate({ nextPath, children }: { nextPath: string; children: ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(DEMO_AUTH_STORAGE_KEY)) {
      setAuthorized(true)
      return
    }

    router.replace(`/login?next=${encodeURIComponent(nextPath)}`)
  }, [nextPath, router])

  if (!authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0b0c10] px-5 text-sm text-slate-400">
        A verificar a sessão de demonstração...
      </main>
    )
  }

  return children
}
