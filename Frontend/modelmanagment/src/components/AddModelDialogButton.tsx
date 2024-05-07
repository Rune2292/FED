import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import ModelSelectItem from "./ModelSelectItem";
import { Model } from "@/types/model";

interface AddModelDialogButtonProps {
  jobId: number;
}

export default function AddModelDialogButton({
  jobId,
}: AddModelDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [assignedModels, setAssignedModels] = useState<Model[]>([]);

  async function handleModels() {
    const responseModels = await axios.get("http://localhost:7181/api/models");
    const responseAssignedModels = await axios.get(
      `http://localhost:7181/api/jobs/${jobId}`
    );
    console.log("Does this work?");
    console.log(responseModels.data);
    console.log(responseAssignedModels.data.models);
    console.log("stop");

    const testing = responseModels.data;
    const testing2 = responseAssignedModels.data.models;

    console.log("1000");
    console.log(testing);
    console.log(testing2);
    console.log("11000");

    if (responseModels.status === 200) {
      setModels(responseModels.data);
      setAssignedModels(responseAssignedModels.data.models);
      console.log("Again");
      console.log(models);
      console.log(assignedModels);
      console.log("stopppo");
      const uniqueModels = models.filter(
        (model) =>
          !assignedModels.some(
            (assignedModel) =>
              assignedModel.firstName === model.firstName &&
              assignedModel.lastName === model.lastName
          )
      );

      setModels(uniqueModels);
    } else {
      toast({
        title: "Error",
        description: "There was an error fetching the models",
        variant: "default",
        duration: 5000,
      });
      return;
    }
  }

  async function handleModelAdded(modelId: number) {
    console.log(modelId, jobId);
    const response = await axios.post(
      `http://localhost:7181/api/jobs/${jobId}/model/${modelId}`
    );
    console.log(response);
    if (response.status === 400) {
      toast({
        title: "Error",
        description: "There was an error creating the model",
        variant: "default",
        duration: 5000,
      });
      return;
    }
    setOpen(false);

    toast({
      title: "Model added",
      description: "Model has been created successfully added",
      variant: "default",
      duration: 5000,
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) handleModels();
      }}
    >
      <DialogTrigger>
        <Button>Add Models</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <div>
          <DialogTitle>Add models</DialogTitle>
          <DialogDescription>
            Select one or multiple models to be added
          </DialogDescription>
        </div>
        <div className="overflow-y-auto max-h-[500px]">
          {models.map((model, index) => (
            <ModelSelectItem
              key={index}
              selectedModel={model}
              onClick={() => handleModelAdded(index + 1)}
            />
          ))}
        </div>
      </DialogContent>
      <form></form>
    </Dialog>
  );
}
