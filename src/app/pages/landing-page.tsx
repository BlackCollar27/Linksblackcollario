import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Link } from 'react-router';
import { Link2, BarChart3, Zap, Shield, Copy, Target, Plus, X } from 'lucide-react';

export function LandingPage() {
  const [longUrl, setLongUrl] = useState('');
  const [linkName, setLinkName] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  
  // Randomizer state
  const [randomizerUrls, setRandomizerUrls] = useState<string[]>(['', '']);
  const [randomizerName, setRandomizerName] = useState('');

  // Rotating headline state
  const phrases = ['Word of Mouth', 'Every Touchpoint', 'Every NFC Tap'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Rotating headline effect
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, phrases.length]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock shortening - replace with API call
    const slug = customSlug || Math.random().toString(36).substring(2, 8);
    setShortUrl(`blackcollar.io/${slug}`);
  };

  const handleCreateRandomizer = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty URLs
    const validUrls = randomizerUrls.filter(url => url.trim() !== '');
    
    if (validUrls.length < 2) {
      alert('Please add at least 2 destination URLs for the randomizer');
      return;
    }
    
    const slug = customSlug || Math.random().toString(36).substring(2, 8);
    setShortUrl(`blackcollar.io/${slug}`);
  };

  const addRandomizerUrl = () => {
    setRandomizerUrls([...randomizerUrls, '']);
  };

  const removeRandomizerUrl = (index: number) => {
    if (randomizerUrls.length > 2) {
      setRandomizerUrls(randomizerUrls.filter((_, i) => i !== index));
    }
  };

  const updateRandomizerUrl = (index: number, value: string) => {
    const newUrls = [...randomizerUrls];
    newUrls[index] = value;
    setRandomizerUrls(newUrls);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header customNavItems={[
        { label: 'Products', href: 'https://www.blackcollar.io' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Book a Call', href: '/book-a-call' },
      ]} />

      {/* Hero Section with Link Shortener */}
      <main className="flex-1 pt-20 relative">
        {/* Gradient background matching dashboard */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        
        <section className="px-[16px] py-[120px] relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center">
              <span>Make </span>
              <span className="text-primary">Every NFC Tap</span>
              <span> Measurable</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">The link management platform built for NFC-powered products & campaigns</p>

            {/* Link Shortener Card */}
            <div className="backdrop-blur-md rounded-lg p-6 sm:p-8 mb-8">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="w-full mb-6 grid grid-cols-2 h-auto gap-2 p-2 bg-muted/50 dark:bg-muted/20">
                  <TabsTrigger value="single" className="py-3 rounded-full data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black">
                    Single Link
                  </TabsTrigger>
                  <TabsTrigger value="randomizer" className="py-3 rounded-full data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black">
                    Randomizer
                  </TabsTrigger>
                </TabsList>

                {/* Single Link Tab */}
                <TabsContent value="single">
                  <form onSubmit={handleShorten} className="space-y-4">
                    <div>
                      <label htmlFor="long-url" className="block font-medium mb-2 text-[15px]">
                        Destination URL
                      </label>
                      <Input
                        id="long-url"
                        type="url"
                        placeholder="https://example.com/your-long-url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                        className="h-12 text-sm w-full rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="link-name" className="block font-medium mb-2 text-[15px]">
                        Link Name (optional)
                      </label>
                      <Input
                        id="link-name"
                        type="text"
                        placeholder="My Link"
                        value={linkName}
                        onChange={(e) => setLinkName(e.target.value)}
                        className="h-12 text-sm w-full rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    {showCustomize && (
                      <div>
                        <label htmlFor="custom-slug" className="block text-sm font-medium mb-2">
                          Customize your link (optional)
                        </label>
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">blackcollar.io/</span>
                          <Input
                            id="custom-slug"
                            type="text"
                            placeholder="my-custom-link"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            className="h-12 text-sm flex-1 min-w-0 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-sm rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
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
                </TabsContent>

                {/* Randomizer Tab */}
                <TabsContent value="randomizer">
                  <form onSubmit={handleCreateRandomizer} className="space-y-4">
                    <div>
                      <label htmlFor="randomizer-name" className="block font-medium mb-2 text-[15px]">
                        Randomizer Name
                      </label>
                      <Input
                        id="randomizer-name"
                        type="text"
                        placeholder="My Randomizer Link"
                        value={randomizerName}
                        onChange={(e) => setRandomizerName(e.target.value)}
                        className="h-12 text-sm w-full rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-medium mb-2 text-[15px]">
                        Destination URLs (minimum 2)
                      </label>
                      {randomizerUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="url"
                            placeholder={`https://example.com/destination-${index + 1}`}
                            value={url}
                            onChange={(e) => updateRandomizerUrl(index, e.target.value)}
                            required
                            className="h-12 text-sm flex-1 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                          />
                          {randomizerUrls.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeRandomizerUrl(index)}
                              className="p-2 hover:bg-muted rounded-full transition-colors shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRandomizerUrl}
                        className="w-full rounded-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add URL
                      </Button>
                    </div>

                    {showCustomize && (
                      <div>
                        <label htmlFor="custom-slug-randomizer" className="block text-sm font-medium mb-2">
                          Customize your link (optional)
                        </label>
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">blackcollar.io/</span>
                          <Input
                            id="custom-slug-randomizer"
                            type="text"
                            placeholder="my-randomizer"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            className="h-12 text-sm flex-1 min-w-0 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-sm rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Create Randomizer
                    </Button>

                    <button
                      type="button"
                      onClick={() => setShowCustomize(!showCustomize)}
                      className="w-full text-sm text-center text-muted-foreground hover:text-foreground underline"
                    >
                      {showCustomize ? 'Hide customization' : 'Customize'}
                    </button>
                  </form>
                </TabsContent>
              </Tabs>

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
            
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 sm:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-center mb-12">
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
            <h2 className="text-3xl sm:text-4xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 text-[16px]">
              Join thousands of users who trust Blackcollar.io for their link management needs
            </p>
            <Link to="/auth">
              <Button size="lg" className="h-12 px-8 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
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