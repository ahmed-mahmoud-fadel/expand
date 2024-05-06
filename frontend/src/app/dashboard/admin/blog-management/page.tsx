import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import BlogPost from "@/types/BlogPost";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../../../../components/DeleteButton";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const BlogManagement = async ({
  searchParams
}: {
  searchParams: any,
}) => {
  const jwt = cookies().get('jwt')
  const page = searchParams?.page ?? 1

  const [data, error] = await fetchWithError(
    `${endpoints.posts}/all?page=${page}&limit=10`,
    {
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt?.value}`
      }
    }
  )

  let posts, last

  if (!error) {
    posts = data.posts
    last = data.totalPages
  }

  return (
    <main className="flex flex-col gap-5 h-full">
      <p className="text-lg font-bold">Blog Management</p>
      <ErrorMessage message={error?.message} />

      {
        !error && posts &&
        <>
        <div className="flex-1">
          {
            posts.length <= 0 &&
            "No blog posts found."
          }
          {
            posts.length > 0 &&
            
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    posts.map((post: BlogPost, n: number) => (
                      <TableRow key={post._id}>
                        <TableCell>{(n * page) + 1}</TableCell>
                        <TableCell>{post.title.substring(0, 30)}</TableCell>
                        <TableCell>{post.description.substring(0, 100)}</TableCell>
                        <TableCell>{new Date(post.date).toDateString()}</TableCell>
                        <TableCell>
                          {
                            post.thumbnail &&
                            <Image src={post.thumbnail} alt="" width={100} height={100} />
                          }
                        </TableCell>
                        <TableCell><Link href={post.link ?? ""}>{post.link}</Link></TableCell>
                        <TableCell>{post.active ? "Active" : "Inactive"}</TableCell>
                        <TableCell className="flex gap-10">
                          <Link
                            href={`/dashboard/admin/blog-management/${post._id}`}
                            className="text-primary flex items-center gap-1"
                          >
                            <FaEdit />
                            Edit
                          </Link>
                          <DeleteButton
                            jwt={jwt?.value ?? ""}
                            id={post._id}
                            item="posts"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
          }
          </div>
          <div className="justify-between flex">
            <Link
            href="/dashboard/admin/blog-management/new"
            className="w-max"
            >
              <Button className="flex gap-1 items-center text-white">
                <FaPlus />
                Add blog post
              </Button>
            </Link>
            <Pagination
              handle="/dashboard/admin/blog-management"
              last={last}
              searchParams={searchParams}
            />
          </div>
        </>
      }
    </main>
  );
}

export default BlogManagement;