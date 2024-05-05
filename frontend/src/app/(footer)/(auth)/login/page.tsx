import LoginForm from "@/components/forms/LoginForm";
import endpoints from "@/global/endpoints";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const Login = async () => {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  const id = cookieStore.get('id')

  if (jwt && id) {
    const response = await fetch(`${endpoints.users}/${id?.value}`, {
      headers: {
        "Authorization": `Bearer ${jwt?.value}`
      },
      next: {
        revalidate: 24 * 60 * 60,
      }
    })

    if (response.ok) {
      redirect('/dashboard')
    }
  }

  return (
    <main className="flex flex-col gap-10 items-center w-full h-full">
      <h2>Log in</h2>
      <LoginForm />
    </main>
  );
}
 
export default Login;