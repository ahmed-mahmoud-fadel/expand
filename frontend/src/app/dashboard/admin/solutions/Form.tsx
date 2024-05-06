'use client'

import addEntity from "@/actions/addEntity";
import editEntity from "@/actions/editEntity";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Solution from "@/types/Solution";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const SolutionForm = ({
  solution,
  jwt,
}: {
  solution?: Solution,
  jwt: string,
}) => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: solution?.name ?? "",
      description: solution?.description ?? "",
    },
    onSubmit: async (values) => {
      let response
      if (solution) {
        response = await editEntity(
          "solutions",
          solution._id,
          values,
          jwt
        )
      } else {
        response = await addEntity(
          "solutions",
          values,
          jwt
        )
      }

      if (response.success){
        location.assign('/dashboard/admin/solutions')
      }
      else window.alert(response.message)
    }
  })

  return (
    <form
      className="flex flex-col gap-4 h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex-1 flex flex-col  gap-5">
        <div className="flex flex-col w-80">
          <label htmlFor="name">Solution name</label>
          <Input
            id="name"
            name="name"
            placeholder="Solution name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            rows={10}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
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
  );
}

export default SolutionForm;