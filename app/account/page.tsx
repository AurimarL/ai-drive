import { Clock3, Heart, PackageCheck, ShieldCheck } from 'lucide-react'
import { DemoAuthGate } from '@/components/auth/demo-auth-gate'
import { modelCatalog } from '@/lib/store'

export default function AccountPage() {
  return (
    <DemoAuthGate nextPath="/account">
    <main className="min-h-screen bg-[#0b0c10] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-orange-300">Conta / demonstração</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] md:text-5xl">Área do cliente</h1>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
            <div className="flex items-center gap-3 text-orange-300">
              <PackageCheck size={18} />
              <p className="text-xs uppercase tracking-[0.18em]">Pedidos</p>
            </div>
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-white">00</p>
            <p className="mt-2 text-sm text-slate-400">Sem encomendas nesta fase</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
            <div className="flex items-center gap-3 text-emerald-300">
              <ShieldCheck size={18} />
              <p className="text-xs uppercase tracking-[0.18em]">Status</p>
            </div>
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-white">Prévia</p>
            <p className="mt-2 text-sm text-slate-400">Sessão demo, sem dados guardados</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
            <div className="flex items-center gap-3 text-sky-300">
              <Clock3 size={18} />
              <p className="text-xs uppercase tracking-[0.18em]">Lançamento</p>
            </div>
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-white">A anunciar</p>
            <p className="mt-2 text-sm text-slate-400">Sem data publicada</p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Histórico de pedidos</h2>
            <p className="mt-1 text-xs text-slate-400">O histórico aparecerá quando houver encomendas reais após o lançamento.</p>
          </div>

          <div className="grid min-h-28 place-items-center border border-dashed border-slate-800 bg-slate-900/30 px-4 text-center text-sm text-slate-500">
            Ainda não há encomendas: a campanha continua em preparação.
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/75 p-5">
          <div className="mb-5 flex items-center gap-3">
            <Heart size={18} className="text-rose-300" />
            <div>
              <h2 className="text-xl font-semibold text-white">Prévia de modelos favoritos</h2>
              <p className="mt-1 text-xs text-slate-400">Exemplos visuais; favoritos ainda não são guardados.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modelCatalog.slice(0, 3).map((model) => (
              <article key={model.id} className="border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium text-white">{model.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">{model.family} · {model.size}</p>
                  </div>
                  <Heart size={15} className="shrink-0 fill-rose-400 text-rose-400" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
    </DemoAuthGate>
  )
}
