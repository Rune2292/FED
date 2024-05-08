import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import axios from "axios";
import { useForm } from "react-hook-form";
import { parseISO } from "date-fns";
import { Select } from "./ui/select";
import { toast } from "./ui/use-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { on } from "events";
import { Job } from "@/types/job";
import { useAuthStore } from "@/state/authStore";

type AddExpenseFormInputs = {
  date: string;
  text: string;
  amount: number;
  modelId?: number;
  jobId?: number;
};

type AddExpenseDialogProps = {
  jobId: number;
  modelId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddExpenseDialog({
  jobId,
  modelId,
  open,
  onOpenChange,
}: AddExpenseDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<AddExpenseFormInputs>();

  async function AddExpense(data: AddExpenseFormInputs) {
    data.date = new Date(data.date).toISOString();
    data.modelId = modelId;
    data.jobId = jobId;
    const response = await axios.post(
      "http://localhost:7181/api/expenses",
      data
    );
    if (response.status === 400) {
      toast({
        title: "Error",
        description: "There was an error creating the expense",
        variant: "default",
        duration: 5000,
      });
      return;
    }

    onOpenChange(false);

    toast({
      title: "Expense added",
      description: "Expense has been created successfully added",
      variant: "default",
      duration: 5000,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(AddExpense)}>
          <div className="space-y-2">
            <Label htmlFor="Text">
              Expense text<span className="text-red-500">*</span>
            </Label>
            <Input
              id="Text"
              {...register("text", { required: true })}
              type="text"
              placeholder="Example 'Taxi from pitsburg'"
            />
            {errors.text && (
              <p className="text-red-500 text-xs">Text is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="Amount">
              Amount<span className="text-red-500">*</span>
            </Label>
            <Input
              id="Amount"
              {...register("amount", { required: true })}
              type="number"
              placeholder="Example '100'"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">Amount is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">
              Date & time of expense<span className="text-red-500">*</span>
              <Input
                id="Date"
                {...register("date", { required: true })}
                type="datetime-local"
                min="2000-06-07T00:00"
                max="2100-06-14T00:00"
              />
            </Label>
            {errors.date && (
              <p className="text-red-500 text-xs">Date & time is required</p>
            )}
          </div>
          <div className="pt-2">
            <Button type="submit">Add expense</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
