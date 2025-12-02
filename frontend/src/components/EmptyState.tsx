import { Button } from '@/components/ui/button';
import { ClipboardList, Plus, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results';
  onCreateTask?: () => void;
}

export function EmptyState({ type, onCreateTask }: EmptyStateProps) {
  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="p-4 rounded-full bg-primary/10 mb-4">
        <ClipboardList className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Get started by creating your first task. Stay organized and boost your productivity!
      </p>
      {onCreateTask && (
        <Button onClick={onCreateTask} className="gap-2">
          <Plus className="h-4 w-4" />
          Create your first task
        </Button>
      )}
    </div>
  );
}
