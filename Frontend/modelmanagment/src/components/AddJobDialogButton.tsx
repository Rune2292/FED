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

type AddJobFormInputs = {
  Customer: string;
  Comments: string;
  Location: string;
  StartDate: Date;
  Date: string;
  Days: number;
};

export default function AddJobDialogButton() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<AddJobFormInputs>();

  const [open, setOpen] = useState(false);

  async function handleNewJobAdded(data: AddJobFormInputs) {
    data.StartDate = new Date(data.Date);
    console.log(data.StartDate);
    const response = await axios.post("http://localhost:7181/api/jobs", data);
    if (response.status === 400) {
      toast({
        title: "Error",
        description: "There was an error creating the job",
        variant: "default",
        duration: 5000,
      });
      return;
    }
    setOpen(false);

    toast({
      title: "Job added",
      description: "Job has been created successfully added",
      variant: "default",
      duration: 5000,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger>
        <Button>Add Job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>Add a new job to the list.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleNewJobAdded)}>
          <div className="space-y-2">
            <Label htmlFor="Customer">
              Job costumer<span className="text-red-500">*</span>
            </Label>
            <Input
              id="Customer"
              {...register("Customer", { required: true })}
              type="text"
              placeholder="Example 'Vogue'"
            />
            {errors.Customer && (
              <p className="text-red-500 text-xs">Title is required</p>
            )}
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="Commentser">
              Job description
              <Input
                id="Comments"
                {...register("Comments", { required: false })}
                type="text"
                placeholder="Example 'Fashion shoot'"
              />
            </Label>
          </div>
          <div className="space-y-2 pt-2">
            <Label htmlFor="Location">
              Job location<span className="text-red-500">*</span>
              <Input
                id="Location"
                {...register("Location", { required: true })}
                type="text"
                placeholder="Example 'London'"
              />
            </Label>
            {errors.Location && (
              <p className="text-red-500 text-xs">Job location is required</p>
            )}
          </div>
          <div className="pt-2 flex justify-between">
            <div>
              Date<span className="text-red-500">*</span>
            </div>
            <div>
              Number of days<span className="text-red-500">*</span>
            </div>
          </div>
          <div className="flex">
            <Label htmlFor="job-date">
              <Input
                id="Date"
                {...register("Date", { required: true })}
                type="datetime-local"
                min="2000-06-07T00:00"
                max="2100-06-14T00:00"
              />
            </Label>
            {errors.Date && (
              <p className="text-red-500 text-xs">Date & time is required</p>
            )}
            <Select
              className="ml-2 text-left"
              {...register("Days", { required: true })}
            >
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
          </div>
          <div className="pt-2">
            <Button type="submit">Add Job</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
