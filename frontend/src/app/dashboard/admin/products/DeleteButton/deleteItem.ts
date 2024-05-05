"use server"
import endpoints from "@/global/endpoints"

const deleteItem = async (
  item: string,
  id: string,
  successCallback?: () => void,
  errorCallback?: (message: string | null) => void,
) => {  
  const response = await fetch(
    `${endpoints[item as keyof typeof endpoints]}/${id}`,
    {
      method: "delete",
    }
  )

  if (response.ok) {
    if (successCallback) successCallback()
  } else if (errorCallback) {
    let error: string | null = null
    try {
      error = await response.json()
    } catch (e: any) {
      error = e.toString()
    }
    errorCallback(error)
  }
}

export default deleteItem