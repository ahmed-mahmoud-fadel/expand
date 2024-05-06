'use client'

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import BlogPost from "@/types/BlogPost";
import { useFormik } from "formik";
import ImageUpload from "./ImageUpload";
import editEntity from "@/actions/editEntity";
import addEntity from "@/actions/addEntity";
import LabelledInput from "@/components/LabelledInput";
import { Checkbox } from "@/components/ui/checkbox";

const BlogForm = ({
  blog,
  jwt,
}: {
  blog?: BlogPost,
  jwt: string,
}) => {
  const formik = useFormik({
    initialValues: {
      title: blog?.title ?? "",
      description: blog?.description ?? "",
      active: blog?.active ?? true,
    },
    onSubmit: async (values) => {
      let response
      if (blog) {
        response = await editEntity(
          "posts",
          blog._id,
          {
            ...values,
            link: `/blog/${blog._id}`
          },
          jwt,
        )
      } else {
        response = await addEntity(
          "posts",
          values,
          jwt,
        )
      }

      if (response.success) location.assign("/dashboard/admin/blog-management")
      else alert(response.message)
    }
  })

  return (
    <div className="flex flex-col h-full">
      {
        blog && 
        <ImageUpload
        id={blog._id}
        jwt={jwt}
        image={blog.thumbnail}
        />
      }
    <form
      className="flex flex-col h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex-1 gap-4 flex flex-col">
        <LabelledInput
        formik={formik}
        id="title"
        label="Blog title"
        placeholder="Blog title"
        />
        <div className="flex gap-2 items-center">
          <Checkbox
          id="active"
          name="active"
          checked={formik.values.active}
          onCheckedChange={() => {
            formik.setValues((values) => {
              return {
                ...values,
                active: !values.active,
              }
            })
          }}
          />
          <label htmlFor="active">Active</label>
        </div>
        <LabelledInput
        formik={formik}
        id="description"
        label="Blog content"
        placeholder="Blog content"
        isTextarea
        rows={10}
        />
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

export default BlogForm;