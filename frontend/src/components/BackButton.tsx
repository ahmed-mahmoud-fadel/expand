"use client"

import { FaChevronLeft } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter()

  return (
    <Button
    className="flex items-center gap-2"
    onClick={() => history.back()}
    variant="ghost"
    type="button"
    >
      <FaChevronLeft />
      Back
    </Button>
  );
}
 
export default BackButton;