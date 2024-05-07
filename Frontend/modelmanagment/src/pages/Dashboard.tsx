/** @format */

import { Welcome } from "./dashboard/welcome";
import { ManagerMenu } from "./dashboard/managerMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import JobList from "@/components/JobList";

export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    axios.get("http://localhost:7181/api/jobs/").then((response) => {
      setJobs(response.data);
    });
  }, [setJobs]);
  function handleJobClick(job: Job) {
    navigate(`/job/${job.jobId}`);
  }

  return (
    <>
      <header className="py-8">
        <h1 className="text-6xl font-bold ">Dashboard 🤑</h1>
        <Welcome />
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <JobList jobs={jobs} onJobClick={handleJobClick} />
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
