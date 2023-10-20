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
  FormField,
  FormItem,
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
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { MinusCircle, PlusCircle } from "lucide-react";
interface propsType {
  initialData: Category[];
}
const PropertyCreation = ({ initialData }: propsType) => {
  const router = useRouter();
  const [property, setProperty] = useState<
    Array<{ name: string; value: string }>
  >([{ name: "", value: "" }]);
  const formSchema = z.object({
    parentId: z.string().min(1, { message: "Select a category" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentId: null || "",
    },
  });
  const createProperty = () => {
    setProperty((prev: { name: string; value: string }[]) => [
      ...prev,
      { name: "", value: "" },
    ]);
  };

  const removeCategory = (indexToRemove: number) => {
    setProperty((prev) => prev.filter((p, index) => index !== indexToRemove));
  };

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        ...values,
        property: property.map((p) => ({
          name: p.name,
          value: p.value.split(","),
        })),
      };
      await axios.post(`/api/categories/properties`, data);
      toast.success("Category created");
      form.reset();
      setProperty([]);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  function updatePropertyName(index: number, newName: string) {
    setProperty((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function updatePropertyValue(index: number, newValue: string) {
    setProperty((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  }
  return (
    <div className="mt-6 themes border bg-slate-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Create Product Properties
      </div>

      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isSubmitting}>
                        <SelectValue placeholder="Select a category  e.g 'SmartPhones'" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {initialData.map((data) => (
                        <SelectItem
                          key={data.id}
                          aria-required
                          disabled={isSubmitting}
                          value={data.id}
                        >
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                className="flex items-center text-gray-600"
                type="button"
                variant={"outline"}
                onClick={createProperty}
              >
                <PlusCircle className="h-5 w-5 text-blue-500 " />
                Add More Property
              </Button>
            </div>
            <div>
              {property.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center flex-wrap gap-2 mt-2"
                >
                  <div className="flex gap-2 w-full flex-wrap relative">
                    <Input
                      disabled={isSubmitting}
                      autoComplete="off"
                      required
                      placeholder="e.g Name= 'Ram'"
                      value={property.name}
                      onChange={(e) =>
                        updatePropertyName(index, e.target.value)
                      }
                    />
                    <Input
                      disabled={isSubmitting}
                      autoComplete="off"
                      required
                      placeholder="e.g  Value= '8GB' , '16GB' , '32GB' "
                      value={property.value}
                      onChange={(e) =>
                        updatePropertyValue(index, e.target.value)
                      }
                    />
                    <span className="text-xs text-center text-fuchsia-700">
                      You can add multiple values at the same time & use
                      &#39;,&#39; to add multiple value at the same time.
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => removeCategory(index)}
                  >
                    <MinusCircle className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default PropertyCreation;
