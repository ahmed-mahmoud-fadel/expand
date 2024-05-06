import fetchWithError from "@/global/fetchWithError";
import BlogForm from "../Form";
import endpoints from "@/global/endpoints";
import { cookies, headers } from "next/headers";
import ErrorMessage from "@/components/ErrorMessage";

const EditProductPage = async ({
  params
}: {
  params: any
}) => {
  const jwt = cookies().get('jwt')
  const [blog, error] = await fetchWithError(`${endpoints.posts}/${params.id}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit blog post</p>
      {error && <ErrorMessage message={error.message} />}
      {
        !error && blog &&
        <BlogForm
        jwt={jwt?.value ?? ''}
        blog={blog}
        />
      }
    </main>
  );
}
 
export default EditProductPage;