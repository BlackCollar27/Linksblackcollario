import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Link } from 'react-router';
import { 
  Megaphone, 
  ShoppingBag, 
  Share2, 
  Users, 
  TrendingUp, 
  Radio,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';

export function UseCasesPage() {
  const useCases = [
    {
      icon: Megaphone,
      title: 'Marketing Campaigns',
      description: 'Track performance across multiple marketing channels with branded short links. Perfect for email campaigns, social media ads, and content marketing.',
      features: [
        'Campaign-level analytics',
        'UTM parameter tracking',
        'A/B testing with randomizers',
        'Multi-channel attribution'
      ],
      color: 'text-blue-500'
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce',
      description: 'Share product links that are memorable and trackable. Monitor which channels drive the most sales and optimize your marketing spend.',
      features: [
        'Product link tracking',
        'Conversion analytics',
        'Affiliate link management',
        'Mobile-optimized redirects'
      ],
      color: 'text-green-500'
    },
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'Create clean, shareable links for Instagram, Twitter, TikTok, and more. Track engagement and clicks from each platform.',
      features: [
        'Bio link management',
        'Story link tracking',
        'Platform-specific analytics',
        'Click-through rate optimization'
      ],
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Manage links across teams with organized campaigns and shared workspaces. Perfect for agencies and marketing teams.',
      features: [
        'Team workspaces',
        'Role-based permissions',
        'Shared campaign folders',
        'Collaborative analytics'
      ],
      color: 'text-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Influencer Marketing',
      description: 'Track influencer campaign performance with unique links for each creator. Measure ROI and optimize partnerships.',
      features: [
        'Influencer-specific links',
        'Performance benchmarking',
        'Commission tracking',
        'Campaign reporting'
      ],
      color: 'text-pink-500'
    },
    {
      icon: Radio,
      title: 'Content Distribution',
      description: 'Distribute content across multiple platforms with one short link. Track where your audience engages most.',
      features: [
        'Cross-platform tracking',
        'Audience insights',
        'Geographic analytics',
        'Device breakdown'
      ],
      color: 'text-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header customNavItems={[
        { label: 'Products', href: 'https://www.blackcollar.io' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Book a Call', href: '/book-a-call' },
      ]} />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                Link Management for Every Use Case
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                From marketing campaigns to e-commerce, discover how Blackcollar.io helps teams track, manage, and optimize their links.
              </p>
            </div>

            {/* Use Cases Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                return (
                  <div 
                    key={useCase.title}
                    className="bg-card/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${useCase.color} bg-muted rounded-lg p-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-xl font-semibold">{useCase.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {useCase.description}
                    </p>

                    <ul className="space-y-3">
                      {useCase.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams using Blackcollar.io to manage and track their links across all marketing channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-8">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/book-a-call">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
