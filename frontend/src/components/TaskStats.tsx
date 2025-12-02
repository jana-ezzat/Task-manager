import { Task } from '@/types/task';
import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status !== 'done').length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div className="glass-panel p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Circle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground">Total Tasks</p>
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-status-todo-bg">
          <Circle className="h-5 w-5 text-status-todo" />
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.todo}</p>
          <p className="text-xs text-muted-foreground">To Do</p>
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-status-progress-bg">
          <Clock className="h-5 w-5 text-status-progress" />
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-status-done-bg">
          <CheckCircle2 className="h-5 w-5 text-status-done" />
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.done}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      <div className="glass-panel p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-priority-high-bg">
          <AlertTriangle className="h-5 w-5 text-priority-high" />
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.highPriority}</p>
          <p className="text-xs text-muted-foreground">High Priority</p>
        </div>
      </div>
    </div>
  );
}
