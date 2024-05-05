import PricingPlanForm from "../Form";

const EditPricingPlan = ({
  params,
}: {
  params: any,
}) => {
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit plan</p>
      <PricingPlanForm id={params.id} />
    </main>
  );
}
 
export default EditPricingPlan;