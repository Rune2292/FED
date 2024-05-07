import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Model } from "@/types/model";
import ModelListItem from "./ModelListItem";
import { Button } from "./ui/button";
import AddJob from "./AddJobDialogButton";
import AddModelDialogButton from "./AddModelDialogButton";

interface ModelListProps {
  models: Model[];
  jobId: number;
}

export default function ModelList({ models, jobId }: ModelListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between itmes-center">
          <CardTitle>Models</CardTitle>
          <AddModelDialogButton jobId={jobId} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-2">
        {models.map((model, index) => (
          <ModelListItem key={index} model={model} />
        ))}
      </CardContent>
    </Card>
  );
}
