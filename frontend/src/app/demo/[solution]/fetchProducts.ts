"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function fetchProducts(solution: string) {
  const [products, error] = await fetchWithError(`${endpoints.products}/active?category=${solution}`, {
    next: {
      revalidate: 0,
    },
  })

  if (!error) return {
    success: true, products: products.products,
  }

  return {success: false, message: error}
}