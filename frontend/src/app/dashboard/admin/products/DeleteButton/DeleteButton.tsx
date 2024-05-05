"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DialogContent, DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import deleteItem from "./deleteItem";
import { useRouter } from "next/navigation";

const DeleteButton = ({
  item,
  id,
}: {
  item: string,
  id: string,
}) => {
  const [dialogText, setDialogText] = useState<string | null>(null)
  const router = useRouter()

  return (
    <>
      <Dialog open={dialogText !== null}>
        <DialogContent>
          <DialogHeader>An error occurred!</DialogHeader>
          <DialogDescription>
            {dialogText}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Popover>
        <PopoverTrigger>
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
            onClick={() => deleteItem(
              item, id,
              () => router.refresh(),
              (message) => setDialogText(message)
            )}
          >
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DeleteButton;