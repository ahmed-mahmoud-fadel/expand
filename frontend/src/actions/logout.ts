'use server'

import endpoints from "@/global/endpoints"
import { cookies } from "next/headers"

export default async function logout() {
  const cookieStore = cookies()
  const jwt = cookieStore.get("jwt")

  const response = await fetch(`${endpoints.logout}`, {
    next: {
      revalidate: 0
    },
    method: 'post',
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  if (!response.ok) {
    const data = await response.json()
    return { valid: false, message: data.message }
  }

  return { valid: true }
}