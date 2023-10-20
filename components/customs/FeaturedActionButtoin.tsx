'use client'

import { Star, Trash } from "lucide-react"
import { Button } from "../ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import ConfirmModel from "../Models/ConfirmModel";

type props={
  productId:string
}
const FeaturedActionButtoin = ({productId}:props) => {
    const router = useRouter();
    const deleteFeaturedCollection = async () => {
        try {
          await axios.delete(`/api/featuredProduct/${productId}`);
          router.refresh();
          toast.success("Featured Product Deleted");
        } catch (error) {
          toast.error("Something Went Wrong");
        }
      };
  return (
    <div className="flex  justify-between w-full ">
    <div className="flex items-center gap-x-2">
      <Star className="h-8 w-8 text-blue-800" />
      <h2 className="text-xl font-medium font-serif ">
        Featured Collection
      </h2>
    </div>
    <ConfirmModel onConfirm={deleteFeaturedCollection}>
    <Button size={'sm'} variant={"destructive"} >
      <Trash className="h-5 w-5 text-white" />
    </Button>
    </ConfirmModel>
  </div>
  )
}

export default FeaturedActionButtoin
