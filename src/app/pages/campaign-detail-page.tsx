import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  Plus, 
  Copy, 
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Globe,
  Calendar,
  Clock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CampaignDetailPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with API call to Rails backend
  const campaign = {
    id: campaignId,
    name: 'Spring Sale 2026',
    description: 'Marketing campaign for spring promotion',
    createdAt: '2026-02-01',
  };

  const links = [
    {
      id: '1',
      shortUrl: 'blackcollar.io/spring-home',
      originalUrl: 'https://example.com/spring-sale/homepage',
      clicks: 2450,
    },
    {
      id: '2',
      shortUrl: 'blackcollar.io/spring-promo',
      originalUrl: 'https://example.com/spring-sale/promo',
      clicks: 1820,
    },
  ];

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  // Mock analytics data
  const clicksOverTime = [
    { date: 'Feb 22', clicks: 145 },
    { date: 'Feb 23', clicks: 189 },
    { date: 'Feb 24', clicks: 220 },
    { date: 'Feb 25', clicks: 195 },
    { date: 'Feb 26', clicks: 245 },
    { date: 'Feb 27', clicks: 278 },
    { date: 'Feb 28', clicks: 303 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 1258, color: '#4285F4' },
    { name: 'Desktop', value: 812, color: '#34A853' },
    { name: 'Tablet', value: 377, color: '#FBBC05' },
  ];

  const locationData = [
    { country: 'United States', clicks: 825 },
    { country: 'United Kingdom', clicks: 612 },
    { country: 'Canada', clicks: 398 },
    { country: 'Germany', clicks: 345 },
    { country: 'Australia', clicks: 267 },
  ];

  // Mock recent clicks across all campaign links
  const recentClicks = [
    {
      id: '1',
      timestamp: '2026-02-28T14:32:15Z',
      linkName: 'spring-home',
      shortUrl: 'blackcollar.io/spring-home',
      country: 'United States',
      city: 'New York',
      device: 'Mobile',
      browser: 'Chrome',
      referrer: 'https://twitter.com'
    },
    {
      id: '2',
      timestamp: '2026-02-28T14:28:43Z',
      linkName: 'spring-promo',
      shortUrl: 'blackcollar.io/spring-promo',
      country: 'United Kingdom',
      city: 'London',
      device: 'Desktop',
      browser: 'Safari',
      referrer: 'https://facebook.com'
    },
    {
      id: '3',
      timestamp: '2026-02-28T14:15:22Z',
      linkName: 'spring-home',
      shortUrl: 'blackcollar.io/spring-home',
      country: 'Canada',
      city: 'Toronto',
      device: 'Mobile',
      browser: 'Firefox',
      referrer: 'Direct'
    },
    {
      id: '4',
      timestamp: '2026-02-28T13:58:11Z',
      linkName: 'spring-promo',
      shortUrl: 'blackcollar.io/spring-promo',
      country: 'Germany',
      city: 'Berlin',
      device: 'Desktop',
      browser: 'Chrome',
      referrer: 'https://google.com'
    },
    {
      id: '5',
      timestamp: '2026-02-28T13:45:09Z',
      linkName: 'spring-home',
      shortUrl: 'blackcollar.io/spring-home',
      country: 'Australia',
      city: 'Sydney',
      device: 'Tablet',
      browser: 'Safari',
      referrer: 'https://linkedin.com'
    },
    {
      id: '6',
      timestamp: '2026-02-28T13:32:56Z',
      linkName: 'spring-promo',
      shortUrl: 'blackcollar.io/spring-promo',
      country: 'United States',
      city: 'Los Angeles',
      device: 'Mobile',
      browser: 'Chrome',
      referrer: 'https://instagram.com'
    },
    {
      id: '7',
      timestamp: '2026-02-28T13:21:34Z',
      linkName: 'spring-home',
      shortUrl: 'blackcollar.io/spring-home',
      country: 'United Kingdom',
      city: 'Manchester',
      device: 'Desktop',
      browser: 'Edge',
      referrer: 'Direct'
    },
    {
      id: '8',
      timestamp: '2026-02-28T13:08:17Z',
      linkName: 'spring-promo',
      shortUrl: 'blackcollar.io/spring-promo',
      country: 'France',
      city: 'Paris',
      device: 'Mobile',
      browser: 'Chrome',
      referrer: 'https://youtube.com'
    },
    {
      id: '9',
      timestamp: '2026-02-28T12:55:42Z',
      linkName: 'spring-home',
      shortUrl: 'blackcollar.io/spring-home',
      country: 'Japan',
      city: 'Tokyo',
      device: 'Desktop',
      browser: 'Chrome',
      referrer: 'https://reddit.com'
    },
    {
      id: '10',
      timestamp: '2026-02-28T12:43:28Z',
      linkName: 'spring-promo',
      shortUrl: 'blackcollar.io/spring-promo',
      country: 'Spain',
      city: 'Madrid',
      device: 'Mobile',
      browser: 'Safari',
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
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/campaigns')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
              <p className="text-sm text-muted-foreground">{campaign.description}</p>
            </div>
            <Button onClick={() => navigate(`/campaigns/${campaignId}/edit`)}>
              Edit Campaign
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Links</p>
              <p className="text-3xl font-bold">{links.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Clicks</p>
              <p className="text-3xl font-bold">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Avg. Clicks</p>
              <p className="text-3xl font-bold">{Math.round(totalClicks / links.length)}</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Campaign Links</h2>
              <Button
                size="sm"
                onClick={() => navigate('/links/new', { state: { campaignId } })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </div>

            <div className="space-y-3">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {link.shortUrl}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(link.shortUrl);
                            alert('Copied to clipboard!');
                          }}
                          className="p-1 hover:bg-muted rounded shrink-0"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {link.originalUrl}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold">{link.clicks.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => navigate(`/links/${link.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => navigate(`/analytics/${link.id}`)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Stats
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>

            {/* Clicks Over Time */}
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold mb-2">Clicks Over Time</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={clicksOverTime}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Device Data */}
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold mb-2">Device Data</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

            {/* Location Data */}
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold mb-2">Location Data</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={locationData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Clicks */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Clicks</h2>
              <div className="overflow-x-auto">
                <div className="min-w-full space-y-2">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/30 rounded-lg text-xs font-medium text-muted-foreground">
                    <div className="col-span-3">Time</div>
                    <div className="col-span-3">Link</div>
                    <div className="col-span-2">Location</div>
                    <div className="col-span-2">Device</div>
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
                        <span className="text-xs">{formatTimestamp(click.timestamp)}</span>
                      </div>
                      <div className="col-span-3 text-sm">
                        <div className="font-medium font-mono">{click.linkName}</div>
                        <div className="text-xs text-muted-foreground truncate">{click.shortUrl}</div>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div className="font-medium">{click.city}</div>
                        <div className="text-xs text-muted-foreground">{click.country}</div>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div className="font-medium">{click.device}</div>
                        <div className="text-xs text-muted-foreground">{click.browser}</div>
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
        </div>
      </div>
    </AppLayout>
  );
}