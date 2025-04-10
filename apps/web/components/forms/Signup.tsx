"use client";
import React from "react";
import axios from "axios";
import {
  Form,
  FormControl,
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
import { SignupFormSchema } from "@/lib/schema/schema";
import { useSignupMutation } from "@/store/api/user";

const SignupForm = () => {
  const [trigger] = useSignupMutation();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    try {
      const res = await trigger(values).unwrap();
      console.log(res);
    } catch (err: any) {
      console.error(err?.response?.data.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-8">Sign up to create your account.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <small>
            Already have an account?{" "}
            <Link href="/log-in" className="text-orange-500">
              Log in
            </Link>
          </small>
          <br />
          <Button className="my-1" type="submit">
            Sign up
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
