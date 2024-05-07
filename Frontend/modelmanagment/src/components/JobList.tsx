import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types/job";
import JobListItem from "./JobListItem";

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

export default function JobList({ jobs, onJobClick }: JobListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All active jobs</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {jobs.map((job) => (
          <JobListItem
            key={job.jobId}
            job={job}
            onClick={() => onJobClick(job)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
