"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/user.action";

interface accountProfileProps {
  user: {
    sellerName: string;
    companyName: string;
    email: string;
  };
}
const AccountProfile: React.FC<accountProfileProps> = ({ user }) => {
  const router = useRouter();

  const formSchema = z.object({
    sellerName: z.string().min(3, { message: "Seller Name is required" }),
    companyName: z.string().min(3, { message: "Company Name is required" }),
    email: z.string().min(3, { message: "email is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerName: user?.sellerName || "",
      companyName: user?.companyName || "",
      email: user?.email || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUser({
      sellerName: values.sellerName,
      companyName: values.companyName,
      email: values.email,
    });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="sellerName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Seller Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Company Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">email</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="bg-blue-500"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
