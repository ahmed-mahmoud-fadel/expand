import ErrorMessage from "@/components/ErrorMessage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Product from "@/types/Product";
import Link from "next/link";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import Pagination from "@/components/Pagination";
import DeleteButton from "./DeleteButton/DeleteButton";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string
  },
}) => {
  const header = [
    "ID", "Thumbnail", "Name", "Category",
    "Description", "Vendor", "", "", "Active",
  ]

  const [products, error]: [Product[], any] = [
    [
      {
        vendor: "Zara",
        thumbnail: "https://specscart.co.uk/media/catalog/product/a/9/a97008f-1-1.webp",
        category: "Glasses",
        description: "Lorem Ipsum",
        _id: '1',
        isActive: true,
        name: "Classic Glasses"
      },
      {
        vendor: "Addidas",
        thumbnail: "https://contents.mediadecathlon.com/p2606919/k$a531927e5c71c12f4d3edac227199f78/jogflow-5001-men-s-running-shoes-white-blue-red.jpg?format=auto&quality=40&f=452x452",
        category: "Shoes",
        description: "Lorem Ipsum",
        _id: '2',
        isActive: false,
        name: "Running Shoes"
      }, {
        vendor: "Casio",
        category: "Watches",
        description: "Lorem Ipsum",
        thumbnail: "https://m.media-amazon.com/images/I/61+jdqBIN9L._AC_SL1200_.jpg",
        _id: '3',
        isActive: true,
        name: "G-Shock Golden Military Watch for Men"
      }
    ],
    null
  ]
  
  // await fetchWithError(
  //   `${endpoints.products}?_page=${searchParams?.page ?? 1}_limit=10`,
  //   {
  //     next: {
  //       revalidate: 0
  //     }
  //   }
  // ) as [Product[], any]

  return (
    <main className="flex flex-col gap-4">
      <h1>Product listing</h1>

      {/* Include toolbar here */}

      <ErrorMessage message={error?.message} />

      {
        !error && products &&
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {
                  header.map(str => (
                    <TableHead>{str}</TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                products.map((product, n: number) => (
                  <TableRow>
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
                      {product.name}
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
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.isActive}
                      />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Pagination
            handle="/dashboard/admin/products"
            last={10}
            searchParams={searchParams}
            />
          </div>
        </>
      }
    </main>
  );
}

export default ProductsPage;