import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Product from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import banner from '@/global/img/banner.png'

const Products = async ({
  searchParams
}: {
  searchParams?: {
    q?: string,
    min?: string,
    max?: string,
    vendor?: string,
    category?: string,
    page?: string,
  }
}) => {
  const [data, error] = await fetchWithError(`${endpoints.products}/active?page=${searchParams?.page ?? 1}&limit=9`, {
    next: {
      revalidate: 0,
    }
  })

  let products, last

  if (!error) {
    products = data.products
    last = data.totalPages
  }

  return (
    <main className="flex flex-col gap-10">
      <section className="py-10 border-b flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
        <div className="flex flex-col gap-6 text-center items-center lg:text-left lg:items-start">
          <div className="text-xl lg:text-3xl font-bold flex items-center gap-2">
            <p>See it</p>
            <FaArrowRight className="text-primary" />
            <p className="text-2xl lg:text-4xl">Try it</p>
            <FaArrowRight className="text-primary" />
            <p className="text-3xl lg:text-5xl">Love it!</p>
          </div>
          <p className="text-lg font-semibold">Revolutionize your look with VTO: Try before you buy, hassle-free, and always on point!</p>
        </div>
        <Image
          className="object-cover rounded-lg m-0 lg:mr-10"
          alt=""
          src={banner}
          width={270}
        />
      </section>
      <section className="flex flex-col gap-10">
        <form className="flex gap-2">
          <Input
            placeholder="Search for a product"
          />
          <Button
            className="text-white"
            type="submit"
          >
            Search
          </Button>
        </form>
        {/* <div className="flex gap-2">
          <div className="p-2 border-r">
            <div className="p-1 flex gap-4 justify-between border-b items-center">
              <p className="font-semibold">Filters</p>
              <p className="text-primary text-sm">Clear all</p>
            </div>
            <div className="p-2 flex flex-col">
              <p className="font-bold">Price</p>
            </div>
          </div>
        </div> */}
        <ErrorMessage message={error?.message} />
        {
          !error && products &&
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {
              products.map((product: Product) => (
                <Card className="flex flex-col" key={product._id}>
                  <CardHeader>
                    <Image
                    alt=""
                    className="object-cover aspect-square rounded w-full"
                    src={product.thumbnail}
                    width={200}
                    height={200}
                    />
                    <CardTitle className="text-lg">
                      {product.title.toUpperCase()}
                    </CardTitle>
                    <div className="flex justify-between">
                      <CardDescription>
                        {product.vendor}
                      </CardDescription>
                      <Badge className="text-white">{product.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm">
                    <p>{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-evenly">
                    <Link href={`/demo/${product.category.toLowerCase()}`}>
                      <Button className="text-white">
                        Try VTO
                      </Button>
                    </Link>
                    <Link href={product.link ?? ""}>
                      <Button variant="secondary">
                        Purchase
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            }
          </div>
          <div className="flex justify-center">
            <Pagination
            handle="/products"
            last={last}
            searchParams={searchParams}
            />
          </div>
          </>
        }
      </section>
    </main>
  );
}

export default Products;