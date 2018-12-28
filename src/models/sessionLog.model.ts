export interface SessionLog {
    id?: number;
    sessionId: number;
    fearStepId: number;
    initialDegree: number;
    endDegree: number;
    date: Date;
    note: string;
}