import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import fetchWithError from "@/global/fetchWithError";
import endpoints from "@/global/endpoints";
import ErrorMessage from "@/components/ErrorMessage";
import BlogPost from "@/types/BlogPost";
import Pagination from "@/components/Pagination";

const Blog = async ({
  searchParams
}: {
  searchParams: {
    page?: string
  }
}) => {
  const [data, error] = await fetchWithError(`${endpoints.posts}/active?page=${searchParams.page ?? 1}&limit=8`, {
    next: {
      revalidate: 0,
    },
  })

  let blogs, last

  if (!error) {
    blogs = data.posts
    last = data.totalPages
  }

  return (
    <main className="flex flex-col items-center py-10 gap-10">
      <h1>Blog</h1>
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !error && blogs && blogs.length <=0 &&
        "We still do not have anything yet. Stay posted for updates!"
      }
      {
        !error && blogs && blogs.length > 0 &&
        <>
        <section className="flex flex-col lg:grid grid-cols-2 gap-4">
        {
          blogs.map((blog: BlogPost) => (
            <Link className="h-full" key={blog._id} href={`/blog/${blog._id}`}>
              <Card className="h-full">
                <CardHeader className="gap-2">
                  <Image
                    src={blog.thumbnail ?? ""}
                    alt=""
                    height={500}
                    width={500}
                    className="object-cover rounded-[1rem] aspect-video"
                  />
                  <p className="text-sm">
                    {new Date(blog.date).toDateString()}
                  </p>
                  <CardTitle>
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {blog.description.substring(0, 200)}
                </CardContent>
              </Card>
            </Link>
          ))
        }
      </section>
      <Pagination
      handle="/blog"
      last={last}
      searchParams={searchParams}
      />
      </>
      }
    </main>
  );
}
 
export default Blog;