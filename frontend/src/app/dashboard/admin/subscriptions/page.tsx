import CancelSubscriptionButton from "@/components/CancelSubscriptionButton"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"
import Subscription from "@/types/Subscription"
import { cookies } from "next/headers"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

const Subscriptions = async ({
  searchParams
}: {
  searchParams: any
}) => {
  const jwt = cookies().get('jwt')
  const id = cookies().get('id')

  const page = searchParams?.page ?? 1
  const [data, error] = await fetchWithError(`${endpoints.subscriptions}/admin?page=${page}&limit=10`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  let subscriptions, last

  if (!error) {
    subscriptions = data.subscriptions
    last = data.totalPages
  }

  return (
    <main className="flex flex-col gap-5 h-full">
      <p className="text-lg font-bold">Subscriptions</p>
      {
        error &&
        <div className="text-red-600 font-bold">
          {error.message}
        </div>
      }
      {
        !error && subscriptions && subscriptions.length <= 0 &&
        "No subscriptions."
      }
      {
        !error && subscriptions && subscriptions.length > 0 &&
        <>
        <div className="h-3/4 overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>
                User Email
              </TableHead>
              <TableHead>
                Solution
              </TableHead>
              <TableHead>
                Pricing Plan
              </TableHead>
              <TableHead>
                Start date
              </TableHead>
              <TableHead>
                End Date
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead>
                Auto renew
              </TableHead>
              <TableHead>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              subscriptions.map((subscription: Subscription, n: number) => (
                <TableRow key={subscription._id}>
                  <TableCell>{(page - 1) * 10 + n + 1}</TableCell>
                  <TableCell>{subscription.user?.companyName}</TableCell>
                  <TableCell>{subscription.user?.email}</TableCell>
                  <TableCell>{subscription.solution?.name}</TableCell>
                  <TableCell>{subscription.pricingPlans?.title}</TableCell>
                  <TableCell>{new Date(subscription.createdAt).toDateString()}</TableCell>
                  <TableCell>{new Date(subscription.endDate).toDateString()}</TableCell>
                  <TableCell>{subscription.status}</TableCell>
                  <TableCell>
                    {
                      subscription.autoRenew ?
                      <FaCheck className="text-primary" /> :
                      <FaX className="text-red-600"/>
                    }
                  </TableCell>
                  <TableCell>
                    {
                      subscription.status !== 'canceled' &&
                      <CancelSubscriptionButton
                      userId={id?.value ?? ""}
                      subscriptionId={subscription._id}
                      jwt={jwt?.value ?? ""}
                      />
                    }
                    {
                      subscription.status === 'canceled' &&
                      "No available actions."
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        </div>
        <div className="flex justify-end">
          <Pagination
          handle="/dashboard/admin/subscriptions"
          last={last}
          searchParams={searchParams}
          />
        </div>
        </>
      }
    </main>
  );
}

export default Subscriptions;