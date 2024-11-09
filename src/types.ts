export interface RouteStep {
  type: "PICKUP" | "DELIVERY" | "END";
  address: string;
  tasksCount: number;
  completedTasksCount: number;
  sequence: number;
}

export interface Route {
  name: string;
  steps: RouteStep[];
}
