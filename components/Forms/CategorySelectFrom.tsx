"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Category } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

type props = {
  productId: string;
  category: Category[]
  
}
const CategorySelectForm = ({ productId, category }: props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productProperty, setProductProperty] = useState<{
    [name: string]: string;
  }>({});

  const router = useRouter();
  const formSchema = z.object({
    categoryId: z.string().min(1, { message: "Select a category" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: null || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const data ={
            categoryId:values.categoryId,
            productProperty 
        }
      await axios.patch(`/api/create/${productId}/properties`, data);
      toast.success("Category created");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  let propertiesFill: any[] = [];
  if (category) {
    let categoryData = category.find(({ id }) => id === selectedCategory);
    if (categoryData) {
      propertiesFill.push(...categoryData.properties);

      while (categoryData.parentId) {
        const parentIdData = category.find(
          ({ id }) => id === categoryData.parentId
        );
        if (parentIdData) {
          propertiesFill.push(...parentIdData.properties);
          categoryData = parentIdData;
        }
      }
    }
  }
  const handleProperty = (name: string, value: string) => {
    setProductProperty({
      ...productProperty,
      [name]: value,
    });
  };

  return (
    <div className="themes">
      <h4 className="font-medium">Select a Category for your product. </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryClick(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category  e.g 'Electronics'" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((data) => (
                      <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {propertiesFill.map(
              (property: { id: string; name: string; value: string[] }) => (
                <div key={property.id} className="flex items-center gap-3 mt-3">
                  <p className="p-2 rounded-md bg-white text-md font-semibold">
                    {property.name}
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleProperty(property.name, value)
                    }
                    defaultValue={productProperty[property.name] || ""}
                    value={productProperty[property.name]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a vaue eg "red"' />
                    </SelectTrigger>

                    <SelectContent>
                      {property.value.map((value: string, index: number) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            )}
          </div>

          <Button disabled={!isValid || isSubmitting}>Select</Button>
        </form>
      </Form>
    </div>
  );
};

export default CategorySelectForm;
