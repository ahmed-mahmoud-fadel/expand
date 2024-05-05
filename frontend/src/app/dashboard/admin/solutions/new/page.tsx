import SolutionForm from "../Form";

const NewSolutionPage = () => {
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">New plan</p>
      <SolutionForm />
    </main>
  );
}
 
export default NewSolutionPage;