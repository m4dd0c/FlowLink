"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoginFormSchema } from "@/lib/schema/schema";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log("submitted", values);
  };

  return (
    <>
      <h1 className="text-2xl mb-8">Log in to your account.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g., user@address.tld"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="e.g., s7r0ngP@ssw0rd"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <small>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-orange-500">
              Sign up
            </Link>
          </small>
          <br />
          <Button className="my-1" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
