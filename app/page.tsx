import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CloudOff,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Terminal,
  Usb,
  Zap,
} from "lucide-react";
import { hardwareCatalog, modelCatalog } from "@/lib/store";

function capacityInGb(capacity: string) {
  const value = Number.parseFloat(capacity);
  return capacity.includes("TB") ? value * 1024 : value;
}

const maximumCapacityGb = hardwareCatalog.reduce(
  (maximum, product) => Math.max(maximum, capacityInGb(product.capacity)),
  0,
);
const maximumCapacityLabel = maximumCapacityGb >= 1024
  ? `${maximumCapacityGb / 1024} TB`
  : `${maximumCapacityGb} GB`;

function HardwareVisual() {
  return (
    <div
      className="relative grid min-h-96 place-items-center md:min-h-136"
      aria-label="AI Drive hardware render"
    >
      <div className="absolute size-[min(80vw,34rem)] rounded-full border border-white/8" />
      <div className="absolute size-[min(66vw,27rem)] rounded-full border border-white/8" />
      <div className="absolute size-[min(60vw,26rem)] rounded-full bg-[radial-gradient(circle,rgba(255,123,0,0.3),rgba(255,123,0,0.02)_58%,transparent_72%)]" />
      <div className="absolute left-[4%] top-[12%] z-10 grid size-22 place-items-center rounded-2xl border border-white/15 bg-[#11131acc] text-center max-sm:hidden">
        <span className="text-xl font-extrabold">LL</span>
        <small className="text-[7px] tracking-[0.16em] text-slate-400">
          LLAMA 3
        </small>
      </div>
      <div className="absolute right-[3%] top-[34%] z-10 grid size-22 place-items-center rounded-2xl border border-white/15 bg-[#11131acc] text-center max-sm:hidden">
        <span className="text-xl font-extrabold text-cyan-200">DS</span>
        <small className="text-[7px] tracking-[0.16em] text-slate-400">
          DEEPSEEK
        </small>
      </div>
      <div className="absolute bottom-[10%] left-[24%] z-10 grid size-22 place-items-center rounded-2xl border border-white/15 bg-[#11131acc] text-center max-sm:hidden">
        <span className="text-xl font-extrabold text-violet-200">Q</span>
        <small className="text-[7px] tracking-[0.16em] text-slate-400">
          QWEN
        </small>
      </div>
      <img
        src="/ai-drive-render.png"
        alt="Matte black AI Drive with glowing amber status ring"
        className="relative z-1 max-h-104 max-w-[82%] object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.55)]"
      />
      <div className="absolute bottom-3 right-0 z-10 border border-white/10 bg-[#11131acc] px-3 py-2 font-mono text-[9px] tracking-[0.16em] text-slate-200">
        CONCEITO <span className="mx-2 text-slate-500">|</span> RENDER DO PRODUTO
      </div>
    </div>
  );
}

