export class Timesheet {
    id: string;
    userId: number;
    taskName: string;
    dateWorked: Date;
    totalTime: number;
    notes: { note: string }[];
    timesheet: any;
}
