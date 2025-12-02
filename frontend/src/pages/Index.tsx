import { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { Task, TaskFilters as TaskFiltersType, CreateTaskDto, TaskStatus } from '@/types/task';
import { Header } from '@/components/Header';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStats } from '@/components/TaskStats';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

const Index = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay productive
          </p>
        </div>

        {/* Stats */}
        {!isLoading && !isError && tasks.length > 0 && (
          <TaskStats tasks={tasks} />
        )}

        {/* Filters */}
        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        {/* Task List */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={setDeletingTaskId}
                onStatusChange={handleStatusChange}
              />
            ))}
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

export default Index;
