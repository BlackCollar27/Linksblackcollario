import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { FolderKanban, Plus, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  linksCount: number;
  totalClicks: number;
  createdAt: string;
}

export function CampaignsPage() {
  const navigate = useNavigate();
  
  // Mock data - replace with API call to Rails backend
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Spring Sale 2026',
      description: 'Marketing campaign for spring promotion',
      linksCount: 12,
      totalClicks: 5420,
      createdAt: '2026-02-01',
    },
    {
      id: '2',
      name: 'Product Launch',
      description: 'New product announcement campaign',
      linksCount: 8,
      totalClicks: 3210,
      createdAt: '2026-02-15',
    },
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
              <p className="text-sm text-muted-foreground">
                Organize and track your link campaigns
              </p>
            </div>
            <Button onClick={() => navigate('/campaigns/new')} className="h-10">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>

          {/* Campaigns Grid */}
          {campaigns.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <FolderKanban className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first campaign to organize your links
              </p>
              <Button onClick={() => navigate('/campaigns/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FolderKanban className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{campaign.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {campaign.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Links</p>
                      <p className="text-xl font-bold">{campaign.linksCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Clicks</p>
                      <p className="text-xl font-bold">{campaign.totalClicks.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 h-8 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/campaigns/${campaign.id}`);
                    }}
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
