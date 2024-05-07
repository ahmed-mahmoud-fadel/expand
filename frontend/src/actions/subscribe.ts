"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function subscribe(
  userId: string,
  solutionId: string,
  pricingPlanId: string,
  jwt: string,
) {
  const [data, error] = await fetchWithError(
    `${endpoints.subscriptions}/${userId}`,
    {
      method: "post",
      next: {
        revalidate: 0,
      },
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({solutionId, pricingPlanId})
    }
  )

  if (!error) {
    return {success: true}
  } else {
    return {success: false, message: error.message}
  }
}