function AppDashboard() {
  return (
    <div className="min-h-68 border border-slate-700 bg-[#0c0e13] font-mono">
      <div className="flex h-8 items-center gap-1.5 border-b border-slate-800 px-3 text-[7px] text-slate-500">
        <i className="size-1.5 rounded-full bg-red-400" />
        <i className="size-1.5 rounded-full bg-amber-300" />
        <i className="size-1.5 rounded-full bg-green-400" />
        <span className="ml-3">PRÉ-VISUALIZAÇÃO / INTERFACE</span>
        <span className="ml-auto text-[6px] text-amber-200/70">
          MOCKUP · SEM LIGAÇÃO A UM PRODUTO
        </span>
      </div>
      <div className="flex min-h-64">
        <aside className="w-18 shrink-0 border-r border-slate-800 px-2 py-4 text-[8px] text-slate-500 sm:w-22">
          <div className="mb-5 px-1 text-lg font-bold text-orange-500">
            A<span className="text-white">I</span>
          </div>
          <div className="mb-1 bg-slate-800 px-1 py-2 text-slate-200">
            ◈ <span className="max-sm:hidden">New chat</span>
          </div>
          <div className="px-1 py-2">
            ◌ <span className="max-sm:hidden">Model vault</span>
          </div>
          <div className="px-1 py-2">
            ⚙ <span className="max-sm:hidden">Settings</span>
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="inline-flex flex-wrap items-center gap-2 border border-orange-300/30 bg-orange-500/10 px-2.5 py-2 text-[8px] tracking-[0.12em] text-orange-200">
            <span className="size-1.5 rounded-full bg-orange-400" />
            INTERFACE ILUSTRATIVA{" "}
            <strong className="font-normal">PRÉ-LANÇAMENTO</strong>
          </div>
          <div className="mt-5 flex gap-3">
            <div className="grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-orange-300 to-orange-600 text-[10px] font-extrabold text-[#180d06]">
              AI
            </div>
            <div>
              <p className="text-[9px] tracking-[0.12em] text-slate-200">
                AI DRIVE <span className="text-slate-400">• MODELO PREVISTO</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Exemplo visual de utilização local. As especificações finais serão anunciadas com a campanha.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border border-slate-700 bg-slate-900/80 px-3 py-3 text-[10px] text-slate-200">
            How can I help?
            <ArrowRight size={14} className="text-orange-400" />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[8px] tracking-[0.12em] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-orange-400" />
              INTERFACE DE DEMONSTRAÇÃO
            </span>
            <span className="flex items-center gap-1.5">
              SEM DESEMPENHO OU CONECTIVIDADE MEDIDOS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tier({
  product,
}: {
  product: (typeof hardwareCatalog)[number];
}) {
  return (
    <article className="border border-slate-800 bg-[#12151b] p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
        {product.type}
      </p>
      <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-300">
        Estimativa pré-campanha
      </p>
      <h3 className="mt-2 text-5xl font-bold tracking-[-0.06em] text-white">
        <sup className="mr-1 align-top text-xl text-orange-500">€</sup>
        {product.price}
      </h3>
      <p className="mt-2 font-mono text-[10px] text-orange-300">
        {product.capacity}
      </p>
      <div className="my-6 border-t border-slate-800" />
      <p className="min-h-12 text-sm leading-relaxed text-slate-400">
        {product.description}
      </p>
      <p className="mt-3 font-mono text-[10px] text-slate-400">
        Aluguer:{" "}
        <span className="text-orange-300">€{product.dailyRentalPrice}/dia</span>
      </p>
      <ul className="my-6 grid gap-3 text-xs text-slate-300">
        <li className="flex items-center gap-2">
          <Check size={14} className="text-orange-400" />
          Modelos selecionáveis na prévia
        </li>
        <li className="flex items-center gap-2">
          <Check size={14} className="text-orange-400" />
          Capacidade: {product.capacity}
        </li>
        <li className="flex items-center gap-2">
          <Check size={14} className="text-orange-400" />
          Sem encomendas nesta fase
        </li>
      </ul>
      <Link
        href={`/catalog?device=${product.id}&models=`}
        className="flex w-full items-center justify-center gap-3 border border-slate-700 bg-slate-900 px-4 py-3 font-mono text-[10px] tracking-widest text-slate-200 transition hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-300"
      >
        VER NA PRÉ-VISUALIZAÇÃO <ArrowRight size={15} />
      </Link>
    </article>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0c10] text-[#f3f4f6] selection:bg-orange-500 selection:text-[#111]">
      <section
        id="top"
        className="relative mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-310 items-center gap-8 px-5 py-14 md:grid-cols-2 md:px-8 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(25,28,37,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(25,28,37,0.45)_1px,transparent_1px)] bg-size-[56px_56px] mask-[linear-gradient(90deg,#000,transparent_82%)]" />
        <div className="pointer-events-none absolute right-0 top-1/4 size-128 rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="relative z-10">
          <div className="inline-flex flex-wrap items-center gap-2.5 border border-orange-900/70 bg-orange-950/30 px-3 py-2 font-mono text-[9px] tracking-widest text-orange-300">
            <span className="size-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#ff6b00]" />
            PRÉ-LANÇAMENTO <span className="text-orange-700">•</span>{" "}
            CAMPANHA EM PREPARAÇÃO
          </div>
          <p className="mt-7 font-mono text-[10px] tracking-[0.17em] text-slate-500">
            // PRÉ-LANÇAMENTO / AI DRIVE 001
          </p>
          <h1 className="mt-4 text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.065em] text-white">
              A IA
            <br />
            <em className="not-italic text-orange-500">aberta.</em>
            <br />
            <span className="text-slate-400">
              A preparar
              <br />
              para uso local.
            </span>
          </h1>
          <p className="my-7 max-w-104 text-[15px] leading-relaxed text-slate-300">
            Estamos a preparar uma campanha para levar modelos open-source a
            dispositivos de armazenamento local. Explora a seleção prevista;
            ainda não aceitamos encomendas nem pagamentos.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-3 border border-orange-500 bg-orange-500 px-5 py-4 font-mono text-[10px] tracking-widest text-[#160b04] shadow-[0_0_30px_#ff6b0035] transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              EXPLORAR A SELEÇÃO <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-8 flex items-start gap-3 border-l border-orange-500/60 pl-4">
            <span className="mt-1.5 size-2 rounded-full bg-orange-400" />
            <p className="text-xs leading-relaxed text-slate-400">
              <strong className="text-sm text-white">Sem encomendas nesta fase</strong>
              <br />
              A data e as condições serão anunciadas quando estiverem confirmadas.
            </p>
          </div>
        </div>
        <HardwareVisual />
        <a
          href="#why"
          className="absolute bottom-5 left-8 hidden items-center gap-2 font-mono text-[9px] tracking-[0.16em] text-slate-500 md:flex"
        >
          <ArrowDownRight size={15} /> SCROLL TO EXPLORE
        </a>
      </section>

      <section className="mx-auto grid max-w-294 grid-cols-2 border-y border-slate-800 px-5 py-6 sm:grid-cols-4 md:px-0">
        {[
          [String(modelCatalog.length), "MODELOS", "NO CATÁLOGO"],
          [String(hardwareCatalog.length), "DISPOSITIVOS", "EM AVALIAÇÃO"],
          [maximumCapacityLabel, "CAPACIDADE", "MÁXIMA LISTADA"],
          ["0 €", "LICENÇA", "POR MODELO"],
        ].map(([value, unit, label], index) => (
          <div
            key={unit}
            className={`flex items-center justify-center gap-3 py-2 ${index < 3 ? "sm:border-r sm:border-slate-800" : ""}`}
          >
            <span className="text-3xl font-bold tracking-[-0.06em] text-orange-500">
              {value}
            </span>
            <span className="font-mono text-[10px] leading-tight text-slate-300">
              {unit}
              <small className="block text-[8px] text-slate-500">{label}</small>
            </span>
          </div>
        ))}
      </section>

      <section
        id="why"
        className="mx-auto max-w-310 scroll-mt-24 px-5 py-24 md:px-8 md:py-32"
      >
        <div className="max-w-152">
          <p className="mb-5 font-mono text-[10px] tracking-[0.17em] text-slate-500">
            01 / THE OFFLINE ADVANTAGE
          </p>
          <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            IA local, hardware próprio.
            <br />
            <span className="text-slate-500">Uma proposta em construção.</span>
          </h2>
          <p className="mt-6 max-w-116 text-[15px] leading-relaxed text-slate-400">
            A seleção está a ser preparada para a campanha. Os modelos não
            serão vendidos separadamente; preços e especificações do hardware
            continuam provisórios.
          </p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="relative overflow-hidden border border-slate-800 bg-[#11141a] p-5 sm:p-7">
            <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.13em] text-slate-300">
              <Usb size={16} className="text-orange-400" /> PLUG &amp; PLAY /
              USB-C 3.2
            </div>
            <div className="mx-auto mt-8 w-[96%] rounded-t-xl border-4 border-b-0 border-slate-700 bg-[#191c23] p-2 sm:w-[82%]">
              <AppDashboard />
            </div>
            <div className="mx-auto h-2 w-[98%] rounded-b-xl bg-slate-700 shadow-[0_9px_0_-2px_#181b22] sm:w-[88%]" />
          </div>
          <div className="flex flex-col justify-center gap-8">
            {[
              [
                Zap,
                "Execução local",
                "Esse é o objetivo do produto; desempenho e requisitos ainda serão medidos.",
                "text-orange-400 border-orange-900/70",
              ],
              [
                LockKeyhole,
                "Privacidade como objetivo",
                "O funcionamento sem rede e as respetivas garantias ainda serão validados.",
                "text-cyan-300 border-cyan-900/70",
              ],
              [
                Terminal,
                "Compatibilidade em avaliação",
                "Ollama, Docker, Open WebUI e LM Studio são integrações em análise, não confirmadas.",
                "text-violet-300 border-violet-900/70",
              ],
            ].map(([Icon, title, copy, color]) => (
              <div key={String(title)} className="flex gap-4">
                <div
                  className={`grid size-10 shrink-0 place-items-center rounded-full border ${String(color)}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{String(title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {String(copy)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vault"
        className="mx-auto max-w-310 scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="max-w-xl">
          <p className="mb-5 font-mono text-[10px] tracking-[0.17em] text-slate-500">
            02 / BIBLIOTECA EM PREPARAÇÃO
          </p>
          <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            Modelos abertos.
            <br />
            <span className="text-slate-500">Uma seleção a explorar.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <article className="flex min-h-96 flex-col justify-between border border-slate-800 bg-linear-to-br from-[#161920] to-[#101217] p-6 lg:row-span-2">
            <div>
              <p className="mb-6 font-mono text-[9px] tracking-[0.16em] text-slate-500">
                DISPOSITIVOS / 001
              </p>
              <h3 className="text-2xl font-bold leading-none tracking-[-0.04em]">
                Gama em
                <br />
                preparação.
              </h3>
              <p className="mt-4 max-w-68 text-xs leading-relaxed text-slate-400">
                A capacidade máxima atualmente listada é {maximumCapacityLabel}.
                As configurações finais serão confirmadas com a campanha.
              </p>
            </div>
            <div>
              <div className="mb-2 flex justify-between font-mono text-[10px]">
                <span>DISPOSITIVOS LISTADOS</span>
                <strong className="font-normal text-orange-400">
                  {hardwareCatalog.length} FORMATOS
                </strong>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {hardwareCatalog.map((product) => (
                  <span key={product.id} className="border border-slate-700 px-2 py-1 font-mono text-[9px] text-slate-300">
                    {product.capacity}
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="border border-slate-800 bg-linear-to-br from-[#161920] to-[#101217] p-6 lg:col-span-2">
            <p className="mb-5 font-mono text-[9px] tracking-[0.16em] text-slate-500">
              PRÉ-LANÇAMENTO / 002
            </p>
            <h3 className="mb-5 text-2xl font-bold leading-none tracking-[-0.04em]">
              A campanha ainda não abriu.
            </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2 border border-orange-900/40 bg-orange-950/20 p-3 font-mono text-[9px] text-orange-100/80">
                  <span>ESTADO ATUAL</span>
                  <strong className="font-normal text-orange-200">A preparar produto e campanha</strong>
                  <small>Sem encomendas ou pagamentos.</small>
                </div>
                <div className="grid gap-2 border border-slate-700 bg-slate-950/50 p-3 font-mono text-[9px] text-slate-300">
                  <span>PRÓXIMA FASE</span>
                  <strong className="font-normal text-white">Preços e especificações finais</strong>
                  <small>Sem data de lançamento anunciada.</small>
                </div>
            </div>
          </article>
          <article className="flex min-h-52 flex-col items-center justify-center border border-slate-800 bg-linear-to-br from-[#161920] to-[#101217] p-6 text-center">
            <ShieldCheck size={28} className="mb-4 text-cyan-300" />
            <p className="mb-3 font-mono text-[9px] tracking-[0.16em] text-slate-500">
              OBJETIVO / 003
            </p>
            <h3 className="text-xl font-bold leading-tight">
              Execução local.
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Privacidade como prioridade.
              <br />
              Garantias finais por confirmar.
            </p>
            <LockKeyhole size={24} className="mt-4 text-cyan-300" />
          </article>
          <article className="border border-slate-800 bg-linear-to-br from-[#161920] to-[#101217] p-6 md:col-span-2">
            <p className="mb-4 font-mono text-[9px] tracking-[0.16em] text-slate-500">
              COMPATIBILIDADE / 004
            </p>
            <h3 className="text-xl font-bold leading-tight">
              Software em avaliação.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">A compatibilidade com estas ferramentas ainda não está confirmada.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["◈", "DOCKER"],
                ["◉", "OLLAMA"],
                ["◒", "WEBUI"],
                ["◫", "LM STUDIO"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="grid h-18 place-items-center border border-slate-700 text-xl text-slate-200"
                >
                  {icon}
                  <small className="font-mono text-[8px] tracking-widest text-slate-400">
                    {label}
                  </small>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        id="catalog"
        className="mx-auto max-w-310 scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-5 font-mono text-[10px] tracking-[0.17em] text-slate-500">03 / BIBLIOTECA LOCAL</p>
            <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
              Escolhe o teu stack.
              <br />
              <span className="text-slate-500">Sem pagar pelos modelos.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
              Pesquisa a biblioteca, seleciona os modelos e configura compra ou aluguer, capacidade e entrega num único lugar.
            </p>
            <Link href="/catalog" className="mt-7 inline-flex min-h-11 items-center gap-3 border border-orange-500 bg-orange-500 px-4 py-3 font-mono text-[10px] tracking-widest text-[#160b04] transition hover:bg-orange-400">
              CONFIGURAR MODELOS E DISPOSITIVO <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-0 border-y border-slate-800">
            {modelCatalog.slice(0, 4).map((model) => (
              <div key={model.id} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-800 py-4 last:border-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{model.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{model.family}</p>
                </div>
                <span className="font-mono text-xs text-slate-300">{model.size}</span>
              </div>
            ))}
            <Link href="/catalog" className="border-t border-slate-800 py-4 font-mono text-[10px] tracking-[0.12em] text-orange-300 hover:text-orange-200">
              VER OS {modelCatalog.length} MODELOS DISPONÍVEIS <ArrowRight className="ml-2 inline size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="tiers"
        className="mx-auto max-w-310 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 font-mono text-[10px] tracking-[0.17em] text-slate-500">04 / DISPOSITIVOS PREVISTOS</p>
          <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            Gama em preparação
            <br />
            <span className="text-slate-500">para a campanha.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-slate-400">
            Os valores apresentados são estimativas para planeamento. Produtos,
            preços e condições finais serão confirmados antes do lançamento.
            Ainda não aceitamos encomendas nem pagamentos.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-257.5 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hardwareCatalog.map((product) => (
            <Tier key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="story"
        className="mx-auto grid max-w-310 gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16 md:px-8 md:py-28"
      >
        <div>
          <p className="mb-5 font-mono text-[10px] tracking-[0.17em] text-slate-500">
            05 / CONTEÚDO PROPOSTO
          </p>
          <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            Uma proposta de kit
            <br />
            <span className="text-slate-500">ainda por confirmar.</span>
          </h2>
          <p className="my-6 max-w-sm text-sm leading-relaxed text-slate-400">
            A imagem e os acessórios são conceptuais. O conteúdo final da
            campanha ainda está a ser definido.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-orange-400 hover:text-orange-300"
          >
            SEE MODELS <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid min-h-108 grid-cols-2 grid-rows-3 gap-3 sm:grid-cols-3 sm:grid-rows-2">
          <div className="row-span-1 flex flex-col justify-end overflow-hidden border border-slate-800 bg-[#11141a] sm:row-span-2">
            <img
              src="/ai-drive-render.png"
              alt="AI Drive product"
              className="mx-auto -mb-6 w-[70%] object-contain drop-shadow-[0_25px_15px_#000] sm:mb-0 sm:ml-[-16%] sm:w-[130%]"
            />
            <span className="pb-4 text-center font-mono text-[8px] tracking-[0.12em] text-slate-400">
              01 / AI DRIVE
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 border border-slate-800 bg-[#14171e]">
            <div className="relative h-14 w-24 rotate-[-20deg] rounded-[50%] border-b-[7px] border-slate-700" />
            <span className="pb-4 text-center font-mono text-[8px] tracking-[0.12em] text-slate-400">
              02 / BRAIDED USB-C
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 border border-slate-800 bg-[#14171e]">
            <div className="grid h-18 w-14 rotate-[-7deg] place-items-center bg-orange-500 font-mono text-[9px] leading-tight text-[#170b04] shadow-[6px_5px_0_#4b250e]">
              FIELD
              <br />
              GUIDE
            </div>
            <span className="pb-4 text-center font-mono text-[8px] tracking-[0.12em] text-slate-400">
              03 / QUICKSTART GUIDE
            </span>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-3 border border-slate-800 bg-[#14171e] sm:col-span-1">
            <div className="flex max-w-24 flex-wrap justify-center gap-1 font-mono text-[9px] text-orange-400">
              <span className="rotate-[-8deg] border border-slate-500 px-2 py-1.5">
                AI
              </span>
              <span className="rotate-6 border border-slate-500 px-2 py-1.5 text-cyan-300">
                OFFLINE
              </span>
              <span className="border border-slate-500 px-2 py-1.5">10G</span>
            </div>
            <span className="pb-4 text-center font-mono text-[8px] tracking-[0.12em] text-slate-400">
              04 / TECH PACK
            </span>
          </div>
        </div>
      </section>

      <section id="campaign" className="mx-auto max-w-294 px-5 pb-20 md:px-8">
        <div className="flex flex-col gap-5 border border-orange-500/30 bg-orange-500/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-orange-300">ESTADO DO PROJETO</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Campanha em preparação</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">Ainda não há meta, data de lançamento ou encomendas abertas.</p>
          </div>
          <Link href="/catalog" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-orange-500 bg-orange-500 px-4 py-3 font-mono text-[10px] tracking-widest text-[#160b04] hover:bg-orange-400">
            EXPLORAR A PRÉVIA <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="mx-auto grid max-w-310 gap-6 border-t border-slate-800 px-5 py-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-extrabold tracking-[0.18em] text-white"
          >
            <span className="flex h-4.5 items-end gap-0.5">
              <i className="h-2 w-0.75 rounded-sm bg-orange-500" />
              <i className="h-3.75 w-0.75 rounded-sm bg-orange-500" />
              <i className="h-2.75 w-0.75 rounded-sm bg-orange-500" />
            </span>
            AI<span className="text-orange-500">DRIVE</span>
          </Link>
          <p className="mt-3 text-xs text-slate-400">Open AI. Offline.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[9px] tracking-[0.12em] text-slate-400">
          <Link href="#why" className="hover:text-orange-400">
            WHY AI DRIVE
          </Link>
          <Link href="/catalog" className="hover:text-orange-400">
            CATALOG
          </Link>
          <Link href="#campaign" className="hover:text-orange-400">
            LANÇAMENTO
          </Link>
          <Link href="/account" className="hover:text-orange-400">
            ACCOUNT
          </Link>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-slate-400 md:justify-end">
          <GitBranch size={17} className="text-orange-400" />
          OPEN SOURCE / GPL-3.0
        </div>
        <div className="col-span-full flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-slate-800 pt-4 font-mono text-[8px] tracking-[0.12em] text-slate-500">
          <span>© 2026 AI DRIVE SYSTEMS</span>
          <span>MADE FOR THE CURIOUS</span>
          <span>PRIVACY IS A FEATURE</span>
        </div>
      </footer>
    </main>
  );
}
