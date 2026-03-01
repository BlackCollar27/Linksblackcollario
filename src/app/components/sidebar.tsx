import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  FolderKanban, 
  BarChart3, 
  Users, 
  Settings,
  X,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleSignOut = () => {
    // TODO: Replace with actual sign out logic (clear auth tokens, etc.)
    window.location.href = '/';
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/links', label: 'Links', icon: LinkIcon },
    { path: '/campaigns', label: 'Campaigns', icon: FolderKanban },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Sidebar - Desktop Only, Hidden on Mobile */}
      <aside className="hidden lg:block fixed top-[73px] left-0 bottom-0 w-64 bg-card border-r border-border z-40">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                              location.pathname.startsWith(item.path + '/');
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-sm
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & User Info */}
          <div className="p-4 border-t border-border space-y-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {isDark ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">Dark Mode</span>
                </>
              )}
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>

            {/* Plan Info */}
            <div className="px-4 py-3 bg-muted/50 rounded-sm">
              <p className="text-sm font-medium">Free Plan</p>
              <p className="text-xs text-muted-foreground mt-1">
                3/100 links used
              </p>
              <Link 
                to="/settings"
                className="text-xs text-primary hover:underline mt-2 inline-block"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}