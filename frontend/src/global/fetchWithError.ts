import { RequestInit } from "next/dist/server/web/spec-extension/request"

const fetchWithError = async (url: string | URL, init?: RequestInit) => {
  let data: any = null, error: any = null

  try {
    const response = await fetch(url, init)

    if (response.ok) {
      data = await response.json()
    } else {
      throw await response.json()
    }
  } catch (e: any) {
    if (e.message) error = e
    else error = {message: e.toString()}
  }

  return [data, error]
}

export default fetchWithError