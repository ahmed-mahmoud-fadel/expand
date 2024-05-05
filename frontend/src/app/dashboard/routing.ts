import endpoints from "@/global/endpoints"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function dashboardRouting(role?: string) {
  const cookiesStore = cookies()

  const id = cookiesStore.get('id')
  const jwt = cookiesStore.get('jwt')

  if (!id || !jwt) redirect('/login')

  const response = await fetch(`${endpoints.users}/${id?.value}`, {
    next: {
      revalidate: 24 * 60 * 60
    }, 
    headers: {
      "Authorization": `Bearer ${jwt.value}`
    }
  })

  if (!response.ok) {
    redirect('/login')
  } else {
    const user = await response.json()
    
    if (!role || user.role !== role)
      redirect(`/dashboard/${user.role}`)
  }
}