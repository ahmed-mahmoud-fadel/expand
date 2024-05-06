import DeleteButton from "@/components/DeleteButton"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"
import PricingPlan from "@/types/PricingPlan"
import { cookies } from "next/headers"
import Link from "next/link"
import { FaPlus } from "react-icons/fa"

const PricingPlans = async () => {
  const jwt = cookies().get('jwt')

  const [plans, error] = await fetchWithError(`${endpoints.plans}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  return (
    <main className="flex flex-col gap-5">
      <p className="text-lg font-bold">Pricing Plans</p>
      {
        error &&
        <p className="text-red-600 font-bold text-nowrap">
          {error?.message ?? error.toString()}
        </p>
      }
      {
        !error && plans &&
        <>
        {
          plans.length === 0 &&
          "No plans found."
        }
          {
            plans.length > 0 &&
            <div className="h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      ID
                    </TableHead>
                    <TableHead>
                      Name
                    </TableHead>
                    <TableHead>
                      Description
                    </TableHead>
                    <TableHead>
                      Pricing
                    </TableHead>
                    <TableHead>
                      Sale
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    plans.map((plan: PricingPlan, n:number) => (
                      <TableRow key={plan._id}>
                        <TableCell>{n + 1}</TableCell>
                        <TableCell>{plan.title}</TableCell>
                        <TableCell>{plan.description}</TableCell>
                        <TableCell>{plan.pricing}$</TableCell>
                        <TableCell>{(plan.sale * 100).toFixed()}%</TableCell>
                        <TableCell>
                          <Link href={`/dashboard/admin/pricing-plans/${plan._id}`}>
                            <Button
                              variant="ghost"
                              className="text-primary"
                            >
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <DeleteButton
                          id={plan._id}
                          item="plans"
                          jwt={jwt?.value ?? ""}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>
          }
          <Link href="/dashboard/admin/pricing-plans/new">
            <Button className="text-white w-max flex gap-2 items-center">
              <FaPlus />
              Add new plan
            </Button>
          </Link>
        </>
      }
    </main>
  )
}

export default PricingPlans