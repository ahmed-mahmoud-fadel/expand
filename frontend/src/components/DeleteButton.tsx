"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaTrash } from "react-icons/fa";
import deleteItem from "@/actions/deleteItem";
import { useRouter } from "next/navigation";

const DeleteButton = ({
  item,
  id,
  jwt,
}: {
  item: string,
  id: string,
  jwt: string,
}) => {
  const router = useRouter()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
          >
            <FaTrash />
            Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-2">
          Are you sure?
          <Button
            variant="destructive"
            onClick={async () => {
              const repsonse = await deleteItem(
                item, id, jwt,
                "",
              )
              
              if (repsonse.success) router.refresh()
              else window.alert(repsonse.message)
            }}
          >
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DeleteButton;