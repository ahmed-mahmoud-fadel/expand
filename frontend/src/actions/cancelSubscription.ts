"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function cancelSubscription(id: string, jwt: string) {
  const [data, error] = await fetchWithError(
    `${endpoints.subscriptions}/${id}/cancel`,
    {
      next: {
        revalidate: 0,
      },
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
      method: "put",
    }
  )

  if (!error) {
    return {success: true}
  } else {
    return {success: false, message: error.message}
  }
}