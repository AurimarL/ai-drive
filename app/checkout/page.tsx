import Link from "next/link"
import { ArrowLeft, ArrowRight, CircleAlert, HardDrive, Package } from "lucide-react"
import { DemoAuthGate } from "@/components/auth/demo-auth-gate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { hardwareCatalog, modelCatalog, shippingOptions } from "@/lib/store"

type CheckoutSearchParams = Promise<Record<string, string | string[] | undefined>>

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function capacityInGb(capacity: string) {
  const value = Number.parseFloat(capacity)
  return capacity.includes("TB") ? value * 1024 : value
}

export default async function CheckoutPage({ searchParams }: { searchParams: CheckoutSearchParams }) {
  const params = await searchParams
  const mode = firstParam(params.mode) === "rental" ? "rental" : "purchase"
  const rentalDays = Math.min(90, Math.max(1, Math.trunc(Number(firstParam(params.days)) || 7)))
  const modelIds = (firstParam(params.models) ?? "").split(",").filter(Boolean)
  const selectedModels = modelCatalog.filter((model) => modelIds.includes(model.id))
  const storageGb = selectedModels.reduce((total, model) => total + Number.parseInt(model.size, 10), 0)
  const requestedDrive = hardwareCatalog.find((drive) => drive.id === firstParam(params.device))
  const device = requestedDrive && capacityInGb(requestedDrive.capacity) >= storageGb
    ? requestedDrive
    : hardwareCatalog.find((drive) => capacityInGb(drive.capacity) >= storageGb) ?? hardwareCatalog[hardwareCatalog.length - 1]
  const shipping = shippingOptions.find((option) => option.id === firstParam(params.shipping)) ?? shippingOptions[0]
  const deviceEstimate = mode === "rental" ? device.dailyRentalPrice * rentalDays : device.price
  const estimate = deviceEstimate + shipping.price
  const selectionUrl = `/catalog?device=${device.id}&mode=${mode}&days=${rentalDays}&models=${modelIds.join(",")}&shipping=${shipping.id}`
  const checkoutPath = `/checkout?device=${device.id}&mode=${mode}&days=${rentalDays}&models=${modelIds.join(",")}&shipping=${shipping.id}`
  const loginUrl = `/login?next=${encodeURIComponent("/account")}`

  const preview = (
    <main className="min-h-screen bg-[#0b0c10] text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-7 px-5 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-orange-300">AI DRIVE / PRÉ-LANÇAMENTO</p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Resumo da configuração</h1>
            <p className="mt-2 text-sm text-slate-400">Prévia informativa. A campanha ainda não aceita encomendas.</p>
          </div>
          <Button variant="outline" nativeButton={false} render={<Link href={selectionUrl} />} className="border-slate-700 text-slate-200">
            <ArrowLeft data-icon="inline-start" /> Editar seleção
          </Button>
        </header>

        <div className="flex gap-3 border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed text-amber-100/90">
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-300" />
          <p>Os preços são estimativas e podem mudar. Não será criada uma encomenda, reserva ou cobrança nesta fase.</p>
        </div>

        {mode === "purchase" && (
          <div className="flex flex-col gap-3 border border-slate-800 bg-[#101319] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">Quando a campanha abrir, poderás comprar como convidado ou iniciar sessão para consultar a área de cliente demo.</p>
            <Link href={loginUrl} className="shrink-0 font-mono text-xs text-orange-300 underline-offset-4 hover:underline">Login opcional</Link>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <Card className="gap-0 border border-slate-800 bg-[#101319] py-0 text-slate-100 ring-0">
            <CardHeader className="border-b border-slate-800 py-5">
              <CardTitle className="text-base text-white">Seleção atual</CardTitle>
              <CardDescription className="text-slate-400">{selectedModels.length} modelos · {storageGb} GB no total</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 py-5">
              <div className="flex items-start gap-3 border-b border-slate-800 pb-4">
                <HardDrive className="mt-0.5 size-4 text-orange-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{device.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{device.type} · {device.capacity}</p>
                </div>
                <span className="text-sm text-orange-200">€{deviceEstimate}{mode === "rental" ? ` / ${rentalDays} dias` : " estimado"}</span>
              </div>
              <div className="grid gap-3">
                <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">MODELOS SELECIONADOS</p>
                {selectedModels.length > 0 ? selectedModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between gap-4 text-sm">
                    <span className="truncate text-slate-300">{model.name}</span>
                    <span className="shrink-0 text-xs text-slate-500">{model.size}</span>
                  </div>
                )) : <p className="text-sm text-slate-500">Ainda não selecionaste modelos.</p>}
              </div>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
                <Package className="size-4 text-slate-500" />
                <span>Entrega prevista: {shipping.label} · {shipping.eta}</span>
                <span className="ml-auto text-slate-200">€{shipping.price} estimado</span>
              </div>
            </CardContent>
          </Card>

          <aside>
            <Card className="gap-0 border border-slate-800 bg-[#101319] py-0 text-slate-100 ring-0">
              <CardHeader className="border-b border-slate-800 py-5">
                <Badge variant="outline" className="w-fit border-orange-500/30 text-orange-200">Prévia</Badge>
                <CardTitle className="text-base text-white">Estimativa</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 py-5">
                <div className="flex justify-between gap-3 text-sm text-slate-400"><span>{mode === "rental" ? `Aluguer · ${rentalDays} dias` : "Dispositivo"}</span><span className="text-slate-200">€{deviceEstimate}</span></div>
                <div className="flex justify-between gap-3 text-sm text-slate-400"><span>{shipping.label}</span><span className="text-slate-200">€{shipping.price}</span></div>
                <div className="flex justify-between gap-3 border-t border-slate-800 pt-4 text-sm font-semibold text-white"><span>Total estimado</span><span className="text-orange-300">€{estimate}</span></div>
                <Button nativeButton={false} render={<Link href={selectionUrl} />} className="h-11 w-full bg-orange-500 text-[#160b04] hover:bg-orange-400">
                  Voltar à seleção <ArrowRight data-icon="inline-end" />
                </Button>
                <p className="text-center text-xs leading-relaxed text-slate-500">Sem pagamentos ou reservas nesta fase.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )

  return mode === "rental"
    ? <DemoAuthGate nextPath={checkoutPath}>{preview}</DemoAuthGate>
    : preview
}
