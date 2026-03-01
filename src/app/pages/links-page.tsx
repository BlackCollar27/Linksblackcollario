import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Plus, 
  Search,
  Filter,
  Download
} from 'lucide-react';

interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  campaign?: string;
  createdAt: string;
  isRandomizer: boolean;
}

export function LinksPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - replace with API call to Rails backend
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
      shortCode: 'abc123',
      shortUrl: 'blackcollar.io/abc123',
      clicks: 1247,
      campaign: 'Summer Sale',
      createdAt: '2026-02-15',
      isRandomizer: false,
    },
    {
      id: '2',
      originalUrl: 'https://www.example.com/another-long-url',
      shortCode: 'xyz789',
      shortUrl: 'blackcollar.io/xyz789',
      clicks: 543,
      campaign: 'Product Launch',
      createdAt: '2026-02-20',
      isRandomizer: false,
    },
    {
      id: '3',
      originalUrl: 'https://www.example.com/marketing-campaign',
      shortCode: 'spring24',
      shortUrl: 'blackcollar.io/spring24',
      clicks: 2891,
      campaign: 'Spring Campaign',
      createdAt: '2026-02-25',
      isRandomizer: true,
    },
    {
      id: '4',
      originalUrl: 'https://www.example.com/blog-post',
      shortCode: 'blog01',
      shortUrl: 'blackcollar.io/blog01',
      clicks: 892,
      createdAt: '2026-02-22',
      isRandomizer: false,
    },
    {
      id: '5',
      originalUrl: 'https://www.example.com/newsletter',
      shortCode: 'news26',
      shortUrl: 'blackcollar.io/news26',
      clicks: 1456,
      campaign: 'Newsletter Feb',
      createdAt: '2026-02-18',
      isRandomizer: false,
    },
  ]);

  const filteredLinks = links.filter(link =>
    link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.campaign?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  return (
    <AppLayout>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Links</h1>
          <p className="text-muted-foreground text-center">
            Manage all your shortened links in one place
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Links</p>
            <p className="text-2xl font-bold">{links.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
            <p className="text-2xl font-bold">
              {links.reduce((sum, link) => sum + link.clicks, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Avg. Clicks</p>
            <p className="text-2xl font-bold">
              {Math.round(links.reduce((sum, link) => sum + link.clicks, 0) / links.length)}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Randomizers</p>
            <p className="text-2xl font-bold">
              {links.filter(link => link.isRandomizer).length}
            </p>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Short Link
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Destination
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Campaign
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-muted-foreground">
                    Clicks
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.map((link) => (
                  <tr 
                    key={link.id}
                    onClick={() => navigate(`/links/${link.id}`)}
                    className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary">
                          {link.shortUrl}
                        </span>
                        {link.isRandomizer && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Randomizer
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {link.originalUrl}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">
                        {link.campaign || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">
                        {link.clicks.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-border">
            {filteredLinks.map((link) => (
              <div 
                key={link.id} 
                onClick={() => navigate(`/links/${link.id}`)}
                className="p-4 space-y-3 cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-primary truncate">
                        {link.shortUrl}
                      </span>
                      {link.isRandomizer && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
                          Randomizer
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Campaign: </span>
                    <span>{link.campaign || 'None'}</span>
                  </div>
                  <div>
                    <span className="font-medium">{link.clicks.toLocaleString()}</span>
                    <span className="text-muted-foreground"> clicks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No links found</p>
            <Button onClick={() => navigate('/dashboard')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Link
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}