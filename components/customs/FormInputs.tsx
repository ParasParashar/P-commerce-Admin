"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const FormInput = () => {
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Product Name should be atleast 3 chracters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await axios.post("/api/create", values);
    router.push(`/create/${res.data.id}`);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold line-clamp-1">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Enter your Product Name"
                    {...field}
                    className="text-gray-900 dark:text-white"
                  />
                </FormControl>
                <FormDescription>You can edit it later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormInput;
