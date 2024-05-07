import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Model } from "@/types/model";
import ModelListItem from "./ModelListItem";

interface ModelListProps {
  models: Model[];
}

export default function ModelList({ models }: ModelListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {models.map((model) => (
          <ModelListItem key={model.modelId} model={model} />
        ))}
      </CardContent>
    </Card>
  );
}
