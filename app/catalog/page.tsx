"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Minus, Search, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { hardwareCatalog, modelCatalog, shippingOptions } from "@/lib/store"

const initialSelectedModelIds = ["llama-3.3-70b", "qwen2.5-vl-72b"]
const familyOptions = ["all", ...new Set(modelCatalog.map((model) => model.family))]
const sizeOptions = ["all", "small", "medium", "large"]
const selectContentClassName = "border-slate-700 bg-[#151922] text-slate-100 shadow-xl"
const selectItemClassName = "text-slate-200 focus:bg-slate-700 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-white"

function sizeInGb(size: string) {
  return Number.parseInt(size, 10)
}

function capacityInGb(capacity: string) {
  const value = Number.parseFloat(capacity)
  return capacity.includes("TB") ? value * 1024 : value
}

function smallestDriveThatFits(storageGb: number) {
  return hardwareCatalog
    .filter((drive) => capacityInGb(drive.capacity) >= storageGb)
    .sort((first, second) => capacityInGb(first.capacity) - capacityInGb(second.capacity))[0]
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#0b0c10]" />}>
      <CatalogContent />
    </Suspense>
  )
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const requestedModelIds = searchParams.get("models")
  const startingModelIds = requestedModelIds === null
    ? initialSelectedModelIds
    : requestedModelIds.split(",").filter((id) => modelCatalog.some((model) => model.id === id))
  const startingStorage = modelCatalog
    .filter((model) => startingModelIds.includes(model.id))
    .reduce((total, model) => total + sizeInGb(model.size), 0)
  const requestedDrive = hardwareCatalog.find((drive) => drive.id === searchParams.get("device"))
  const startingDrive = requestedDrive && capacityInGb(requestedDrive.capacity) >= startingStorage
    ? requestedDrive
    : smallestDriveThatFits(startingStorage) ?? hardwareCatalog[0]
  const requestedShipping = searchParams.get("shipping")
  const startingShipping = shippingOptions.find((option) => option.id === requestedShipping) ?? shippingOptions[0]

  const [query, setQuery] = useState("")
  const [family, setFamily] = useState("all")
  const [size, setSize] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState("4")
  const [selectedModelIds, setSelectedModelIds] = useState(startingModelIds)
  const [selectedDriveId, setSelectedDriveId] = useState(startingDrive.id)
  const [purchaseMode, setPurchaseMode] = useState(searchParams.get("mode") === "rental" ? "rental" : "purchase")
  const [rentalDays, setRentalDays] = useState(Math.min(90, Math.max(1, Number(searchParams.get("days")) || 7)))
  const [deliveryId, setDeliveryId] = useState(startingShipping.id)

  const selectedModels = modelCatalog.filter((model) => selectedModelIds.includes(model.id))
  const totalStorage = selectedModels.reduce((total, model) => total + sizeInGb(model.size), 0)
  const selectedDrive = hardwareCatalog.find((drive) => drive.id === selectedDriveId) ?? startingDrive
  const selectedDelivery = shippingOptions.find((option) => option.id === deliveryId) ?? shippingOptions[0]
  const storageWidth = totalStorage === 0 ? "w-0" : totalStorage / capacityInGb(selectedDrive.capacity) >= 0.75 ? "w-full" : totalStorage / capacityInGb(selectedDrive.capacity) >= 0.5 ? "w-3/4" : totalStorage / capacityInGb(selectedDrive.capacity) >= 0.25 ? "w-1/2" : "w-1/4"
  const deviceTotal = purchaseMode === "purchase" ? selectedDrive.price : selectedDrive.dailyRentalPrice * rentalDays
  const estimatedTotal = deviceTotal + selectedDelivery.price
  const filteredModels = modelCatalog.filter((model) => {
    const searchText = `${model.name} ${model.family} ${model.tags.join(" ")} ${model.summary}`.toLowerCase()
    const modelSize = sizeInGb(model.size)
    const matchesSize = size === "all"
      || (size === "small" && modelSize <= 16)
      || (size === "medium" && modelSize > 16 && modelSize <= 32)
      || (size === "large" && modelSize > 32)

    return searchText.includes(query.trim().toLowerCase())
      && (family === "all" || model.family === family)
      && matchesSize
  })
  const rowsPerPage = Number(pageSize)
  const pageCount = Math.max(1, Math.ceil(filteredModels.length / rowsPerPage))
  const currentPage = Math.min(page, pageCount)
  const pageModels = filteredModels.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  const checkoutHref = `/checkout?device=${selectedDrive.id}&mode=${purchaseMode}&days=${rentalDays}&models=${selectedModelIds.join(",")}&shipping=${selectedDelivery.id}`

  const updateFilters = (update: () => void) => {
    update()
    setPage(1)
  }

  const toggleModel = (id: string) => {
    const nextIds = selectedModelIds.includes(id)
      ? selectedModelIds.filter((item) => item !== id)
      : [...selectedModelIds, id]
    const nextStorage = modelCatalog
      .filter((model) => nextIds.includes(model.id))
      .reduce((total, model) => total + sizeInGb(model.size), 0)

    setSelectedModelIds(nextIds)
    if (nextStorage > capacityInGb(selectedDrive.capacity)) {
      const nextDrive = smallestDriveThatFits(nextStorage)
      if (nextDrive) setSelectedDriveId(nextDrive.id)
    }
  }

  const removeModel = (id: string) => {
    setSelectedModelIds((current) => current.filter((modelId) => modelId !== id))
  }

  return (
    <main className="min-h-screen bg-[#0b0c10] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-orange-300">AI DRIVE / PRÉ-LANÇAMENTO</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Explora a seleção prevista</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">Pesquisa modelos e experimenta configurações. A campanha ainda não abriu.</p>
          </div>
        </header>

        <div className="flex flex-col gap-2 border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-sm text-amber-100/90 sm:flex-row sm:items-center sm:justify-between">
          <span>Prévia de planeamento. Dispositivos, preços e condições podem mudar.</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-amber-200">Sem encomendas ou pagamentos</span>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="min-w-0">
            <Card className="gap-0 border border-slate-800 bg-[#101319] py-0 text-slate-100 ring-0">
              <CardHeader className="gap-4 border-b border-slate-800 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-1">
                  <CardTitle className="text-base text-white">Modelos disponíveis</CardTitle>
                  <CardDescription className="text-slate-400">{filteredModels.length} resultados · catálogo sem custo por modelo</CardDescription>
                </div>
                <Badge variant="outline" className="w-fit border-emerald-500/40 text-emerald-300"><ShieldCheck data-icon="inline-start" /> Modelos incluídos</Badge>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 py-5">
                <div className="grid gap-3 md:grid-cols-[minmax(12rem,1fr)_12rem_12rem]">
                  <label className="relative block">
                    <span className="sr-only">Pesquisar modelos</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                    <Input value={query} onChange={(event) => updateFilters(() => setQuery(event.target.value))} placeholder="Pesquisar por nome, família ou tag" className="h-10 border-slate-700 bg-[#0b0c10] pl-9 text-slate-100 placeholder:text-slate-500" />
                  </label>
                  <Select value={family} onValueChange={(value) => updateFilters(() => setFamily(String(value ?? "all")))}>
                    <SelectTrigger aria-label="Filtrar por família" className="h-10 w-full border-slate-700 bg-[#0b0c10] text-slate-200"><SelectValue placeholder="Todas as famílias" /></SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      <SelectGroup>
                        {familyOptions.map((option) => <SelectItem key={option} value={option} className={selectItemClassName}>{option === "all" ? "Todas as famílias" : option}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select value={size} onValueChange={(value) => updateFilters(() => setSize(String(value ?? "all")))}>
                    <SelectTrigger aria-label="Filtrar por tamanho" className="h-10 w-full border-slate-700 bg-[#0b0c10] text-slate-200"><SelectValue placeholder="Todos os tamanhos" /></SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      <SelectGroup>
                        {sizeOptions.map((option) => <SelectItem key={option} value={option} className={selectItemClassName}>{option === "all" ? "Todos os tamanhos" : option === "small" ? "Até 16 GB" : option === "medium" ? "17 a 32 GB" : "Mais de 32 GB"}</SelectItem>)}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-800">
                  <Table>
                    <TableHeader className="bg-[#151922]">
                      <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="min-w-64 text-slate-400">Modelo</TableHead>
                        <TableHead className="text-slate-400">Família</TableHead>
                        <TableHead className="text-right text-slate-400">Tamanho</TableHead>
                        <TableHead className="w-32 text-right text-slate-400">Seleção</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageModels.map((model) => {
                        const isSelected = selectedModelIds.includes(model.id)
                        return (
                          <TableRow key={model.id} className="border-slate-800 hover:bg-white/2.5">
                            <TableCell className="whitespace-normal py-4">
                              <div className="grid gap-1.5">
                                <span className="font-medium text-white">{model.name}</span>
                                <span className="max-w-2xl text-xs leading-relaxed text-slate-400">{model.summary}</span>
                                <span className="flex flex-wrap gap-1.5 pt-1">{model.tags.map((tag) => <Badge key={tag} variant="secondary" className="h-5 bg-slate-800 text-[10px] font-normal text-slate-300">{tag}</Badge>)}</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="outline" className="border-orange-500/30 text-orange-200">{model.family}</Badge></TableCell>
                            <TableCell className="text-right font-mono text-xs text-slate-300">{model.size}</TableCell>
                            <TableCell className="text-right">
                              <Button type="button" size="sm" variant={isSelected ? "secondary" : "outline"} aria-pressed={isSelected} onClick={() => toggleModel(model.id)} className={isSelected ? "bg-orange-500/15 text-orange-200 hover:bg-orange-500/20" : "border-slate-700 text-slate-200"}>
                                {isSelected ? <><Minus data-icon="inline-start" /> Remover</> : "Adicionar"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                      {pageModels.length === 0 && <TableRow><TableCell colSpan={4} className="h-32 text-center text-sm text-slate-400">Nenhum modelo corresponde aos filtros.</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{filteredModels.length === 0 ? "0" : `${(currentPage - 1) * rowsPerPage + 1}–${Math.min(currentPage * rowsPerPage, filteredModels.length)}`} de {filteredModels.length}</span>
                    <Select value={pageSize} onValueChange={(value) => { setPageSize(String(value ?? "4")); setPage(1) }}>
                      <SelectTrigger aria-label="Resultados por página" className="h-8 w-24 border-slate-700 bg-[#0b0c10] text-slate-200"><SelectValue /></SelectTrigger>
                      <SelectContent className={selectContentClassName}><SelectGroup><SelectItem value="4" className={selectItemClassName}>4 / página</SelectItem><SelectItem value="8" className={selectItemClassName}>8 / página</SelectItem><SelectItem value="12" className={selectItemClassName}>12 / página</SelectItem></SelectGroup></SelectContent>
                    </Select>
                  </div>
                  <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#previous" text="Anterior" aria-disabled={currentPage <= 1} className={currentPage <= 1 ? "pointer-events-none opacity-40" : ""} onClick={(event) => { event.preventDefault(); setPage((current) => Math.max(1, current - 1)) }} /></PaginationItem>
                      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <PaginationItem key={pageNumber}><PaginationLink href={`#page-${pageNumber}`} isActive={pageNumber === currentPage} onClick={(event) => { event.preventDefault(); setPage(pageNumber) }}>{pageNumber}</PaginationLink></PaginationItem>)}
                      <PaginationItem><PaginationNext href="#next" text="Seguinte" aria-disabled={currentPage >= pageCount} className={currentPage >= pageCount ? "pointer-events-none opacity-40" : ""} onClick={(event) => { event.preventDefault(); setPage((current) => Math.min(pageCount, current + 1)) }} /></PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </section>

          <aside className="xl:sticky xl:top-6">
            <Card className="gap-0 border border-slate-800 bg-[#101319] py-0 text-slate-100 ring-0">
              <CardHeader className="border-b border-slate-800 py-5">
                <CardTitle className="text-base text-white">A tua configuração</CardTitle>
                <CardDescription className="text-slate-400">Modelos listados para a campanha em preparação.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 py-5">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-slate-400">Modelos selecionados</span>
                  <strong className="text-xl text-white">{selectedModels.length}</strong>
                </div>
                <div className="grid gap-1">
                  <div className="flex justify-between font-mono text-xs text-slate-400"><span>Espaço usado</span><strong className="text-slate-200">{totalStorage} GB</strong></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><span className={`block h-full rounded-full bg-orange-500 transition-all ${storageWidth}`} /></div>
                  <span className="text-right font-mono text-[10px] text-slate-500">Capacidade: {selectedDrive.capacity}</span>
                </div>
                <div className="grid gap-2 border-t border-slate-800 pt-4">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">MODELOS NO PEDIDO</p>
                  {selectedModels.length > 0 ? selectedModels.map((model) => (
                    <div key={model.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="min-w-0 truncate text-slate-300">{model.name} <span className="text-slate-500">{model.size}</span></span>
                      <Button type="button" variant="ghost" size="icon-xs" aria-label={`Remover ${model.name}`} onClick={() => removeModel(model.id)} className="shrink-0 text-slate-400 hover:text-rose-300"><Minus /></Button>
                    </div>
                  )) : <p className="text-xs text-slate-500">Nenhum modelo selecionado.</p>}
                </div>
                <div className="grid gap-2 border-t border-slate-800 pt-4">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">MODALIDADE</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant={purchaseMode === "purchase" ? "secondary" : "outline"} aria-pressed={purchaseMode === "purchase"} onClick={() => setPurchaseMode("purchase")} className={purchaseMode === "purchase" ? "bg-orange-500/15 text-orange-200 hover:bg-orange-500/20" : "border-slate-700 text-slate-300"}>Comprar</Button>
                    <Button type="button" variant={purchaseMode === "rental" ? "secondary" : "outline"} aria-pressed={purchaseMode === "rental"} onClick={() => setPurchaseMode("rental")} className={purchaseMode === "rental" ? "bg-orange-500/15 text-orange-200 hover:bg-orange-500/20" : "border-slate-700 text-slate-300"}>Alugar</Button>
                  </div>
                  {purchaseMode === "rental" && <label htmlFor="catalog-rental-days" className="grid grid-cols-[1fr_6rem] items-center gap-3 text-sm text-slate-300"><span>Duração do aluguer <small className="mt-1 block text-xs text-slate-500">€{selectedDrive.dailyRentalPrice}/dia · login necessário</small></span><Input id="catalog-rental-days" type="number" min={1} max={90} value={rentalDays} onChange={(event) => setRentalDays(Math.min(90, Math.max(1, Number(event.target.value) || 1)))} className="h-10 border-slate-700 bg-[#0b0c10] text-center text-white" /></label>}
                </div>
                <div className="grid gap-2">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">DISPOSITIVO COMPATÍVEL</p>
                  {hardwareCatalog.map((drive) => {
                    const isSelected = drive.id === selectedDrive.id
                    const fits = capacityInGb(drive.capacity) >= totalStorage
                    return <button key={drive.id} type="button" disabled={!fits} aria-pressed={isSelected} onClick={() => setSelectedDriveId(drive.id)} className={`flex min-h-14 items-center justify-between gap-3 border px-3 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${isSelected ? "border-orange-500/60 bg-orange-500/10" : "border-slate-700 bg-[#0b0c10] hover:border-slate-500"}`}>
                      <span><strong className="block text-xs text-white">{drive.name}</strong><small className="text-[10px] text-slate-400">{fits ? drive.type : "Capacidade insuficiente"}</small></span>
                      <span className="shrink-0 text-right"><strong className="block text-sm text-orange-200">€{purchaseMode === "purchase" ? drive.price : drive.dailyRentalPrice}</strong><small className="font-mono text-[9px] text-slate-500">{purchaseMode === "purchase" ? drive.capacity : "/ dia"}</small></span>
                    </button>
                  })}
                </div>
                <div className="grid gap-2">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">ENTREGA</p>
                  <Select value={deliveryId} onValueChange={(value) => setDeliveryId(String(value))}>
                    <SelectTrigger aria-label="Selecionar entrega" className="h-10 w-full border-slate-700 bg-[#0b0c10] text-slate-200"><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentClassName}><SelectGroup>{shippingOptions.map((option) => <SelectItem key={option.id} value={option.id} className={selectItemClassName}>{option.label} · {option.price === 0 ? "Grátis" : `€${option.price}`}</SelectItem>)}</SelectGroup></SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 border-t border-slate-800 pt-4 text-sm">
                  <div className="flex justify-between text-slate-400"><span>{purchaseMode === "purchase" ? "Dispositivo" : `Aluguer · ${rentalDays} dias`}</span><span className="text-slate-200">€{deviceTotal}</span></div>
                  <div className="flex justify-between text-slate-400"><span>{selectedDelivery.label}</span><span className="text-slate-200">€{selectedDelivery.price}</span></div>
                  <div className="flex justify-between border-t border-slate-800 pt-3 font-medium text-white"><span>Total estimado</span><span className="text-orange-300">€{estimatedTotal}</span></div>
                </div>
                <p className="border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-100/80">Os valores são estimativas. Continuar mostra apenas um resumo demonstrativo; não cria encomenda nem cobrança.</p>
                <Button nativeButton={false} render={<Link href={checkoutHref} />} className="h-11 w-full bg-orange-500 text-[#160b04] hover:bg-orange-400">
                  Ver resumo da configuração <ArrowRight data-icon="inline-end" />
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-slate-500">Os modelos não são vendidos separadamente.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
