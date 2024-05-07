import { Model } from "./model";



export interface Job {
    customer: string;
    startDate: string;
    comments: string;
    location: string;
    jobId: number;
    models?: Model[];
}