import { cookies } from "next/headers";
import SubscriptionForm from "./SubscriptionForm";
import fetchWithError from "@/global/fetchWithError";
import endpoints from "@/global/endpoints";
import ErrorMessage from "@/components/ErrorMessage";

const Subscription = async () => {
  const jwt = cookies().get('jwt')
  const id = cookies().get('id')

  const [plans, plansError] = await fetchWithError(`${endpoints.plans}`, {
    next: {
      revalidate: 0,
    },
  })
  const [solutions, solutionsError] = await fetchWithError(`${endpoints.solutions}/active`, {
    next: {
      revalidate: 0,
    },
  })

  return (
    <main className="flex flex-col gap-3 h-full">
      <h1>Subscribe</h1>
      {
        plansError && <ErrorMessage message={plansError.message} />
      }
      {
        solutionsError && <ErrorMessage message={solutionsError.message} />
      }
      {
        !(plansError || solutionsError) &&
        <SubscriptionForm id={id?.value ?? ''} jwt={jwt?.value ?? ''} plans={plans} solutions={solutions} />
      }
    </main>
  );
}
 
export default Subscription;