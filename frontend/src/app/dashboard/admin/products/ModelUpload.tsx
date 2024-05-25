"use client"

import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import endpoints from "@/global/endpoints";
import uploadImage from "@/actions/uploadImage";
import ModelViewer from "@/components/ModelViewer";

const ModelUpload = ({
  id,
  jwt,
  model
}: {
  id: string,
  jwt: string,
  model?: string,
}) => {
  const [message, setMessage] = useState<string | null>(null)
  const formik = useFormik({
    initialValues: {
      model: "",
    },
    onSubmit: (async (values) => {
      if (values.model) {
        const data = new FormData()
        if  (imgSelector.current?.files) {
          data.set("file", imgSelector.current?.files[0])

          const response = await uploadImage(`${endpoints.products}/${id}/product-model`, data, jwt, true)

          if (!response.success) {
            setMessage(response.message)
          } else {
            setMessage("Succesfully uploaded")
          }
        }
      }
    })
  })
  const imgSelector = useRef<HTMLInputElement>(null)
  
  return (
    <form
    className="flex flex-col gap-2"
    onSubmit={formik.handleSubmit}
    >
        <p className="text-sm">3D Model</p>
        {
          model &&
          <ModelViewer model={`${endpoints.engine}/model/${id}`} className="w-[150px] h-[150px]"/>
        }
        <input
          type="file"
          ref={imgSelector}
          onChange={formik.handleChange}
          id="model"
          name="model"
          accept=".glb"
        />
        {
          message &&
          <p className="font-bold">{message}</p>
        }
        <Button
        className="text-white w-max"
        disabled={!imgSelector.current?.files || imgSelector.current.files.length <= 0}
        type="submit"
        >
          Upload Model
        </Button>
    </form>
  );
}
 
export default ModelUpload;