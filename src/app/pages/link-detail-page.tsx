import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft,
  Copy,
  ExternalLink,
  QrCode,
  Nfc,
  Edit,
  TrendingUp,
  MousePointerClick,
  Globe,
  Calendar,
  Clock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function LinkDetailPage() {
  const { linkId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with API call to Rails backend
  const [linkData] = useState({
    id: linkId || '1',
    originalUrl: 'https://www.example.com/marketing-campaign',
    shortCode: 'spring24',
    shortUrl: 'blackcollar.io/spring24',
    clicks: 2891,
    campaign: 'Spring Campaign',
    createdAt: '2026-02-25',
    isRandomizer: false,
    utmParams: {
      source: 'facebook',
      medium: 'social',
      campaign: 'spring_sale_2026',
      term: '',
      content: 'main_ad'
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleExportQR = () => {
    // TODO: Generate and download QR code
    alert('QR Code export functionality coming soon!');
  };

  const handleExportNFC = () => {
    // TODO: Generate NFC data
    alert('NFC export functionality coming soon!');
  };

  // Mock analytics data
  const clicksOverTime = [
    { date: 'Feb 22', clicks: 65 },
    { date: 'Feb 23', clicks: 89 },
    { date: 'Feb 24', clicks: 120 },
    { date: 'Feb 25', clicks: 95 },
    { date: 'Feb 26', clicks: 145 },
    { date: 'Feb 27', clicks: 178 },
    { date: 'Feb 28', clicks: 203 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 658, color: '#4285F4' },
    { name: 'Desktop', value: 412, color: '#34A853' },
    { name: 'Tablet', value: 177, color: '#FBBC05' },
  ];

  const locationData = [
    { country: 'United States', clicks: 425 },
    { country: 'United Kingdom', clicks: 312 },
    { country: 'Canada', clicks: 198 },
    { country: 'Germany', clicks: 145 },
    { country: 'Australia', clicks: 167 },
  ];

  // Mock individual clicks data - replace with API call to Rails backend
  const recentClicks = [
    {
      id: '1',
      timestamp: '2026-02-28T14:32:15Z',
      country: 'United States',
      city: 'New York',
      device: 'Mobile',
      browser: 'Chrome',
      os: 'iOS',
      referrer: 'https://twitter.com'
    },
    {
      id: '2',
      timestamp: '2026-02-28T14:28:43Z',
      country: 'United Kingdom',
      city: 'London',
      device: 'Desktop',
      browser: 'Safari',
      os: 'macOS',
      referrer: 'https://facebook.com'
    },
    {
      id: '3',
      timestamp: '2026-02-28T14:15:22Z',
      country: 'Canada',
      city: 'Toronto',
      device: 'Mobile',
      browser: 'Firefox',
      os: 'Android',
      referrer: 'Direct'
    },
    {
      id: '4',
      timestamp: '2026-02-28T13:58:11Z',
      country: 'Germany',
      city: 'Berlin',
      device: 'Desktop',
      browser: 'Chrome',
      os: 'Windows',
      referrer: 'https://google.com'
    },
    {
      id: '5',
      timestamp: '2026-02-28T13:45:09Z',
      country: 'Australia',
      city: 'Sydney',
      device: 'Tablet',
      browser: 'Safari',
      os: 'iPadOS',
      referrer: 'https://linkedin.com'
    },
    {
      id: '6',
      timestamp: '2026-02-28T13:32:56Z',
      country: 'United States',
      city: 'Los Angeles',
      device: 'Mobile',
      browser: 'Chrome',
      os: 'Android',
      referrer: 'https://instagram.com'
    },
    {
      id: '7',
      timestamp: '2026-02-28T13:21:34Z',
      country: 'United Kingdom',
      city: 'Manchester',
      device: 'Desktop',
      browser: 'Edge',
      os: 'Windows',
      referrer: 'Direct'
    },
    {
      id: '8',
      timestamp: '2026-02-28T13:08:17Z',
      country: 'France',
      city: 'Paris',
      device: 'Mobile',
      browser: 'Chrome',
      os: 'iOS',
      referrer: 'https://youtube.com'
    },
    {
      id: '9',
      timestamp: '2026-02-28T12:55:42Z',
      country: 'Japan',
      city: 'Tokyo',
      device: 'Desktop',
      browser: 'Chrome',
      os: 'macOS',
      referrer: 'https://reddit.com'
    },
    {
      id: '10',
      timestamp: '2026-02-28T12:43:28Z',
      country: 'Spain',
      city: 'Madrid',
      device: 'Mobile',
      browser: 'Safari',
      os: 'iOS',
      referrer: 'https://twitter.com'
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AppLayout>
      <div className="px-4 py-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/links')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Links
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Link Analytics</h1>
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium">
                  {linkData.shortUrl}
                </span>
                <button
                  onClick={() => copyToClipboard(linkData.shortUrl)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://${linkData.shortUrl}`, '_blank')}
                  className="p-1 hover:bg-muted rounded"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/links/${linkData.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Link
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content - Recent Clicks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Clicks */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Clicks</h2>
              <div className="overflow-x-auto">
                <div className="min-w-full space-y-2">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/30 rounded-lg text-xs font-medium text-muted-foreground">
                    <div className="col-span-3">Time</div>
                    <div className="col-span-3">Location</div>
                    <div className="col-span-2">Device</div>
                    <div className="col-span-2">Browser</div>
                    <div className="col-span-2">Referrer</div>
                  </div>
                  
                  {/* Rows */}
                  {recentClicks.map(click => (
                    <div 
                      key={click.id} 
                      className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <div className="col-span-3 flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span>{formatTimestamp(click.timestamp)}</span>
                      </div>
                      <div className="col-span-3 text-sm">
                        <div className="font-medium">{click.city}</div>
                        <div className="text-xs text-muted-foreground">{click.country}</div>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div className="font-medium">{click.device}</div>
                        <div className="text-xs text-muted-foreground">{click.os}</div>
                      </div>
                      <div className="col-span-2 text-sm font-medium">
                        {click.browser}
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground truncate">
                        {click.referrer === 'Direct' ? 'Direct' : new URL(click.referrer).hostname.replace('www.', '')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
                  <p className="text-2xl font-bold">
                    {linkData.clicks.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="font-medium">
                    {new Date(linkData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Short Code</p>
                  <p className="font-mono font-medium">{linkData.shortCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Campaign</p>
                  <p className="font-medium">{linkData.campaign || 'None'}</p>
                </div>
              </div>
            </div>

            {/* QR & NFC Export */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Export</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleExportQR}
                  className="w-full justify-start h-auto py-4"
                >
                  <QrCode className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">QR Code</div>
                    <div className="text-xs text-muted-foreground">
                      Download QR code image
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleExportNFC}
                  className="w-full justify-start h-auto py-4"
                >
                  <Nfc className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">NFC Tag</div>
                    <div className="text-xs text-muted-foreground">
                      Generate NFC data
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* UTM Parameters */}
            {(linkData.utmParams.source || linkData.utmParams.medium || linkData.utmParams.campaign || linkData.utmParams.term || linkData.utmParams.content) && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">UTM Parameters</h2>
                <div className="space-y-3">
                  {linkData.utmParams.source && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Source</p>
                      <p className="text-sm font-medium font-mono">{linkData.utmParams.source}</p>
                    </div>
                  )}
                  {linkData.utmParams.medium && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Medium</p>
                      <p className="text-sm font-medium font-mono">{linkData.utmParams.medium}</p>
                    </div>
                  )}
                  {linkData.utmParams.campaign && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Campaign</p>
                      <p className="text-sm font-medium font-mono">{linkData.utmParams.campaign}</p>
                    </div>
                  )}
                  {linkData.utmParams.term && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Term</p>
                      <p className="text-sm font-medium font-mono">{linkData.utmParams.term}</p>
                    </div>
                  )}
                  {linkData.utmParams.content && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Content</p>
                      <p className="text-sm font-medium font-mono">{linkData.utmParams.content}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics Overview</h2>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Avg. Daily Clicks</span>
              </div>
              <p className="text-2xl font-bold">178</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Peak Day</span>
              </div>
              <p className="text-2xl font-bold">203</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">Countries</span>
              </div>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">Active Days</span>
              </div>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Clicks Over Time Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Clicks Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={clicksOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Line type="monotone" dataKey="clicks" stroke="#4285F4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Device Breakdown */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Locations */}
            <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Top Locations</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="country" className="text-xs" angle={-45} textAnchor="end" height={80} />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Bar dataKey="clicks" fill="#34A853" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}