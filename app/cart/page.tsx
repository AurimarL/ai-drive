import { redirect } from "next/navigation"

type CartSearchParams = Promise<Record<string, string | string[] | undefined>>

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function CartPage({ searchParams }: { searchParams: CartSearchParams }) {
  const params = await searchParams
  const query = new URLSearchParams()

  for (const key of ["device", "mode", "days", "models", "shipping"]) {
    const value = firstParam(params[key])
    if (value !== undefined) query.set(key, value)
  }

  const queryString = query.toString()
  redirect(queryString ? `/catalog?${queryString}` : "/catalog")
}
