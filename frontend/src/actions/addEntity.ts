"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function addEntity(
  item: string,
  values: any,
  jwt?: string,
  path: string = "",
) {
  const [data, error] = await fetchWithError(
    `${endpoints[item as keyof typeof endpoints]}${path}`,
    {
      method: "post",
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    }
  )

  if (!error) {
    return {success: true, entity: data}
  } else {
    return {success: false, message: error.message}
  }
}