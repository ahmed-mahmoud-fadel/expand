import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import PricingPlan from "@/types/PricingPlan";

const PricingPlanForm = async ({
  id,
}: {
  id?: number,
}) => {
  let plan: PricingPlan | null = null, error: any = null
  if (id) {
    const [data, err] = await fetchWithError(
      `${endpoints.plans}/${id}`,
      {
        next: {
          revalidate: 0
        }
      }
    )
    plan = data
    error = err
  }

  return (
    <form className="flex flex-col gap-5">
      {
        error &&
        <p className="text-red-600 font-bold">
          {error.message}
        </p>
      }
      {
        !error &&
        <>
          <div className="flex flex-col w-80">
            <label htmlFor="name">Plan name</label>
            <Input
              id="name"
              name="name"
              placeholder="Plan name"
              value={plan?.name}
            />
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="pricing">Price</label>
            <Input
              type="number"
              id="pricing"
              name="pricing"
              placeholder="Price"
              value={plan?.pricing}
            />
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="sale">Sale</label>
            <Input
              id="sale"
              name="sale"
              placeholder="Sale"
              value={plan?.sale ?? 0 * 100}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              rows={10}
              value={plan?.description}
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
        </>
      }
    </form>
  );
}

export default PricingPlanForm;