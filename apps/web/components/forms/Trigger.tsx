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
import { useGetAvailableTriggersQuery } from "@/store/api/ancillary";
import { useDispatch, useSelector } from "react-redux";
import { setTrigger } from "@/store/slices/ancillary";

const TriggerForm = ({
  node,
  setIsDrawerOpen,
}: {
  node: any;
  setIsDrawerOpen: (open: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { trigger } = useSelector((state: any) => state.ancillarySlice);

  const { isFetching, data: availableTriggers } =
    useGetAvailableTriggersQuery("");

  const form = useForm<z.infer<typeof TriggerNodeSchema>>({
    resolver: zodResolver(TriggerNodeSchema),
    defaultValues: {
      title: trigger?.title || "",
      availableTriggerId: trigger?.availableTriggerId || "",
      triggerMetadata: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof TriggerNodeSchema>) => {
    try {
      if (!values.availableTriggerId)
        return form.setError("availableTriggerId", {
          type: "custom",
          message: "Please select a trigger",
        });
      dispatch(setTrigger(values));
      setIsDrawerOpen(false);
    } catch (err: any) {
      console.error(err?.response?.data.message);
    }
  };

  if (isFetching) return <h1>Loading...</h1>;
  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Trigger/App" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTriggers?.data?.map(
                    (trigger: { id: string; name: string }) => (
                      <SelectItem key={trigger?.id} value={trigger?.id}>
                        {trigger?.name}
                      </SelectItem>
                    ),
                  )}
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
        <Button className="w-full" type="submit">
          Done
        </Button>
      </form>
    </Form>
  );
};

export default TriggerForm;
