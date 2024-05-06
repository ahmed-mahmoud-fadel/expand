import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import BlogPost from "@/types/BlogPost";
import Image from "next/image";

const BlogPage = async ({
  params,
}: {
  params: {
    id: string,
  },
}) => {
  const [blog, error] = await fetchWithError(`${endpoints.posts}/active/${params.id}`, {
    next: {
      revalidate: 0,
    },
  }) as [BlogPost, any]

  return (
    <>
    <Header />
    {
      error && <ErrorMessage message={error.message} />
    }
    {
      !error && blog &&
      <main className="flex flex-col items-center w-full gap-10 lg:gap-24">
        {
          blog.thumbnail &&
          <Image
          alt=""
          src={blog.thumbnail}
          width={1200}
          height={1200}
          className="w-full h-52 lg:h-96 object-cover"
          />
        }
        <div className="px-10 lg:px-24 mb-10 gap-10 flex flex-col w-full">
          <h2 className="text-center">{blog.title}</h2>
          <p>Publihed on: {new Date(blog.date).toDateString()}</p>
          <p>{blog.description}</p>
        </div>
      </main>
    }
    </>
  );
}
 
export default BlogPage;