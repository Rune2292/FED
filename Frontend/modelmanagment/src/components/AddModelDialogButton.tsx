import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import ModelSelectItem from "./ModelSelectItem";
import { Model } from "@/types/model";
import { EfModel } from "@/types/efModel";

interface AddModelDialogButtonProps {
  jobId: number;
  onAdded?: (modelId: number) => void;
}

export default function AddModelDialogButton({
  jobId,
  onAdded,
}: AddModelDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState<Model[]>([]);

  async function handleAddModelClicked() {
    setOpen(true);
    const responseModels = await axios.get("http://localhost:7181/api/models");
    const responseAssignedModels = await axios.get(
      `http://localhost:7181/api/jobs/${jobId}`
    );

    const testing = responseModels.data;
    const testing2 = responseAssignedModels.data.models;

    if (responseModels.status === 200) {
      const uniqueModels = testing.filter(
        (model: Model) =>
          !testing2.some((m: Model) => m.firstName === model.firstName)
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

  async function handleModelAdded(model: Model) {
    const responseGetAllModels = await axios.get<EfModel[]>(
      "http://localhost:7181/api/models"
    );
    const allModels = responseGetAllModels.data;

    const modelToBeAdded = allModels.find(
      (m) => m.firstName === model.firstName
    );
    if (!modelToBeAdded) {
      console.log("Model not found");
      return;
    }

    if (onAdded) {
      onAdded(modelToBeAdded.efModelId);
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
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <Button className="mx-2" onClick={handleAddModelClicked}>
        Add Models
      </Button>
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
              onClick={() => handleModelAdded(model)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
