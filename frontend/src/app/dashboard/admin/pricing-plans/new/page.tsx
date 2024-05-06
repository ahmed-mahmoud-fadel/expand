import { cookies } from "next/headers";
import PricingPlanForm from "../Form";

const NewPricingPlan = () => {
  const jwt = cookies().get('jwt')
  return (
    <main className="flex flex-col gap-4">
      <p className="text-lg font-bold">New plan</p>
      <PricingPlanForm
      jwt={jwt?.value ?? ""}
      />
    </main>
  );
}
 
export default NewPricingPlan;