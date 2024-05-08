/** @format */

import { Welcome } from "./dashboard/welcome";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import JobList from "@/components/JobList";
import { Button } from "@/components/ui/button";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = useCallback(() => {
    axios.get("http://localhost:7181/api/jobs/").then((response) => {
      setJobs(response.data);
    });
  }, [setJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  function handleJobClick(job: Job) {
    navigate(`/job/${job.jobId}`);
  }

  function handleAddJob() {
    fetchJobs();
  }

  return (
    <>
      <div className="flex flex-col sm:mx-12">
        <header className="py-8 col-span-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-bold ">Manager dashboard 🤑</h1>
              <div className="py-2">
                <Welcome />
              </div>
            </div>
            <Button
              className="col-span-1"
              onClick={() => navigate("/create-account")}
            >
              Create new account!
            </Button>
          </div>
        </header>

        <div className="col-span-2">
          <JobList
            jobs={jobs}
            onJobClick={handleJobClick}
            onAddJob={handleAddJob}
          />
        </div>
      </div>
    </>
  );
}
