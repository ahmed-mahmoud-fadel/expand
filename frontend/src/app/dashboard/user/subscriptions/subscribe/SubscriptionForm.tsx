"use client"

import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PricingPlan from "@/types/PricingPlan";
import Solution from "@/types/Solution";
import subscribe from "@/actions/subscribe";
import { useFormik } from "formik";
import * as yup from 'yup'

const SubscriptionForm = ({
  jwt,
  plans,
  solutions,
  id,
}: {
  jwt: string,
  plans: PricingPlan[],
  solutions: Solution[],
  id: string,
}) => {
  const formik = useFormik({
    initialValues: {
      solutionId: "",
      pricingPlanId: "",
    },
    onSubmit: async (values) => {
      const response = await subscribe(
        id,
        values.solutionId,
        values.pricingPlanId,
        jwt
      )

      if (response.success) location.assign("/dashboard/user/subscriptions")
      else alert(response.message)
    },
    validationSchema: yup.object({
      solutionId: yup.string().required().trim(),
      pricingPlanId: yup.string().required().trim(),
    })
  })

  return (
    <form
    onSubmit={formik.handleSubmit}
    className="flex flex-col gap-3 flex-1"
    >
      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="border-r p-2">
          <h2>Choose a solution</h2>
          {
            solutions.length <= 0 &&
            "No solutions found."
          }
          {
            solutions.length > 0 &&
            <RadioGroup
            required
            name="solutionId"
            id="solutionId"
            className="flex flex-col gap-10"
            onValueChange={(e) => {
              formik.setValues({
                ...formik.values,
                solutionId: e
              })
            }}
            >
              {
                solutions.map(solution => (
                  <div className="flex gap-2 items-center" key={solution._id}>
                    <RadioGroupItem
                    value={solution._id}
                    id={solution._id}
                    />
                    <Label htmlFor={solution._id}>
                      <p  className="text-lg">{solution.name}</p>
                      <p>{solution.description}</p>
                    </Label>
                  </div>
                ))
              }
            </RadioGroup>
          }
        </div>
        

        <div className="p-2">
          <h2>Choose a pricing plan</h2>
          {
            plans.length <= 0 &&
            "No pricing plans found."
          }
          {
            plans.length > 0 &&
            <RadioGroup
            required
            name="pricingPlanId"
            id="pricingPlanId"
            className="flex flex-col gap-10"
            onValueChange={(e) => {
              formik.setValues({
                ...formik.values,
                pricingPlanId: e
              })
            }}
            >
              {
                plans.map(plan => (
                  <div className="flex gap-2 items-center" key={plan._id}>
                    <RadioGroupItem
                    value={plan._id}
                    id={plan._id}
                    />
                    <Label htmlFor={plan._id}>
                      <div className="text-lg flex items-center gap-10">
                        <p>{plan.title} - {plan.pricing}$</p>
                        {
                          plan.sale > 0 &&
                          <Badge className="text-white">
                            {plan.sale * 100}% off
                          </Badge>
                        }
                      </div>
                      <p>{plan.description}</p>
                    </Label>
                  </div>
                ))
              }
            </RadioGroup>
          }
        </div>
      </div>
      <div className="flex justify-between">
        <BackButton />
        <Button type="submit" className="text-white">
          Proceed to Checkout
        </Button>
      </div>
    </form>
  );
}
 
export default SubscriptionForm;