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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";
import CategorySelectForm from "./CategorySelectFrom";
interface propsType {
  productId: string;
  initialData: Product;
  category: Category[];
}
type propertyProps = {
  id: string;
  name: string;
  value: string[];
};

const CategoryForm = ({ initialData, productId, category }: propsType) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialData.categoryId || null
  );
  const [productProperty, setProductProperty] = useState<{
    [name: string]: string;
  }>({});
  const selectedCategoryName =
    selectedCategory && category.find((cat) => cat.id === selectedCategory);
  useEffect(() => {
    setProductProperty({
      ...(initialData.dynamicProperties as Record<string, string>),
    });
  }, [initialData]);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const formSchema = z.object({
    categoryId: z.string().min(1, { message: "Select a category" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        categoryId: values.categoryId,
        productProperty,
      };
      await axios.patch(`/api/create/${productId}/properties`, data);
      toast.success("Category created");
      form.reset();
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  let propertiesFill: propertyProps[] = [];
  if (initialData.categoryId) {
    let categoryData: any = category.find(({ id }) => id === selectedCategory);
    if (categoryData) {
      propertiesFill.push(...categoryData.properties);

      while (categoryData.parentId) {
        const parentIdData:any = category.find(
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
    <div className="mt-6 themes border bg-slate-100 rounded-md p-4">
      {initialData.categoryId ? (
        <>
          <div className="font-medium items-center flex justify-between">
            Category name
            <Button variant={"ghost"} onClick={toggleEdit}>
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit name
                </>
              )}
            </Button>
          </div>
          {!isEditing && (
            <p className="text-sm mt-2 font-semibold">
              {selectedCategoryName ? (
                <span className="text-lg font-semibold">
                  {selectedCategoryName.name}
                </span>
              ) : (
                "Select a Category "
              )}
              {Object.entries(
                initialData.dynamicProperties as Record<string, string>
              ).map(([propertyName, propertyValue]) => (
                <div key={propertyName} className="flex items-center text-lg">
                  {propertyName} = {propertyValue}
                </div>
              ))}
            </p>
          )}
          {isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
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
                            <SelectItem value={data.id}>{data.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  {propertiesFill.map(
                    (property: {
                      id: string;
                      name: string;
                      value: string[];
                    }) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-3 mt-3"
                      >
                        <p className="p-2 rounded-md bg-white text-md font-semibold themes">
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
                            {property.value.map(
                              (value: string, index: number) => (
                                <SelectItem key={index} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  )}
                </div>

                <Button disabled={!isValid || isSubmitting}>Select</Button>
              </form>
            </Form>
          )}
        </>
      ) : (
        <CategorySelectForm category={category} productId={productId} />
      )}
    </div>
  );
};

export default CategoryForm;
