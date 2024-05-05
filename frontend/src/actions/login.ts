'use server'

import endpoints from "@/global/endpoints"

const login = async (values: { email: string, password: string }) => {
  const response = await fetch(endpoints.login, {
    body: JSON.stringify(values),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    }
  })

  if (!response.ok) {
    const message = (await response.json()).message
    return { valid: false, message }
  }

  const data = await response.json()

  return { valid: true, data }
}

export default login