"use server"

import endpoints from "@/global/endpoints"

export default async function signup(values: any) {
  const response = await fetch(endpoints.signup, {
    body: JSON.stringify(values),
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    next: {
      revalidate: 0,
    }
  })

  if (!response.ok) {
    const message = (await response.json()).message
    return { success: false, message }
  }

  return { success: true }
}