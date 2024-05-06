'use server'

import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import next from "next";

const editEntity = async (
  item: string,
  id: string,
  values: any,
  jwt: string,
  path: string = '',
) => {
  const [data, error] = await fetchWithError(
    `${endpoints[item as keyof typeof endpoints]}${path}/${id}`,
    {
      method: "put",
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  )

  if (!error) {
    return {success: true}
  } else {
    return {success: false, message: error.message}
  }
}
 
export default editEntity;