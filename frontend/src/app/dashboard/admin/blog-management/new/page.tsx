import { cookies } from "next/headers";
import BlogForm from "../Form";

const NewSolutionPage = () => {
  const jwt = cookies().get('jwt')
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">New blog post</p>
      <BlogForm
      jwt={jwt?.value ?? ''}
      />
    </main>
  );
}
 
export default NewSolutionPage;