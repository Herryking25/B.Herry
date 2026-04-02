import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User, Send, MapPin, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: User,
    label: 'Name',
    value: 'Bolatito Heritage',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'bolatitoheritage25@gmail.com',
    href: 'mailto:bolatitoheritage25@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+2349132747510',
    href: 'tel:+2349132747510',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nigeria',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-foreground/5 dark:bg-white/10 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium hover:text-red-500 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">Connect with me:</p>
              <div className="flex gap-3">
                {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 rounded-full bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 text-sm font-medium transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`pl-10 h-12 rounded-xl border-2 transition-all duration-300 ${
                          focusedField === 'name'
                            ? 'border-red-500 shadow-[0_0_0_3px_rgba(255,0,0,0.1)]'
                            : 'border-border'
                        }`}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`pl-10 h-12 rounded-xl border-2 transition-all duration-300 ${
                          focusedField === 'email'
                            ? 'border-red-500 shadow-[0_0_0_3px_rgba(255,0,0,0.1)]'
                            : 'border-border'
                        }`}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`rounded-xl border-2 resize-none transition-all duration-300 ${
                        focusedField === 'message'
                          ? 'border-red-500 shadow-[0_0_0_3px_rgba(255,0,0,0.1)]'
                          : 'border-border'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
