import { cookies } from "next/headers";
import PricingPlanForm from "../Form";
import fetchWithError from "@/global/fetchWithError";
import endpoints from "@/global/endpoints";
import ErrorMessage from "@/components/ErrorMessage";

const EditPricingPlan = async ({
  params,
}: {
  params: any,
}) => {
  const jwt = cookies().get('jwt')

  const [plan, error] = await fetchWithError(`${endpoints.plans}/${params.id}`, {
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    },
    next: {
      revalidate: 0
    }
  })

  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit plan</p>
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !error && plan &&
        <PricingPlanForm
        jwt={jwt?.value ?? ''}
        plan={plan}
        />
      }
    </main>
  );
}
 
export default EditPricingPlan;