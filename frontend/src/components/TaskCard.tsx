import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Pencil, Trash2, Clock } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const priorityVariant: Record<TaskPriority, "priority-low" | "priority-medium" | "priority-high"> = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
};

const statusVariant: Record<TaskStatus, "status-todo" | "status-progress" | "status-done"> = {
  'todo': 'status-todo',
  'in-progress': 'status-progress',
  'done': 'status-done',
};

const statusLabels: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isDueDatePast = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <Card className={cn(
      "task-card animate-fade-in group",
      task.status === 'done' && "opacity-75"
    )}>
      <CardHeader className="pb-2 space-y-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn(
            "font-semibold text-base leading-tight",
            task.status === 'done' && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant[task.status]}>
            {statusLabels[task.status]}
          </Badge>
          <Badge variant={priorityVariant[task.priority]}>
            {priorityLabels[task.priority]}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          {task.dueDate ? (
            <div className={cn(
              "flex items-center gap-1.5 text-xs",
              isDueDatePast && "text-destructive",
              isDueToday && !isDueDatePast && "text-priority-medium",
              !isDueDatePast && !isDueToday && "text-muted-foreground"
            )}>
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {isDueToday ? 'Due today' : format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>No due date</span>
            </div>
          )}

          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className="text-xs bg-secondary text-secondary-foreground rounded-md px-2 py-1 border-0 focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
