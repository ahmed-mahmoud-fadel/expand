"use client"

import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import { FaChevronUp, FaChevronDown, FaCamera, FaArrowLeft } from "react-icons/fa";
import icon from '@/global/img/icon.png'

type Product = {
  id: string | number,
  thumbnail: string,
}

const DemoDisplay = () => {
  return (
    <div className="w-full h-full">
      <video className="w-full" />
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
              key={product.id}
              alt=""
              src={product.thumbnail}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-full"
              onClick={() => {
                selectionCallback(product.id)
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

const DemoPage = () => {
  return (
    <main className="absolute top-0 right-0 w-full h-screen">
      <DemoDisplay />
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
          <ProductSelector
          products={[
            {
              id: 0,
              thumbnail: "/img/camera.jpg"
            },
            {
              id: 1,
              thumbnail: "/img/glasses.jpg"
            },
            {
              id: 2,
              thumbnail: "/img/mug.png"
            },
            {
              id: 3,
              thumbnail: "/img/watch.jpg"
            },
          ]}
          selectionCallback={(id) => {
            /*
              Insert code here.
              This code will run after a model selection has been made.
            */
          }}
          />
        </div>
      </div>
    </main>
  );
}
 
export default DemoPage;