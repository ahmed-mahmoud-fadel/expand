"use client"

import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import endpoints from "@/global/endpoints";
import uploadImage from "@/actions/uploadImage";

const ImageUpload = ({
  image,
  id,
  jwt,
}: {
  image?: string,
  id: string,
  jwt: string,
}) => {
  const [message, setMessage] = useState<string | null>(null)
  const formik = useFormik({
    initialValues: {
      photo: image,
    },
    onSubmit: (async (values) => {
      if (values.photo) {
        const data = new FormData()
        if  (imgSelector.current?.files) {
          data.set("file", imgSelector.current?.files[0])

          const response = await uploadImage(`${endpoints.posts}/${id}/blog-image`, data, jwt)

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
  const profileImage = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (profileImage.current) {
      if (imgSelector.current && imgSelector.current.files && imgSelector.current.files.length > 0) {
        const uri = URL.createObjectURL(imgSelector.current.files[0])
        profileImage.current.src = uri
      } else {
        profileImage.current.src = image ?? ""
      }
    }
  }, [formik.values.photo])
  
  return (
    <form
    className="flex flex-col gap-2"
    onSubmit={formik.handleSubmit}
    >
        <p className="text-sm">Blog thumbnail</p>
        {
          formik.values.photo &&
          <Image
            src=""
            alt=""
            className="rounded-full w-44 h-44"
            width={150}
            height={150}
            ref={profileImage}
          />
        }
        <input
          type="file"
          ref={imgSelector}
          onChange={formik.handleChange}
          id="photo"
          name="photo"
          accept="image/*"
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
          Upload Image
        </Button>
    </form>
  );
}
 
export default ImageUpload;