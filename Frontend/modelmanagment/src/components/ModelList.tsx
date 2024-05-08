import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Model } from "@/types/model";
import ModelListItem from "./ModelListItem";
import AddModelDialogButton from "./AddModelDialogButton";

interface ModelListProps {
  models: Model[] | undefined;
  jobId: number;
  onRemove: (model: Model) => void;
  onAdd: (modeliD: number) => void;
}

export default function ModelList({
  models,
  jobId,
  onRemove,
  onAdd,
}: ModelListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between itmes-center">
          <CardTitle>Models</CardTitle>
          <AddModelDialogButton jobId={jobId} onAdded={onAdd} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-2">
        {(!models || models.length === 0) && (
          <div className="text-muted-foreground italic">No models found</div>
        )}
        {models &&
          models.map((model, index) => (
            <ModelListItem key={index} model={model} onRemove={onRemove} />
          ))}
      </CardContent>
    </Card>
  );
}
