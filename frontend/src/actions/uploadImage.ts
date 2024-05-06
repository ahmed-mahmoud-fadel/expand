"use server"

import fetchWithError from "@/global/fetchWithError"

export default async function uploadImage(target: string, image: FormData, jwt: string) {
  const [response, error] = await fetchWithError(target, {
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