"use client";

import React from "react";
import {
  Form,
  FormControl,
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
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { TriggerNodeSchema } from "@/lib/schema/schema";
import { useRouter } from "next/navigation";

const TriggerForm = ({ node }: { node: any }) => {
  // const {data} = useTriggerNodeSchema.parseAsync(node);
  // const [trigger] = useLoginMutation();
  const route = useRouter();

  const form = useForm<z.infer<typeof TriggerNodeSchema>>({
    resolver: zodResolver(TriggerNodeSchema),
    defaultValues: {
      title: "",
      availableTriggerId: "",
      triggerMetadata: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof TriggerNodeSchema>) => {
    try {
      // const res = await trigger(values).unwrap();
      console.log("done");
      route.push("/me");
    } catch (err: any) {
      console.error(err?.response?.data.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-8">Log in to your account.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g., event: Github Comment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availableTriggerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trigger</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Trigger/App" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTriggers.map((trigger) => (
                      <SelectItem key={trigger.id} value={trigger.id}>
                        {trigger.trigger.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="triggerMetadata"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trigger Metadata</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g., s7r0ngP@ssw0rd"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button className="my-1" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TriggerForm;
