import { Model } from "@/types/model";

interface ModelListItemProps {
  model: Model;
}

export default function ModelListItem({ model }: ModelListItemProps) {
  console.log(model);
  return (
    <div className="flex items-center gap-4 hover:bg-gray-200 rounded transition p-2 cursor-pointer">
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-none">
          {model.firstName} {model.lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {model.email} <br />
          <span className="italic ">{model.phoneNb}</span>
        </p>
      </div>
    </div>
  );
}
