import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckSquare, LayoutDashboard, List, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onNewTask?: () => void;
}

export function Header({ onNewTask }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'All Tasks', icon: List },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">TaskFlow</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-secondary font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Action */}
          {onNewTask && (
            <Button onClick={onNewTask} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
