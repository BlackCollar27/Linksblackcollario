import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Link as LinkIcon, 
  Copy, 
  BarChart3, 
  TrendingUp,
  Folder,
  Target
} from 'lucide-react';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomSlug, setShowCustomSlug] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  // UTM Parameters state
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  // Mock data - replace with API call to Rails backend
  const [links, setLinks] = useState<ShortenedLink[]>([
    {
      id: '1',
      originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
      shortCode: 'abc123',
      shortUrl: 'blackcollar.io/abc123',
      clicks: 1247,
      createdAt: '2026-02-15',
    },
    {
      id: '2',
      originalUrl: 'https://www.example.com/another-long-url',
      shortCode: 'xyz789',
      shortUrl: 'blackcollar.io/xyz789',
      clicks: 543,
      createdAt: '2026-02-20',
    },
  ]);

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call to Rails backend
    const slug = customSlug || Math.random().toString(36).substring(2, 8);
    const newShortUrl = `blackcollar.io/${slug}`;
    
    const newLink: ShortenedLink = {
      id: String(Date.now()),
      originalUrl: longUrl,
      shortCode: slug,
      shortUrl: newShortUrl,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setLinks([newLink, ...links]);
    setGeneratedUrl(newShortUrl);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Calculate stats
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalLinks = links.length;

  // Mock campaign data - replace with API call to Rails backend
  const campaigns = [
    {
      id: '1',
      name: 'Spring Sale 2026',
      linksCount: 12,
      clicks: 4523,
      description: 'Marketing campaign for spring promotion'
    },
    {
      id: '2',
      name: 'Product Launch',
      linksCount: 8,
      clicks: 3201,
      description: 'New product announcement'
    },
    {
      id: '3',
      name: 'Summer Campaign',
      linksCount: 15,
      clicks: 5847,
      description: 'Summer seasonal promotion'
    },
  ];

  const totalCampaigns = campaigns.length;
  const totalCampaignClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);

  return (
    <AppLayout>
      <div className="w-full overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-4 py-6 w-full">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">
            Shorten your links
          </h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Create short, branded links that are easy to share and track performance
          </p>

          {/* Link Shortener Form */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6 w-full">
            <form onSubmit={handleCreateLink} className="space-y-3">
              <div>
                <label htmlFor="long-url" className="block text-xs font-medium mb-1.5 text-foreground text-center">
                  Paste your long link here
                </label>
                <Input
                  id="long-url"
                  type="url"
                  placeholder="https://example.com/your-long-url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                  className="h-10 text-sm bg-background w-full"
                />
              </div>

              {showCustomSlug && (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="custom-slug" className="block text-xs font-medium mb-1.5">
                      Customize your link (optional)
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">blackcollar.io/</span>
                      <Input
                        id="custom-slug"
                        type="text"
                        placeholder="my-link"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="h-10 text-sm flex-1 min-w-0"
                      />
                    </div>
                  </div>

                  {/* UTM Parameters */}
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-medium mb-2">UTM Parameters (optional)</p>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Source (e.g., facebook, newsletter)"
                        value={utmSource}
                        onChange={(e) => setUtmSource(e.target.value)}
                        className="h-9 text-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Medium (e.g., social, email)"
                        value={utmMedium}
                        onChange={(e) => setUtmMedium(e.target.value)}
                        className="h-9 text-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Campaign (e.g., spring_sale)"
                        value={utmCampaign}
                        onChange={(e) => setUtmCampaign(e.target.value)}
                        className="h-9 text-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Term (optional)"
                        value={utmTerm}
                        onChange={(e) => setUtmTerm(e.target.value)}
                        className="h-9 text-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Content (optional)"
                        value={utmContent}
                        onChange={(e) => setUtmContent(e.target.value)}
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-10 text-sm"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Shorten Link
              </Button>

              <button
                type="button"
                onClick={() => setShowCustomSlug(!showCustomSlug)}
                className="w-full py-2.5 text-xs text-center bg-card border border-border rounded-md hover:bg-muted/30 transition-colors"
              >
                {showCustomSlug ? 'Hide customization' : 'Customize'}
              </button>
            </form>

            {generatedUrl && (
              <div className="mt-3 p-3 bg-muted/30 rounded-md border border-border w-full">
                <p className="text-xs text-muted-foreground mb-1.5">Your shortened link:</p>
                <div className="flex items-center gap-2 w-full min-w-0">
                  <code className="flex-1 text-primary font-medium text-xs break-all min-w-0">
                    {generatedUrl}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedUrl)}
                    className="h-8 w-8 p-0 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 w-full">
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Total Links</p>
              <p className="text-3xl sm:text-4xl font-bold mb-0.5">{totalLinks}</p>
              <p className="text-xs text-muted-foreground">1/100 used</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Total Clicks</p>
              <p className="text-3xl sm:text-4xl font-bold mb-0.5">{totalClicks.toLocaleString()}</p>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1 shrink-0" />
                +12% this week
              </p>
            </div>
          </div>

          {/* Recent Links */}
          <div className="mb-6 w-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Recent Links</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/links')}
                className="text-primary text-xs h-auto p-0 hover:bg-transparent shrink-0"
              >
                View All
              </Button>
            </div>

            <div className="space-y-3 w-full">
              {links.slice(0, 5).map((link) => (
                <div
                  key={link.id}
                  className="bg-card border border-border rounded-lg p-3 w-full min-w-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-2 w-full min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                        <span className="font-medium text-sm truncate">
                          {link.shortUrl}
                        </span>
                        <button
                          onClick={() => copyToClipboard(link.shortUrl)}
                          className="p-1 hover:bg-muted rounded shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {link.originalUrl}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xl font-bold leading-none">{link.clicks.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">clicks</p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs min-w-0"
                      onClick={() => navigate(`/links/${link.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs min-w-0"
                      onClick={() => navigate(`/analytics/${link.id}`)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1 shrink-0" />
                      Stats
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="mb-6 w-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Campaign Overview</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/campaigns')}
                className="text-primary text-xs h-auto p-0 hover:bg-transparent shrink-0"
              >
                View All
              </Button>
            </div>

            {/* Campaign Summary Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 w-full">
              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Active Campaigns</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold">{totalCampaigns}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-3 sm:p-4 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Campaign Clicks</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold">{totalCampaignClicks.toLocaleString()}</p>
              </div>
            </div>

            {/* Top Campaigns List */}
            <div className="space-y-3 w-full">
              {campaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  className="bg-card border border-border rounded-lg p-3 w-full min-w-0 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2 w-full min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Folder className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-sm truncate">
                          {campaign.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {campaign.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xl font-bold leading-none">{campaign.clicks.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">clicks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{campaign.linksCount} links</span>
                    <span>•</span>
                    <span>{Math.round(campaign.clicks / campaign.linksCount)} avg. clicks/link</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}