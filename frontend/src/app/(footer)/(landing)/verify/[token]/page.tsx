import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Link from "next/link";

const VerifyEmail = async ({
  params,
}: {
  params: {
    token: string,
  },
}) => {
  const [data, error] = await fetchWithError(`${endpoints.verify}?token=${params.token}`, {
    next: {
      revalidate: 0,
    },
  })

  return (
    <main className="flex items-center justify-center h-96 flex-col gap-4">
      { data && data.message }
      { error && error.message }
      <Link href='/' className="text-primary text-lg">Go Home</Link>
    </main>
  );
}
 
export default VerifyEmail;