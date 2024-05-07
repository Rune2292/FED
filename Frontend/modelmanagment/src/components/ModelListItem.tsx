import { Model } from "@/types/model";
import { Button } from "./ui/button";

interface ModelListItemProps {
  model: Model;
  onRemove: (model: Model) => void;
}

export default function ModelListItem({ model, onRemove }: ModelListItemProps) {
  const handleRemove = () => {
    onRemove(model);
  };

  return (
    <div className="flex items-center justify-between gap-4 hover:bg-gray-200 rounded transition p-2 cursor-pointer">
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-none">
          {model.firstName} {model.lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {model.email} <br />
          <span className="italic ">{model.phoneNb}</span>
        </p>
      </div>
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  );
}
