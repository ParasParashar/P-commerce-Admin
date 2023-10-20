"use client";
import {
  Form,
  FormControl,
  Formprice,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
interface propsType {
  productId: string;
  initialData: Product;
}
const Price = ({ initialData, productId }: propsType) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const formSchema = z.object({
    price: z.coerce.number().min(1, { message: "Price is required" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/create/${productId}`, values);
      toast.success("Product updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  return (
    <div className="mt-6 themes border bg-slate-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Product price
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 font-semibold">
          {initialData.price ? (
            initialData.price
          ) : (
            <p className="italic">Give price to product.</p>
          )}
        </p>
      )}
      {isEditing && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        autoComplete="off"
                        placeholder="e.g. Asus Mobile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  save
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default Price;
