export interface SessionLog {
    id?: number;
    sessionId: number;
    fearStepId: number;
    initialDegree: number;
    endDegree: number;
    date: number;
    note?: string;
}