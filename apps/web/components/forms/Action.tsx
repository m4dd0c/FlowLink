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
import { ActionNodeSchema } from "@/lib/schema/schema";
import { useGetAvailableActionsQuery } from "@/store/api/ancillary";
import { useDispatch, useSelector } from "react-redux";
import { setActions } from "@/store/slices/ancillary";
import { iSliceState } from "@/types";

const TriggerForm = ({
  setIsDrawerOpen,
  actionId,
}: {
  setIsDrawerOpen: (open: boolean) => void;
  actionId: number;
}) => {
  const { isFetching, data: availableActions } =
    useGetAvailableActionsQuery("");
  const dispatch = useDispatch();
  const { actions } = useSelector((state: iSliceState) => state.ancillarySlice);

  const form = useForm<z.infer<typeof ActionNodeSchema>>({
    resolver: zodResolver(ActionNodeSchema),
    defaultValues: {
      title: actions[actionId]?.title || "",
      availableActionId: actions[actionId]?.availableActionId || "",
      actionMetadata: actions[actionId]?.actionMetadata || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ActionNodeSchema>) => {
    try {
      if (!values.availableActionId)
        return form.setError("availableActionId", {
          type: "custom",
          message: "Please select an Action",
        });
      dispatch(
        setActions({
          ...actions[actionId],
          ...values,
        }),
      );
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
                  placeholder="e.g., event: Send Solana"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableActionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableActions?.data?.map(
                    (action: { id: string; name: string }) => (
                      <SelectItem key={action?.id} value={action?.id}>
                        {action?.name}
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
          name="actionMetadata"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action Metadata</FormLabel>
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
