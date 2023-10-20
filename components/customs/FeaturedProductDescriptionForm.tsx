"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FeaturedProducts } from "@prisma/client";
import { Textarea } from "../ui/textarea";
interface propsType {
  productId: string;
  initialData: string;
}
const FeaturedProductDescriptionForm = ({ initialData, productId }: propsType) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const formSchema = z.object({
    specialDescription: z.string().min(1, { message: "Featured description is required" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
        specialDescription: initialData || "" 
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/featuredProduct/${productId}`, values);
      toast.success("Featured Product updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  return (
    <div className="themes border bg-gray-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Featured description
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
             {initialData?'Edit descriptoin':'Create description'} 
            </>
          )}
        </Button>
      </div>
     
      {!isEditing && <p className="text-sm mt-2 font-semibold">
        {initialData?initialData :(
            <div className="text-center mr-0">
            <p className="italic">Create featured Description</p>
            <p className="text-xs text-fuchsia-600">After creating featured description It's automatically convert's to featurd collection.</p>
            </div>
        )}
        </p>}
      {isEditing && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="specialDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        autoComplete="off"
                        placeholder="e.g. Explore the best mid range phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default FeaturedProductDescriptionForm;
