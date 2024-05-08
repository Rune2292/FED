/** @format */

import ModelList from "@/components/ModelList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/job";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { BackToManagerDashboard } from "../components/BackToManagerDashboard";
import { Model } from "@/types/model";
import { EfModel } from "@/types/efModel";
import ExpenseList from "@/components/ExpenseList";
import { EfExpense } from "@/types/expense";
import { toast } from "@/components/ui/use-toast";

export default function JobPage() {
  const urlParams = useParams();

  const [refreshKey, setRefreshKey] = useState(0);
  const [job, setJob] = useState<Job>();
  const [expenses, setExpenses] = useState<EfExpense[]>();
  useEffect(() => {
    axios
      .get(`http://localhost:7181/api/jobs/${urlParams.jobId}`)
      .then((response) => {
        setJob(response.data);
      });
    axios.get("http://localhost:7181/api/Expenses").then((response) => {
      setExpenses(response.data);
    });
  }, [setJob, urlParams.jobId, refreshKey, setExpenses]);

  if (!job) {
    return <div>Loading...</div>;
  }

  if (!expenses) {
    console.log("No expenses");
    return <div>No expenes...</div>;
  }
  const startDateTime = format(
    new Date(job.startDate),
    "d. MMM yyyy hh:mm aaaa"
  );

  console.log(job.models);

  async function handleRemoveModel(model: Model) {
    if (job?.jobId != null) {
      console.log("Attempting to delete model...");
      console.log(model);

      const allModels = await axios.get<EfModel[]>(
        "http://localhost:7181/api/models"
      );

      const allModelsData = allModels.data;
      const modelToBeRemoved = allModelsData.find(
        (m) => m.firstName === model.firstName
      );
      if (!modelToBeRemoved) {
        console.log("Model not found");
        return;
      }
      console.log("Model to be removed");
      console.log(modelToBeRemoved?.efModelId);

      const response = await axios.delete(
        `http://localhost:7181/api/jobs/${job.jobId}/model/${modelToBeRemoved.efModelId}`
      );

      if (response.status === 400) {
        console.log("Error deleting model");
        return;
      }

      toast({
        title: "Model removed",
        description: "Model has been removed successfully",
        variant: "default",
        duration: 5000,
      });

      setRefreshKey((prev) => prev + 1);
    }
  }

  async function handleAddModel(modelId: number) {
    if (job?.jobId != null) {
      console.log("Attempting to add model...");
      console.log(modelId);

      const response = await axios.post(
        `http://localhost:7181/api/jobs/${job.jobId}/model/${modelId}`
      );

      if (response.status === 400) {
        console.log("Error adding model");
        return;
      }

      setRefreshKey((prev) => prev + 1);
    }
  }

  const jobsExpenses = expenses.filter(
    (expense) => expense.jobId === job.jobId
  );

  return (
    <>
      <header className="p-8">
        <BackToManagerDashboard />

        <h1 className="text-6xl font-bold ">{job.customer}</h1>
        <p className="text-lg pt-4 font-semibold">
          {job.location}, {startDateTime}
        </p>
      </header>

      <div className="flex">
        <div className="flex-1 px-8">
          <ModelList
            models={job.models}
            jobId={job.jobId}
            onRemove={handleRemoveModel}
            onAdd={handleAddModel}
          />
        </div>
        <div className="flex-1 px-8">
          <ExpenseList expenses={jobsExpenses} />
        </div>
      </div>
    </>
  );
}
