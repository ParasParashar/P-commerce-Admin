'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import ConfirmModel from "../Models/ConfirmModel";

type props ={
    productId:string;
    isCompleted:boolean | null;
    disabled:boolean;
}
const ProductActionButton = ({isCompleted,disabled,productId}:props) => {
    const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const onClick = async () => {
    try {
    setIsloading(true);
    if (isCompleted) {
      await axios.patch(`/api/create/${productId}/unpublish`);
      toast.success("Product Un-Published");
    } else {
      await axios.patch(`/api/create/${productId}/publish`);
      toast.success("Product Published 👍");
    }
    router.refresh();
  } catch (error) {
    toast.error("Something went wrong !!");
  } finally {
    setIsloading(false);
  }
};

const onDelete = async () => {
  try {
    setIsloading(true);
    await axios.delete(`/api/create/${productId}`);
    toast.success("Product Deleted");
    router.refresh();
    router.push('/');
  } catch (error) {
    toast.error("Something went wrong !!");
  } finally {
    setIsloading(false);
  }
};
  return (
    <div className="flex  items-center flex-wrap gap-x-2">
       <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant='outline'
        size="sm"
        className="bg-sky-200"
      >
        {isCompleted ? "Unpublish Product❌" : "Publish Product🛒"}
      </Button>
      <ConfirmModel onConfirm={onDelete}>
        <Button className="ml-auto" size={"sm"} variant="destructive" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
        </ConfirmModel>
    </div>
  )
}

export default ProductActionButton
