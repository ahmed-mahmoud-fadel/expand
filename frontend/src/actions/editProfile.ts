"use server"

import endpoints from "@/global/endpoints"

export default async function editProfile(user: any, jwt: string, id:string) {
  const response = await fetch(`${endpoints.users}/${id}`, {
    next: {
      revalidate: 0,
    },
    method: "put",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.companyName,
      phone: user.phone,
      status: user.status,
    }),
  })

  if (!response.ok) {
    const message = await response.json()
    return {success: false, message: message.message}
  } else {
    return {success: true}
  }
}