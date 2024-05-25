"use server"

import fetchWithError from "@/global/fetchWithError"

export default async function uploadImage(target: string, image: FormData, jwt: string, isGlb: boolean = false) {
  let contentType = {}

  if (isGlb) contentType = { "Content-Type" : "model/gltf-binary" }
  const [response, error] = await fetchWithError(target, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt}`,
      // ...contentType,
    },
    method: "post",
    body: image,
  })

  if (error) {
    return {message: error.message ?? error.toString(), success: false}
  }
  
  return {success: true}
}