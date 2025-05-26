"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { lavishlyYours } from "@/lib/fonts/font";
import { NavLink } from "@/components/home/navlink";
import { ThemeSwitcher } from "@/components/themes/theme-toggle";
import Footer from "@/components/footer/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  interface FormField {
    name: string;
    value: string;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value }: FormField = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mailto link with form data
    const subject: string = encodeURIComponent(
      formData.subject || "Contact from Portfolio"
    );
    const body: string = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink: string = `mailto:hermankwamebour30@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setIsSubmitting(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-6">
            <h1
              className={`${lavishlyYours.className} text-4xl md:text-6xl font-bold text-primary`}
            >
              Let's Connect
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'd love to hear about your
              project and explore how we can work together to create something
              amazing.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          id="contact-info"
        >
          <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Drop me a line anytime
              </p>
              <a
                href="mailto:hermankwamebour30@gmail.com"
                className="text-sm text-primary hover:underline break-all"
              >
                hermankwamebour30@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Call for urgent matters
              </p>
              <a
                href="tel:+233245765540"
                className="text-sm text-primary hover:underline"
              >
                +233 24 576 5540
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based in West Africa
              </p>
              <span className="text-sm text-primary">Accra, Ghana</span>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground mb-3">
                I typically respond within
              </p>
              <span className="text-sm text-primary">24 hours</span>
            </CardContent>
          </Card>
        </section>

        {/* Main Contact Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          id="get-in-touch"
        >
          {/* Contact Form */}
          <Card className="bg-card/50 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Discussion"
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, ideas, or how we can work together..."
                    rows={6}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Why Contact Me */}
            <Card className="bg-card/50 border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Why Work With Me?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Full-Stack Expertise
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        From frontend interfaces to backend systems, I handle
                        the complete development lifecycle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Analytical Approach
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        My Earth Science background brings unique
                        problem-solving perspectives to technical challenges.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Team Leadership</h4>
                      <p className="text-sm text-muted-foreground">
                        Experience leading development teams and mentoring
                        junior developers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card/50 border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Connect on Social</h2>
                <div className="space-y-4">
                  <a
                    href="https://github.com/Herman100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors"
                  >
                    <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">GitHub</h4>
                      <p className="text-sm text-muted-foreground">
                        Check out my code and projects
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/herman-kwamebour/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors"
                  >
                    <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional network and updates
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-col gap-4">
              <Button asChild>
                <Link href="/cv" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  View My CV
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <NavLink href="/">View My Work</NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">
                  What's your typical response time?
                </h3>
                <p className="text-muted-foreground text-sm">
                  I typically respond to emails within 24 hours during weekdays.
                  For urgent matters, feel free to call me directly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">
                  Do you work on weekends?
                </h3>
                <p className="text-muted-foreground text-sm">
                  While I prefer to maintain work-life balance, I'm flexible for
                  urgent project needs and can accommodate different time zones.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">
                  What types of projects do you take on?
                </h3>
                <p className="text-muted-foreground text-sm">
                  I work on full-stack web applications, MVPs, team leadership
                  roles, and consulting projects. I'm particularly interested in
                  innovative solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">
                  Are you available for remote work?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely! I have extensive experience working remotely with
                  distributed teams and am comfortable with various
                  collaboration tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
