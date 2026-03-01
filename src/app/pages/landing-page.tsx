import { useState } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router';
import { Link2, BarChart3, Zap, Shield, Copy } from 'lucide-react';

export function LandingPage() {
  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock shortening - replace with API call
    const slug = customSlug || Math.random().toString(36).substring(2, 8);
    setShortUrl(`blackcollar.io/${slug}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Section with Link Shortener */}
      <main className="flex-1 pt-20">
        <section className="px-4 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center">
              Shorten your links
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Create short, branded links that are easy to share and track performance
            </p>

            {/* Link Shortener Card */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
              <form onSubmit={handleShorten} className="space-y-4">
                <div>
                  <label htmlFor="long-url" className="block text-sm font-medium mb-2">
                    Paste your long link here
                  </label>
                  <Input
                    id="long-url"
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    className="h-12 sm:h-14 text-base bg-background"
                  />
                </div>

                {showCustomize && (
                  <div>
                    <label htmlFor="custom-slug" className="block text-sm font-medium mb-2">
                      Customize your link (optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">blackcollar.io/</span>
                      <Input
                        id="custom-slug"
                        type="text"
                        placeholder="my-custom-link"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 sm:h-14 text-base"
                >
                  <Link2 className="w-5 h-5 mr-2" />
                  Shorten Link
                </Button>

                <button
                  type="button"
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="w-full text-sm text-center text-muted-foreground hover:text-foreground underline"
                >
                  {showCustomize ? 'Hide customization' : 'Customize'}
                </button>
              </form>

              {shortUrl && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Your shortened link:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-primary font-medium">{shortUrl}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    <Link to="/auth" className="text-primary hover:underline">Sign up</Link> to track clicks and manage your links
                  </p>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Links</p>
                <p className="text-3xl font-bold mb-1">10,000+</p>
                <p className="text-xs text-muted-foreground">Created by our users</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Clicks</p>
                <p className="text-3xl font-bold mb-1">1.2M+</p>
                <p className="text-xs text-green-500">↑ +12% this week</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 sm:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Why Choose Blackcollar.io?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Custom Short Links</h3>
                <p className="text-sm text-muted-foreground">
                  Create branded short links that reflect your brand identity
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Detailed Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track clicks, locations, devices, and more in real-time
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Instant link generation with sub-millisecond redirects
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust Blackcollar.io for their link management needs
            </p>
            <Link to="/auth">
              <Button size="lg" className="h-12 px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}