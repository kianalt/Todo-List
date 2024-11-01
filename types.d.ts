export interface Task {
  id: number;
  title: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  datetime: Date;
  estimate: number;
  status: "TODO" | "DOING" | "DONE" | "WARNING" | "PENDING" | "FAILED";
  hash: string;
}
