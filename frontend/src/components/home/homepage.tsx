"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Database, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { lavishlyYours } from "@/lib/fonts/font";
import { NavLink } from "./navlink";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 items-center text-center w-[300px] md:w-[600px] mx-auto">
          <div className="space-y-6 flex flex-col items-center">
            <h1
              className={`${lavishlyYours.className} lg:text-6xl text-5xl md:text-5xl font-bold text-primary hover:text-primary/80 transition-all duration-300`}
            >
              <Code className="h-16 w-16 mx-auto mb-4 text-primary hover:text-primary/80 transition-all duration-300" />
              Hello. I'm Herman.
            </h1>
            <p className="text-lg text-muted-foreground">
              I'm a Geoscientist & Fullstack Engineer building scalable software
              solutions one line of code at a time.
            </p>

            <div className="flex gap-4">
              <Button variant="outline">
                <NavLink href="/about">Learn More About Me</NavLink>
              </Button>
              <Button variant="default" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-12" id="projects">
          <h2 className="text-3xl font-bold text-foreground text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300  hover:scale-108">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Taskify</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Full-stack productivity web application built with React JS
                  and Firebase. Features complete CRUD operations and user
                  authentication for managing todo lists.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React JS</Badge>
                  <Badge variant="outline">Firebase</Badge>
                  <Badge variant="secondary">Authentication</Badge>
                  <Badge variant="outline">CRUD</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-108">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Unilang Learner</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Collaborative flashcards web application similar to Quizlet.
                  Led UI/UX design and implemented responsive design with full
                  CRUD functionality.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">UI/UX Design</Badge>
                  <Badge variant="outline">Collaboration</Badge>
                  <Badge variant="secondary">CRUD</Badge>
                  <Badge variant="secondary">Firebase Auth</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-108">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Portfolio Website</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Modern portfolio website built with MERN stack and Next.js.
                  Features JWT authentication, responsive design, and dynamic
                  content management.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">MERN Stack</Badge>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="secondary">JWT Auth</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-12" id="experience">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Experience Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  Current
                </Badge>
                <h3 className="text-xl font-bold mb-2">Fullstack Engineer</h3>
                <p className="text-primary font-medium mb-2">
                  FusionEdge Technologies
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Feb 2025 - Present
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Built 30-40% of MVP codebase</li>
                  <li>• Reduced testing overhead by 10+ hours weekly</li>
                  <li>• Led intern supervision and task execution</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  Previous
                </Badge>
                <h3 className="text-xl font-bold mb-2">Fullstack Developer</h3>
                <p className="text-primary font-medium mb-2">
                  Geia Technologies
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  May 2024 - Oct 2024
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lead Intern position</li>
                  <li>• MVP development and launch</li>
                  <li>• 20% increase in system reliability</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  Academic
                </Badge>
                <h3 className="text-xl font-bold mb-2">Teaching Assistant</h3>
                <p className="text-primary font-medium mb-2">
                  University of Ghana
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Nov 2022 - Oct 2023
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Student supervision and mentoring</li>
                  <li>• Built Python algorithms for research</li>
                  <li>• Library management and organization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  Training
                </Badge>
                <h3 className="text-xl font-bold mb-2">Software Engineering</h3>
                <p className="text-primary font-medium mb-2">
                  African Leadership Xcelerator
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Jan 2023 - Mar 2024
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Intensive software engineering program</li>
                  <li>• Full-stack development specialization</li>
                  <li>• Project-based learning approach</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-12" id="skills">
          <h2 className="text-3xl font-bold text-foreground text-center">
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-108">
              <CardContent className="p-8 text-center">
                <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="secondary">HTML/CSS</Badge>
                  <Badge variant="outline">C</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-108">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="outline">Express</Badge>
                  <Badge variant="secondary">Flask</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-108">
              <CardContent className="p-8 text-center">
                <Database className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-4">Tools & Systems</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="outline">Firebase</Badge>
                  <Badge variant="secondary">Linux</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to work on projects that make a real impact.
            Whether you need a fullstack engineer or want to collaborate on
            innovative solutions, let's connect!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <NavLink href="/about">More About Me</NavLink>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/cv">View Full CV</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
