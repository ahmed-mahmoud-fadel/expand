"use client"

import cancelSubscription from "@/actions/cancelSubscription";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const CancelSubscriptionButton = ({
  userId,
  jwt,
  subscriptionId,
}: {
  userId: string,
  jwt: string,
  subscriptionId: string,
}) => {
  const router = useRouter()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2"
        >
          Cancel Subscription
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-2">
        Are you sure?
        <Button
          className="text-white"
          variant="destructive"
          onClick={async () => {
            const response = await cancelSubscription(userId, jwt, subscriptionId)

            if (response.success) {
              router.refresh()
            } else {
              alert(response.message)
            }
          }}
        >
          Cancel Subscription
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default CancelSubscriptionButton;

