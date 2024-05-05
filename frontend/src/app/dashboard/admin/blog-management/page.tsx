import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import BlogPost from "@/types/BlogPost";
import Image from "next/image";
import Link from "next/link";

const BlogManagement = async ({
  searchParams
}: {
  searchParams: any,
}) => {
  const page = searchParams?.page ?? 1, last = 10
  const [posts, error] = await fetchWithError(
    `${endpoints.posts}?_page=${page}&_limit=10`,
    {
      next: {
        revalidate: 0
      }
    }
  )

  return (
    <main className="flex flex-col gap-5">
      <p className="text-lg font-bold">Blog Management</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Link</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            posts.map((post: BlogPost) => (
              <TableRow>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title.substring(0, 30)}</TableCell>
                <TableCell>{post.description.substring(0, 100)}</TableCell>
                <TableCell>{new Date(post.date).toDateString()}</TableCell>
                <TableCell>
                  {
                    post.thumbnail &&
                    <Image src={post.thumbnail} alt="" width={100} height={100}/>
                  }
                </TableCell>
                <TableCell><Link href={post.link}>{post.link}</Link></TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>{post.active ? "Active" : "Inactive"}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </main>
  );
}
 
export default BlogManagement;