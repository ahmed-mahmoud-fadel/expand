import DeleteButton from "@/components/DeleteButton";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Solution from "@/types/Solution";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const Solutions = async () => {
  const cookieStore = cookies()
  const jwt = cookieStore.get("jwt")

  const [solutions, error] = await fetchWithError(`${endpoints.solutions}/admin`, {
    next: {
      revalidate: 0
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })
  
  return (
    <main className="flex flex-col gap-5 h-full">
      <p className="font-bold text-lg">Solutions</p>
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !error && solutions &&
        <>
          {
            solutions.length === 0 &&
            "No solutions found."
          }
          {
            solutions.length > 0 &&
            <div className="overflow-y-scroll h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Solution name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    solutions.map((solution: Solution, n: number) => (
                      <TableRow key={solution._id}>
                        <TableCell>{n + 1}</TableCell>
                        <TableCell>{solution.name}</TableCell>
                        <TableCell>{solution.description}</TableCell>
                        <TableCell>
                          <Link
                            href={`/dashboard/admin/solutions/${solution._id}`}
                            className="text-primary"
                          >
                            Edit
                          </Link>
                        </TableCell>
                        <TableCell>
                          <DeleteButton
                          id={solution._id}
                          jwt={jwt?.value ?? ""}
                          item="solutions"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>

          }
          <Link
            href="/dashboard/admin/solutions/new"
            className="w-max"
          >
            <Button className="w-max text-white flex items-center gap-2">
              <FaPlus />
              Add new solution
            </Button>
          </Link>
        </>
      }
    </main>
  );
}

export default Solutions;