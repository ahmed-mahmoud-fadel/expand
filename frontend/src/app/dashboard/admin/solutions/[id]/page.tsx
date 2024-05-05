import SolutionForm from "../Form";

const EditSolutionPage = ({
  params
}: {
  params: any
}) => {
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit plan</p>
      <SolutionForm id={parseInt(params.id)} />
    </main>
  );
}
 
export default EditSolutionPage;