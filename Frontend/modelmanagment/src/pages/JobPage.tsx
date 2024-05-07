/** @format */

import { Welcome } from "./dashboard/welcome";
import { ManagerMenu } from "./dashboard/managerMenu";
import ModelList from "@/components/ModelList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/job";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { BackToDashboard } from "./account/backToDashboard";

export default function JobPage() {
  const urlParams = useParams();

  const [job, setJob] = useState<Job>();
  useEffect(() => {
    axios
      .get(`http://localhost:7181/api/jobs/${urlParams.jobId}`)
      .then((response) => {
        setJob(response.data);
      });
  }, [setJob, urlParams.jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const startDateTime = format(
    new Date(job.startDate),
    "d. MMM yyyy hh:mm aaaa"
  );

  console.log(job.models);

  return (
    <>
      <div className="py-6">
        <BackToDashboard className="fixed top-10 left-10 m-4 " />
      </div>
      <header className="py-8">
        <h1 className="text-6xl font-bold ">{job.customer}</h1>
        <p className="text-lg pt-4 font-semibold">
          {job.location}, {startDateTime}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-8">
          {job.models && <ModelList models={job.models} jobId={job.jobId} />}
          {!job.models?.length && (
            <p className="italic">No models assigned to this job</p>
          )}
          <Card>
            <CardHeader className="pt-8 px-8 pt">
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pt-0"></CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader className="pt-8 px-8">
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ManagerMenu />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
