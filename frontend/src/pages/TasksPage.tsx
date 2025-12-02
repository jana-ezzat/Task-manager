import { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { Task, TaskFilters as TaskFiltersType, CreateTaskDto, TaskStatus } from '@/types/task';
import { Header } from '@/components/Header';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const priorityVariant = {
  low: 'priority-low',
  medium: 'priority-medium',
  high: 'priority-high',
} as const;

const statusVariant = {
  'todo': 'status-todo',
  'in-progress': 'status-progress',
  'done': 'status-done',
} as const;

const statusLabels = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const TasksPage = () => {
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const { data: tasks = [], isLoading, isError, refetch } = useTasks(filters);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleCreateTask = (data: CreateTaskDto) => {
    createTask.mutate(data);
  };

  const handleUpdateTask = (data: CreateTaskDto) => {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, data });
      setEditingTask(null);
    }
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      deleteTask.mutate(deletingTaskId);
      setDeletingTaskId(null);
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTask.mutate({ id, data: { status } });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNewTask={() => setIsFormOpen(true)} />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
          <p className="text-muted-foreground">
            View and manage all your tasks in a table format
          </p>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        {/* Task Table */}
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : tasks.length === 0 ? (
          <EmptyState 
            type={Object.keys(filters).some(k => filters[k as keyof TaskFiltersType]) ? 'no-results' : 'no-tasks'} 
            onCreateTask={() => setIsFormOpen(true)} 
          />
        ) : (
          <div className="glass-panel overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[40%]">Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="animate-fade-in">
                    <TableCell>
                      <div>
                        <p className={cn(
                          "font-medium",
                          task.status === 'done' && "line-through text-muted-foreground"
                        )}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                        className="text-xs bg-transparent border-0 p-0 focus:ring-0 cursor-pointer"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityVariant[task.priority]}>
                        {priorityLabels[task.priority]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.dueDate ? (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditTask(task)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeletingTaskId(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Create/Edit Task Dialog */}
      <TaskForm
        open={isFormOpen}
        onOpenChange={handleFormClose}
        task={editingTask}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        isLoading={createTask.isPending || updateTask.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deletingTaskId}
        onOpenChange={(open) => !open && setDeletingTaskId(null)}
        onConfirm={handleDeleteTask}
        isLoading={deleteTask.isPending}
      />
    </div>
  );
};

export default TasksPage;
