import PricingPlanForm from "../Form";

const NewPricingPlan = () => {
  return (
    <main className="flex flex-col gap-4">
      <p className="text-lg font-bold">New plan</p>
      <PricingPlanForm />
    </main>
  );
}
 
export default NewPricingPlan;