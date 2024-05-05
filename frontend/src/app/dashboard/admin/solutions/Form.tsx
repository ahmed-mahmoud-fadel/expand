import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Solution from "@/types/Solution";

const SolutionForm = async ({
  id,
}: {
  id?: number,
}) => {
  let solution: Solution | null = null, error: any = null
  if (id) {
    const [data, err] = await fetchWithError(
      `${endpoints.solutions}/${id}`,
      {
        next: {
          revalidate: 0
        }
      }
    )
    solution = data
    error = err
  }

  return (
    <form
      className="flex flex-col gap-4 h-full"
    >
      {
        error &&
        <p className="text-red-600 font-bold">
          {error.message}
        </p>
      }
      {
        !error &&
        <>
          <div className="flex-1 flex flex-col  gap-5">
            <div className="flex flex-col w-80">
              <label htmlFor="name">Solution name</label>
              <Input
                id="name"
                name="name"
                placeholder="Plan name"
                value={solution?.name}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                rows={10}
                value={solution?.description}
              />
            </div>
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

export default SolutionForm;