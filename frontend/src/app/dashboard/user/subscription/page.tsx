import { Button } from "@/components/ui/button";

const Subscription = () => {
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col gap-10 flex-1">
        <p className="text-lg font-bold">
          My Subscription
        </p>
        <div>
          <p className="font-bold">Solution</p>
          <p>Footware</p>
        </div>
        <div>
          <p className="font-bold">Status</p>
          <p>Active</p>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="font-bold">Start Date</p>
            <p>09-Oct-2020</p>
          </div>
          <div>
            <p className="font-bold">Next Payment</p>
            <p>23-Mar-2020</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="font-bold">Price</p>
            <p>705.3$</p>
          </div>
          <div>
            <p className="font-bold">Period</p>
            <p>Monthly</p>
          </div>
          <div>
            <p className="font-bold">Auto Renew</p>
            <p>True</p>
          </div>
        </div>
      </div>
      <Button variant="destructive" className="w-max">Cancel Subscription</Button>
    </main>
  );
}
 
export default Subscription;