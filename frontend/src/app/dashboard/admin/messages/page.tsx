import DeleteButton from "@/components/DeleteButton"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"
import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"
import Message from "@/types/Message"
import { cookies } from "next/headers"
import Link from "next/link"

const Messages = async ({
  searchParams
}: {
  searchParams: any,
}) => {
  const page = searchParams?.page ?? 1

  const jwt = cookies().get("jwt")

  const [data, error] = await fetchWithError(`${endpoints.messages}/messages?page=${page}&limit=10`, {
    next: {
      revalidate: 0
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`,
    }
  })

  let messages, last

  if (!error) {
    messages = data.messages
    last = data.totalPages
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="text-lg font-bold">Messages</p>
      {
        error &&
        <p className="text-red-600 font-bold text-nowrap">
          {error?.message ?? error.toString()}
        </p>
      }
      {
        !error && messages && messages.length <= 0 &&
        "No messages found."
      }
      {
        !error && messages && messages.length > 0 &&
        <>
        <div className="overflow-y-scroll h-3/4">
          {
            messages.slice(0, 10).map((message: Message) => (
              <div className="flex items-center justify-between border-b p-4" key={message._id}>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold">
                    {message.name}
                  </p>
                  <p className="text-sm">{message.email}</p>
                  <p className="text-sm">Recieved at: {new Date(message.createdAt).toDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <Link href={`/dashboard/admin/messages/${message._id}`}>
                    <Button
                    className="text-white"
                    >
                      Read
                    </Button>
                  </Link>
                  <DeleteButton
                  id={message._id}
                  item="messages"
                  jwt={jwt?.value ?? ""}
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-end">
          <Pagination
          handle="/dashboard/admin/messages"
          last={last}
          searchParams={searchParams}
          />
        </div>
        </>
      }
    </div>
  )
}

export default Messages