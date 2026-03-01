import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export function CampaignFormPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const isNew = campaignId === 'new';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (!isNew) {
      // Mock data - replace with API call to Rails backend
      setFormData({
        name: 'Spring Sale 2026',
        description: 'Marketing campaign for spring promotion',
      });
    }
  }, [isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call to Rails backend
    console.log('Saving campaign:', formData);
    alert(isNew ? 'Campaign created successfully!' : 'Campaign updated successfully!');
    navigate('/campaigns');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      // TODO: Replace with actual API call to Rails backend
      navigate('/campaigns');
    }
  };

  return (
    <AppLayout>
      <div className="px-4 py-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/campaigns')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>

          <h1 className="text-3xl font-bold mb-2">
            {isNew ? 'Create Campaign' : 'Edit Campaign'}
          </h1>
          <p className="text-muted-foreground">
            {isNew 
              ? 'Create a new campaign to organize your links' 
              : 'Update your campaign details'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Spring Sale 2026"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add a description for this campaign..."
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-border bg-background resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" size="lg" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {isNew ? 'Create Campaign' : 'Save Changes'}
            </Button>
            
            {!isNew && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                size="lg"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Campaign
              </Button>
            )}
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
