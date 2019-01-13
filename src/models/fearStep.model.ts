import { SessionLog } from "./sessionLog.model";

export interface FearStep {
    id?: number; 
    fearId: number;
    name: string;
    description?: string;
    initialDegree: number;
    creationDate: number;
    sessionLogs?: SessionLog[];
}