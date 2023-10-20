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
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
interface propsType {
  initialData: Category[];
}
const CategoryCreation = ({ initialData }: propsType) => {
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    parentId: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:  "",
      parentId: null  ||'',
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/categories`, values);
      toast.success("Category created");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };
  return (
    <div className="mt-6 themes border bg-slate-100 rounded-md p-4">
      <div className="font-medium items-center flex justify-between">
        Category name
      </div>

      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      autoComplete="off"
                      placeholder="e.g  'Mobiles'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Parent category  e.g 'Electronics'" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      
                    {initialData.map((data)=>(
                        <SelectItem key={data.id} value={data.id}>
                        {data.name}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CategoryCreation;
