export class Task {
  id = "";
  title = "";
  description = "";
  destination = "";
  type?: TaskType;
  priority = 0;
  gold = 0;
}

export type TaskType = "suchen" | "entern" | "erpressen";
