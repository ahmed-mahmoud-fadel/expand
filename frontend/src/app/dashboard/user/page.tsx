import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import User from "@/types/User";
import { cookies } from "next/headers";
import UserForm from "./Form";

const Profile = async () => {
  const jwt = cookies().get('jwt')
  const id = cookies().get('id')

  const [user, error] = await fetchWithError(
    `${endpoints.users}/${id?.value}`,
    {
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt?.value}`
      }
    },
  ) as [User, any]

  return (
    <main>
      {
        error &&
        <div className="text-red-600 font-bold">
          {error.message}
        </div>
      }
      {
        !error && user &&
        <UserForm user={user} jwt={jwt?.value ?? ""} />
      }
    </main>
  );
}
 
export default Profile;