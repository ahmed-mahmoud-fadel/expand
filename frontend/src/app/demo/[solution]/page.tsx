"use client"

import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react"
import { FaChevronUp, FaChevronDown, FaCamera, FaArrowLeft } from "react-icons/fa";
import icon from '@/global/img/icon.png'
import Product from "@/types/Product";
import endpoints from "@/global/endpoints";
import fetchProducts from "./fetchProducts";

const DemoDisplay = ({
  solution,
  product,
}: {
  solution: string,
  product: string,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <iframe
      className="w-full h-full"
      src={`${endpoints.engine}?solution=${solution}&product=${product}`}
      allow="camera"
      />
    </div>
  )
}

const ProductSelector = ({
  products,
  selectionCallback,
} : {
  products: Product[],
  selectionCallback: (productId: number | string) => void,
}) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <button
        onClick={() => setOpen(p => !p)}
        className="bg-primary py-1 px-5 rounded-t-2xl"
        >
          {
            isOpen &&
            <FaChevronDown />
          }
          {
            !isOpen &&
            <FaChevronUp />
          }
        </button>
      </div>
      {
        isOpen &&
        <div className="flex gap-5 p-5 overflow-x-scroll bg-primary">
          {
            products.map(product => (
              <Image
              key={product.thumbnail}
              alt=""
              src={product.thumbnail}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
              onClick={() => {
                selectionCallback(product._id)
                setOpen(false)
              }}
              />
            ))
          }
        </div>
      }
      </div>
  )
}

const DemoPage = ({
  params
}: {
  params: {
    solution: string
  }
}) => {
  const [selected, setSelected] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    fetchProducts(params.solution)
    .then((data) => {
      if (data.success && data.products.length > 0) {
        setProducts(data.products)
        setSelected(data.products[0]._id)
      } else if (!data.success) {
        alert(data.message)
      }
    })
  }, [])

  return (
    <main className="absolute top-0 right-0 w-full h-screen">
      {
        selected &&
        <DemoDisplay
        product={selected}
        solution={params.solution}
        />
      }
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="flex justify-between items-center p-6">
          <Link
          className="text-3xl"
          href="/demo"
          replace>
            <FaArrowLeft />
          </Link>
          <Image
          src={icon}
          alt=""
          className="w-10"
          />
        </div>
        <div className="absolute bottom-0 w-full flex flex-col items-center">
          <button
          className="p-5 border-8 rounded-full my-5"
          onClick={() => {

          }}
          >
            <FaCamera />
          </button>
          {
            products &&
            <ProductSelector
            products={products}
            selectionCallback={(id) => {
              setSelected(id as string)
            }}
          />
          }
        </div>
      </div>
    </main>
  );
}
 
export default DemoPage;