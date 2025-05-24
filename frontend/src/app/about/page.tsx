"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Mail,
  Phone,
  GraduationCap,
  User,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { lavishlyYours } from "@/lib/fonts/font";
import { NavLink } from "@/components/home/navlink";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8" id="intro">
          <div className="space-y-6">
            <h1
              className={`${lavishlyYours.className} text-4xl md:text-6xl font-bold text-primary`}
            >
              {`<>`} Herman
            </h1>
            <p
              className={` lg:text-3xl text-xl md:text-2xl text-muted-foreground lg:max-w-3xl max-w-xl mx-auto leading-relaxed`}
            >
              I'm Herman. A fullstack engineer with a passion for building
              scalable solutions to make the world a better place through
              technology.
            </p>
          </div>
        </section>

        {/* Introduction Card */}
        <section className="space-y-12">
          <Card className="bg-card/50 border-0 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">My Story</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    With a unique background combining Earth Science and
                    Software Engineering, I bring both analytical thinking and
                    technical expertise to every project. My journey from
                    studying petroleum geology to becoming a fullstack engineer
                    has shaped my approach to problem-solving and innovation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Currently contributing to MVPs and leading development teams
                    at FusionEdge Technologies, I'm passionate about building
                    scalable solutions that make a real impact. My diverse
                    background allows me to approach challenges from multiple
                    perspectives, combining scientific rigor with creative
                    engineering solutions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Mail className="h-4 w-4" />
                      hermankwamebour30@gmail.com
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Phone className="h-4 w-4" />
                      +233245765540
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-primary/20 dark:bg-primary/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Code className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">Problem Solver</h3>
                      <p className="text-muted-foreground">
                        Combining analytical thinking with creative solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Education Section */}
        <section className="space-y-12" id="education">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Educational Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">
                    BSc Earth Science, Petroleum Major
                  </h3>
                </div>
                <p className="text-primary font-medium mb-2">
                  University of Ghana
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Sep 2018 - Oct 2022 | Accra, Ghana
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Specialized in petroleum geology with comprehensive coursework
                  in geological mapping, seismic interpretation, and advanced
                  research methods. This foundation built strong analytical and
                  problem-solving skills that translate perfectly to software
                  engineering challenges.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Geological Mapping</Badge>
                  <Badge variant="outline">Research Methods</Badge>
                  <Badge variant="secondary">Data Analysis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Software Engineering</h3>
                </div>
                <p className="text-primary font-medium mb-2">
                  African Leadership Xcelerator
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Jan 2023 - Mar 2024 | Nairobi, Kenya
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Intensive program covering full-stack development, DevOps, and
                  systems engineering. Project-based learning approach with
                  real-world applications, focusing on modern development
                  practices and collaborative software engineering.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Full-Stack Development</Badge>
                  <Badge variant="outline">DevOps</Badge>
                  <Badge variant="secondary">Systems Engineering</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CV Button Card */}
        <section className="flex justify-center">
          <Card className="bg-card border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">Want to know more?</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Explore my complete professional journey, skills, and
                achievements in detail.
              </p>
              <Button asChild>
                <Link href="/cv">Read Full CV</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Philosophy & Approach */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-foreground">
            My Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-0 shadow-md text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Analytical Thinking</h3>
                <p className="text-muted-foreground text-sm">
                  My Earth Science background taught me to analyze complex
                  systems and break down problems into manageable components.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Collaborative Leadership
                </h3>
                <p className="text-muted-foreground text-sm">
                  Experience in supervising interns and leading development
                  teams, fostering growth and maintaining high code quality
                  standards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-0 shadow-md text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Continuous Innovation
                </h3>
                <p className="text-muted-foreground text-sm">
                  Always learning new technologies and methodologies to deliver
                  cutting-edge solutions that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for a dedicated fullstack engineer or want to
            discuss innovative project ideas, I'm always excited to connect with
            fellow creators and problem-solvers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <NavLink href="/">View My Work</NavLink>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hermankwamebour30@gmail.com">Get In Touch</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
