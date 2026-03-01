import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/auth-context';
import { User, Key, Bell, CreditCard } from 'lucide-react';

export function SettingsPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call to Rails backend
    console.log('Update profile:', { name, email });
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: Replace with actual API call to Rails backend
    console.log('Change password:', { currentPassword, newPassword });
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto gap-2">
            <TabsTrigger value="profile" className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3">
              <User className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3">
              <Key className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3">
              <Bell className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3">
              <CreditCard className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">Billing</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <Button type="submit" size="lg">
                  Update Password
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline" size="lg">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email updates about your links</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-muted-foreground">Get weekly analytics summaries</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium">Link Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified when links reach click milestones</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Billing & Subscription</h2>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Free Plan</h3>
                    <p className="text-sm text-muted-foreground">Currently active</p>
                  </div>
                  <span className="text-2xl font-bold">$0/mo</span>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-sm">✓ Up to 100 links</p>
                  <p className="text-sm">✓ Basic analytics</p>
                  <p className="text-sm">✓ Standard support</p>
                </div>
              </div>
              <Button size="lg" className="w-full">
                Upgrade to Pro
              </Button>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <p className="text-sm text-muted-foreground mb-4">No payment method on file</p>
                <Button variant="outline" size="lg">
                  Add Payment Method
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}