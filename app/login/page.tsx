import { LoginForm } from "./login-form"

type LoginSearchParams = Promise<Record<string, string | string[] | undefined>>

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function LoginPage({ searchParams }: { searchParams: LoginSearchParams }) {
  const params = await searchParams
  const nextPath = firstParam(params.next) ?? "/account"

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0c10] px-5 py-10 text-slate-100">
      <LoginForm nextPath={nextPath} />
    </main>
  )
}
