import BackButton from "@/components/BackButton";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import endpoints from "@/global/endpoints";
import fetchWithError from "@/global/fetchWithError";
import Message from "@/types/Message";
import { cookies } from "next/headers";

const MessagePage = async ({
  params
}: {
  params: any
}) => {
  const jwt = cookies().get('jwt')

  const [message, error] = await fetchWithError(
    `${endpoints.messages}/${params.id}`,
    {
      next: {
        revalidate: 0
      },
      headers: {
        "Authorization": `Bearer ${jwt?.value}`
      }
    }
  ) as [Message, any]

  return (
    <main className="flex flex-col h-full gap-5">
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !error && message &&
        <>
        <div className="flex flex-col gap-6 flex-1">
          <p className="text-xl font-semibold">
            Name: {message.name}
          </p>
          <p className="text-lg">
            Recieved on: {new Date(message.createdAt).toDateString()}
          </p>
          <div>
            <p className="font-semibold">Email</p>
            <p>{message.email}</p>
          </div>
          {/* <div>
          <p className="font-semibold">Occupation</p>
          <p>{message.sender.occupation}</p>
        </div> */}
          {/* <div>
          <p className="font-semibold">Phone number</p>
          <p>{message.sender.phoneNumber}</p>
        </div> */}
          <div>
            <p className="font-semibold">Message</p>
            <p>{message.message}</p>
          </div>
        </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="description">Reply</label>
              <Textarea
                id="reply"
                name="reply"
                placeholder="Reply"
                rows={10}
              />
            </div>
            <div className="flex justify-between">
              <BackButton />
              <Button
                className="text-white"
                type="submit"
              >
                Reply
              </Button>
            </div>
          </form>
        </>
      }

    </main>
  );
}

export default MessagePage;