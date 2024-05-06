"use server"
import endpoints from "@/global/endpoints"

const deleteItem = async (
  item: string,
  id: string,
  jwt: string,
  path: string = "",
) => {  
  const response = await fetch(
    `${endpoints[item as keyof typeof endpoints]}${path}/${id}`,
    {
      method: "delete",
      next: {
        revalidate: 0,
      },
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }
  )

  if (response.ok) {
    return {success: true}
  } else {
    return {success: false, message: (await response.json()).message}
  }
}

export default deleteItem