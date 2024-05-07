import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Subscription from "@/types/Subscription";
import { cookies } from "next/headers";
import Link from "next/link";

const SubscriptionPage = async () => {
  const jwt = cookies().get('jwt')
  const id = cookies().get('id')
  const [subscriptions, error] = await fetchWithError(`${endpoints.subscriptions}/user/${id?.value}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col gap-10 flex-1">
        <p className="text-lg font-bold">
          My Subscriptions
        </p>
        {
          error && <ErrorMessage message={error.message} />
        }
        {
          !error && subscriptions && subscriptions.length <= 0 &&
          "Not subscribed yet."
        }
        {
          !error && subscriptions && subscriptions.length > 0 &&
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pricing Plan</TableHead>
                <TableHead>Solution</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Creation Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
              subscriptions.map((subscription: Subscription, n: number) => {
                return (
                  <TableRow key={subscription._id}>
                    <TableCell>
                      {subscription.pricingPlans?.title}
                    </TableCell>
                    <TableCell>
                      {subscription.solution?.name}
                    </TableCell>
                    <TableCell>
                      {subscription.status}
                    </TableCell>
                    <TableCell>
                      {new Date(subscription.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(subscription.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      {
                        subscription.status !== 'canceled' &&
                        <CancelSubscriptionButton
                        userId={id?.value ?? ""}
                        jwt={jwt?.value ?? ""}
                        subscriptionId={subscription._id}
                      />
                      }
                      {
                        subscription.status === 'canceled' &&
                        "No actions available."
                      }
                      
                    </TableCell>
                  </TableRow>
                )
              })
            }
            </TableBody>
          </Table>
        }
      </div>
      <Link href='/dashboard/user/subscriptions/subscribe' className="w-max">
        <Button className="text-white">
          Subscribe
        </Button>
      </Link>
    </main>
  );
}

export default SubscriptionPage;