'use client'

import addEntity from "@/actions/addEntity";
import editEntity from "@/actions/editEntity";
import BackButton from "@/components/BackButton";
import LabelledInput from "@/components/LabelledInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Product from "@/types/Product";
import { useFormik } from "formik";
import ImageUpload from "./ImageUpload";
import ModelUpload from "./ModelUpload";

const ProductForm = ({
  product,
  jwt,
}: {
  product?: Product,
  jwt: string,
}) => {
  const formik = useFormik({
    initialValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      category: product?.category ?? "",
      vendor: product?.vendor ?? "",
      status: product?.status ?? "active",
      link: product?.link ?? "",
    },
    onSubmit: async (values) => {
      let response: any
      if (product) {
        response = await editEntity(
          "products",
          product._id,
          values,
          jwt,
        )
      } else {
        response = await addEntity(
          "products",
          values,
          jwt,
        )
      }

      if (response.success) location.assign("/dashboard/admin/products" + (response.entity ? `/${response.entity._id}`: ""))
      else window.alert(response.message)
    }
  })

  return (
    <div className="flex flex-col h-full">
      {
        product &&
        <div className="flex gap-24 items-center mb-10">
        <ImageUpload
        id={product._id}
        jwt={jwt}
        image={product.thumbnail}
        />
        <ModelUpload
        id={product._id}
        jwt={jwt}
        model={product.model}
        />
        </div>
      }
    <form
      className="flex flex-col h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex-1 gap-4 flex flex-col">
        <LabelledInput
          placeholder="Product name"
          label="Product name"
          formik={formik}
          id="title"
        />
        <LabelledInput
          placeholder="Product description"
          label="Product description"
          formik={formik}
          id="description"
        />
        <LabelledInput
          placeholder="Product category"
          label="Product category"
          formik={formik}
          id="category"
        />
        <LabelledInput
          placeholder="Product vendor"
          label="Product vendor"
          formik={formik}
          id="vendor"
        />
        <LabelledInput
          placeholder="Product link"
          label="Product link"
          formik={formik}
          id="link"
        />
        <RadioGroup
          value={formik.values.status}
          onValueChange={(e) => {
            formik.setValues({
              ...formik.values,
              status: e
            })
          }}
          id="status"
          className="flex gap-10"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="pending" />
            <Label htmlFor="pending">Pending</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <BackButton />
        <Button
          type="submit"
          className="text-white"
        >
          Save
        </Button>
      </div>
    </form>
    </div>
  );
}

export default ProductForm;