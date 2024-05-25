import fetchWithError from "@/global/fetchWithError";
import ProductForm from "../Form";
import endpoints from "@/global/endpoints";
import { cookies, headers } from "next/headers";
import ErrorMessage from "@/components/ErrorMessage";

const EditProductPage = async ({
  params
}: {
  params: any
}) => {
  const jwt = cookies().get('jwt')
  const [product, error] = await fetchWithError(`${endpoints.products}/admin/${params.id}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })

  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit product</p>
      {error && <ErrorMessage message={error.message} />}
      {
        !error && product &&
        <ProductForm
        jwt={jwt?.value ?? ''}
        product={product}
        />
      }
    </main>
  );
}
 
export default EditProductPage;