import { Model } from "@/types/model";

interface ModelSelectItemProps {
  selectedModel: Model;
  onClick: () => void;
}

export default function ModelSelectItem({
  selectedModel,
  onClick,
}: ModelSelectItemProps) {
  return (
    <div
      className="flex items-center gap-4 hover:bg-gray-200 rounded transition p-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="grid gap-1">
        <p className="text-lg font-medium leading-none">
          {selectedModel.firstName} {selectedModel.lastName}
        </p>
        <p className="text-sm text-muted-foreground">
          {selectedModel.email} <br />
          <span className="italic ">{selectedModel.phoneNb}</span>
        </p>
      </div>
    </div>
  );
}
