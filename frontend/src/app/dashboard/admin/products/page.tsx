import ErrorMessage from "@/components/ErrorMessage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Product from "@/types/Product";
import Link from "next/link";
import Image from "next/image";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import Pagination from "@/components/Pagination";
import DeleteButton from "../../../../components/DeleteButton";
import fetchWithError from "@/global/fetchWithError";
import endpoints from "@/global/endpoints";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string
  },
}) => {
  const jwt = cookies().get("jwt")
  const page = searchParams.page ?? 1

  const header = [
    "ID", "Thumbnail", "Name", "Category",
    "Description", "Vendor", "", "", "Status",
  ]

  const [data, error] = await fetchWithError(`${endpoints.products}/admin?page=${page}&limit=10`, {
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  let products, last

  if (!error) {
    products = data.products
    last = data.totalPages
  }

  return (
    <main className="flex flex-col gap-4">
      <h1>Product listing</h1>

      <ErrorMessage message={error?.message} />

      {
        !error && products &&
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {
                  header.map(str => (
                    <TableHead key={str}>{str}</TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                products.map((product: Product, n: number) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      {(n + 1)}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={product.thumbnail}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </TableCell>
                    <TableCell>
                      {product.title}
                    </TableCell>
                    <TableCell>
                      {product.category}
                    </TableCell>
                    <TableCell>
                      {product.description}
                    </TableCell>
                    <TableCell>
                      {product.vendor}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/admin/products/${product._id}`}
                        className="text-primary flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </Link>
                    </TableCell>
                    <TableCell>
                      <DeleteButton
                      id={product._id}
                      item="products"
                      jwt={jwt?.value ?? ''}
                      />
                    </TableCell>
                    <TableCell>
                      {product.status}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Link
            href="/dashboard/admin/products/new"
            className="w-max"
            >
              <Button className="flex gap-1 items-center text-white">
                <FaPlus />
                Add product
              </Button>
            </Link>
            <Pagination
            handle="/dashboard/admin/products"
            last={last}
            searchParams={searchParams}
            />
          </div>
        </>
      }
    </main>
  );
}

export default ProductsPage;