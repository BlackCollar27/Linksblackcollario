import { useState } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';

export function BookACallPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call to Rails backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    'Personalized demo of Blackcollar.io',
    'Custom solutions for your team',
    'Pricing and plan recommendations',
    'Migration support from other tools',
    'Q&A with our product experts'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header customNavItems={[
        { label: 'Products', href: 'https://www.blackcollar.io' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Book a Call', href: '/book-a-call' },
      ]} />

      <main className="flex-1 pt-20">
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                Schedule a Demo
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Let's discuss how Blackcollar.io can help your team manage and track links more effectively.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form Section */}
              <div className="bg-card/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-lg p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-11 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full h-11 px-4 rounded-full bg-muted border-0 focus:ring-0 focus:outline-none text-sm"
                      >
                        <option value="">Select team size</option>
                        <option value="1-10">1-10 people</option>
                        <option value="11-50">11-50 people</option>
                        <option value="51-200">51-200 people</option>
                        <option value="201-500">201-500 people</option>
                        <option value="500+">500+ people</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">What would you like to discuss?</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-muted border-0 focus:ring-0 focus:outline-none text-sm resize-none"
                        placeholder="Tell us about your needs..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
                    >
                      Submit Request
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We'll get back to you within 1 business day
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">Request Submitted!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your interest in Blackcollar.io. Our team will reach out to you shortly to schedule a demo.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check your email ({formData.email}) for confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                {/* What to Expect */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call Details */}
                <div className="bg-card/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted rounded-lg p-3">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">30-45 Minutes</h3>
                      <p className="text-sm text-muted-foreground">
                        Enough time for a thorough demo and Q&A
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted rounded-lg p-3">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Video Call</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll send you a meeting link via email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted rounded-lg p-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a time that works for your schedule
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Prefer to Email?</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Reach out directly to our sales team:
                  </p>
                  <a 
                    href="mailto:sales@blackcollar.io" 
                    className="text-primary hover:underline"
                  >
                    sales@blackcollar.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
