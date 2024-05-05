"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function uploadImage(image: FormData, jwt: string, id: string) {
  const [response, error] = await fetchWithError(`${endpoints.users}/${id}/profile-image`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt}`
    },
    method: "post",
    body: image,
  })

  if (error) {
    return {message: error.message ?? error.toString(), success: false}
  }
  
  return {success: true}
}