'use client'

import addEntity from "@/actions/addEntity";
import editEntity from "@/actions/editEntity";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PricingPlan from "@/types/PricingPlan";
import { useFormik } from "formik";

const PricingPlanForm = ({
  plan,
  jwt,
}: {
  plan?: PricingPlan,
  jwt: string,
}) => {
  const formik = useFormik({
    initialValues: {
      title: plan?.title ?? "",
      pricing: plan?.pricing ?? 0,
      sale: plan?.sale ?? 0,
      description: plan?.description ?? "",
    },
    onSubmit: async (values) => {
      let response
      if (plan) {
        response = await editEntity(
          "plans",
          plan._id,
          values,
          jwt,
        )
      } else {
        response = await addEntity(
          "plans",
          values,
          jwt,
        )
      }

      if (response.success) location.assign('/dashboard/admin/pricing-plans')
    }
  })

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col w-80">
        <label htmlFor="title">Plan name</label>
        <Input
          id="title"
          name="title"
          placeholder="Plan name"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col w-80">
        <label htmlFor="pricing">Price</label>
        <Input
          type="number"
          id="pricing"
          name="pricing"
          placeholder="Price"
          value={formik.values.pricing}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col w-80">
        <label htmlFor="sale">Sale</label>
        <Input
          id="sale"
          name="sale"
          placeholder="Sale"
          type="number"
          value={formik.values.sale}
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
          value={formik.values.description}
          onChange={formik.handleChange}
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
  );
}

export default PricingPlanForm;