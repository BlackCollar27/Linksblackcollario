import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  FolderKanban, 
  BarChart3, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import logoWhite from 'figma:asset/13a610c2eb52d37dcdb23da9c6c27891d7b11cf3.png';
import logoBlack from 'figma:asset/45d2c3ca8dcadef95132a6169f23902806153f9c.png';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/links', label: 'Links', icon: LinkIcon },
    { path: '/campaigns', label: 'Campaigns', icon: FolderKanban },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    // TODO: Replace with actual sign out logic (clear auth tokens, etc.)
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-center relative">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center">
            <img 
              src={isDark ? logoWhite : logoBlack} 
              alt="Blackcollar.io" 
              className="h-14 w-auto"
            />
          </Link>
          <button
            onClick={toggleMenu}
            className="absolute right-0 p-2 rounded-sm hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <img 
              src={isDark ? logoWhite : logoBlack} 
              alt="Blackcollar.io" 
              className={isDark ? "h-14 w-auto" : "h-12 w-auto"}
            />
          </Link>
          
          {/* Show nav items only for non-authenticated users */}
          {!isAuthenticated && (
            <nav className="flex items-center gap-6">
              <a href="#" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
                Features
              </a>
              <a href="#" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
                Pricing
              </a>
              <a href="#" className="text-sm hover:text-foreground transition-colors text-muted-foreground">
                About
              </a>
            </nav>
          )}

          {/* Theme toggle only for non-authenticated users on desktop */}
          {!isAuthenticated && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-sm hover:bg-accent/50 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-border bg-background shadow-lg">
          <nav className="px-4 py-4">
            {isAuthenticated ? (
              // Authenticated mobile menu
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || 
                                  location.pathname.startsWith(item.path + '/');
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-sm
                        transition-colors text-left
                        ${isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Theme toggle in mobile dropdown for authenticated users */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left mt-2 border-t border-border pt-4"
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
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              // Non-authenticated mobile menu
              <div className="space-y-4">
                <a href="#" className="block text-sm hover:text-foreground transition-colors text-muted-foreground">
                  Features
                </a>
                <a href="#" className="block text-sm hover:text-foreground transition-colors text-muted-foreground">
                  Pricing
                </a>
                <a href="#" className="block text-sm hover:text-foreground transition-colors text-muted-foreground">
                  About
                </a>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm hover:text-foreground transition-colors text-muted-foreground w-full"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}