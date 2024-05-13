"use client"

import Image from "next/image"
import Link from "next/link";
import { useState } from "react"
import { FaChevronUp, FaChevronDown, FaCamera, FaArrowLeft } from "react-icons/fa";
import icon from '@/global/img/icon.png'

type Product = {
  thumbnail: string,
  modelName: string,
  solution: "glasses" | "watches",
}

const DemoDisplay = ({
  solution,
  model,
}: {
  solution: string,
  model: string,
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <embed
      className="w-[400px] h-full"
      src={`https://expand-vto.pages.dev/?solution=${solution}&model=${model}&width=400px`}
      // allow="camera"
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
                selectionCallback(product.modelName!)
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

const models: Product[] = [
  {
    modelName: 'glasses 1.glb',
    solution: "glasses",
    thumbnail: "/glasses/1.png",
  },
  {
    modelName: 'glasses 2.glb',
    solution: "glasses",
    thumbnail: "/glasses/2.png",
  },
  {
    modelName: 'watch 1.glb',
    solution: "watches",
    thumbnail: "/watches/1.png",
  },
  {
    modelName: 'watch 2.glb',
    solution: "watches",
    thumbnail: "/watches/2.png",
  },
]

const DemoPage = ({
  params
}: {
  params: {
    solution: string
  }
}) => {
  const [model, setModel] = useState(models[0].modelName)

  return (
    <main className="absolute top-0 right-0 w-full h-screen">
      <DemoDisplay
      model={model!}
      solution={params.solution}
      />
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
          products={models}
          selectionCallback={(id) => {
            setModel(id as string)
          }}
          />
        </div>
      </div>
    </main>
  );
}
 
export default DemoPage;