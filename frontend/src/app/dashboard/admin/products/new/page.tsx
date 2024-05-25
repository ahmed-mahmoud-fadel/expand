import { cookies } from "next/headers";
import SolutionForm from "../Form";

const NewSolutionPage = () => {
  const jwt = cookies().get('jwt')
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">New product</p>
      <SolutionForm
      jwt={jwt?.value ?? ''}
      />
    </main>
  );
}
 
export default NewSolutionPage;