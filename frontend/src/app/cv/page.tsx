import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siGithub } from "simple-icons";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Code,
  Database,
  Globe,
  Zap,
  Settings,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/compoents/themes/theme-toggle";

export default function CurriculumVitae() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <ThemeSwitcher />
        </div>

        {/* Header Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Herman Kwamebour
              </h1>
              <p className="text-xl text-foreground mb-8">Fullstack Engineer</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+233245765540</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>hermankwamebour30@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>linkedin.com/in/herman-kwamebour/</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Github className="h-5 w-5 text-primary" />
                  <span>github.com/Herman100</span>
                </div>

                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Professional Summary
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experienced Fullstack Engineer with a unique background combining
              Earth Science and Software Engineering. Currently contributing
              30-40% of MVP codebase at FusionEdge Technologies while leading
              development teams. Proven track record in building scalable web
              applications, improving system reliability by 20%, and reducing
              testing overhead by 10+ hours weekly through systematic API
              documentation and optimization.
            </p>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-8">
              {/* Current Position */}
              <div className="border-l-4 border-primary pl-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Fullstack Engineer
                    </h3>
                    <p className="text-primary font-semibold">
                      FusionEdge Technologies
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Feb. 2025 – Present</span>
                    <Badge variant="secondary" className="ml-2">
                      Current
                    </Badge>
                  </div>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Full-Stack Development:
                      </strong>{" "}
                      Built and maintained 30-40% of the codebase using Node.js,
                      Express, Appwrite, and Next.js, directly contributing to
                      MVP launch and scalability.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        API Documentation & Efficiency:
                      </strong>{" "}
                      Systematically documented all API endpoints, reducing
                      testing overhead by 2+ hours/day (10+ hours weekly) and
                      accelerating team productivity.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Debugging & System Reliability:
                      </strong>{" "}
                      Resolved critical frontend/backend issues, improving
                      system reliability by 20% and user satisfaction by 15%
                      through optimized performance and UX adjustments.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Infrastructure & Security:
                      </strong>{" "}
                      Redesigned database schemas, configured SMTP services, and
                      implemented OTP authentication to enhance security and
                      user flows.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Intern Leadership:
                      </strong>{" "}
                      Led and supervised interns in task execution, aligning
                      contributions with MVP development and market launch
                      goals.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Previous Position */}
              <div className="border-l-4 border-muted pl-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Fullstack Developer
                    </h3>
                    <p className="text-primary font-semibold">
                      Geia Technologies
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">May 2024 - Oct. 2024</span>
                  </div>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Lead Intern:</strong>{" "}
                      Led and supervised other interns in carrying out assigned
                      tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        MVP Development:
                      </strong>{" "}
                      Contributed to the development and successful launch of
                      the company's MVP, helping the team go to market
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Feature Development and Debugging:
                      </strong>{" "}
                      Developed features and debugged both frontend and backend
                      environments using the MERN stack, resulting in a 20%
                      increase in system reliability
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Backend and Frontend Stability:
                      </strong>{" "}
                      Ensured stability of both environments by implementing new
                      features and fixing critical bugs, resulting in a 15% user
                      satisfaction improvement
                    </span>
                  </li>
                </ul>
              </div>

              {/* Teaching Assistant */}
              <div className="border-l-4 border-muted pl-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Undergraduate Teaching Assistant
                    </h3>
                    <p className="text-primary font-semibold">
                      University of Ghana
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Nov. 2022 – Oct. 2023</span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span className="text-sm">Accra, Ghana</span>
                  </div>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Assisted in the supervision of students during class and
                      after class offering further explanations as required
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Managing and sorting library books by categories to save
                      time on looking for relevant materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Assisted a lecturer by building a small algorithm using
                      Python to save about a week of manual work in selecting
                      relevant samples from drilled cores for research
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Featured Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Taskify Project */}
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Taskify</h3>
                      <p className="text-sm text-muted-foreground">
                        ALX Africa - Feb. 2024
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>
                      • Designed the fullstack web application using Figma
                      design tools
                    </li>
                    <li>
                      • Built and deployed the full stack web application that
                      allows users to create todo list and manage their
                      productivity using React JS and Firebase
                    </li>
                    <li>
                      • The app supports full CRUD (Create, Read, Update,
                      Delete) and includes user authentication
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React JS</Badge>
                    <Badge variant="outline">Firebase</Badge>
                    <Badge variant="secondary">Authentication</Badge>
                    <Badge variant="outline">Figma</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Unilang Learner Project */}
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Unilang Learner</h3>
                      <p className="text-sm text-muted-foreground">
                        ALX Africa - Mar. 2024
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li>
                      • Collaborated on a specialization project to build a
                      flashcards web app similar to Quizlet
                    </li>
                    <li>
                      • Acted as the Lead designer on the project in terms of
                      UI/UX and responsive design
                    </li>
                    <li>
                      • Git and Github for source control with card review and
                      fully functioning CRUD
                    </li>
                    <li>
                      • Presented virtually to ALX staff for review as
                      requirement project
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">UI/UX Design</Badge>
                    <Badge variant="outline">Collaboration</Badge>
                    <Badge variant="secondary">CRUD</Badge>
                    <Badge variant="outline">Git/GitHub</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Technical Skills */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Technical Skills
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-foreground">Languages</h3>
                  </div>
                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      JavaScript
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      HTML/CSS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      C
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-foreground">Frameworks</h3>
                  </div>
                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      Node.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      React
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      Next.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Express
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      Flask
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Database className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-foreground">Databases</h3>
                  </div>
                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      MongoDB
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Firebase
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      MySQL
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Appwrite
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Settings className="h-6 w-6 text-primary" />
                    <h3 className="font-bold text-foreground">
                      Tools & Systems
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      Git
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Docker
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="w-full justify-center py-3"
                    >
                      VS Code
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-3"
                    >
                      Linux
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
            </div>

            <div className="space-y-6">
              {/* University Degree */}
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        BSc Earth Science, Petroleum Major
                      </h3>
                      <p className="text-primary font-semibold">
                        University of Ghana
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Sep. 2018 – Oct. 2022</span>
                      <MapPin className="h-4 w-4 ml-2" />
                      <span className="text-sm">Accra, Ghana</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Specialized in petroleum geology with comprehensive
                    coursework in Academic Research, Geology, Mineralogy, Hydro,
                    Structural & Petroleum Geology, Research Methods, Petrel
                    Software, QGIS, Geological Mapping, Seismic Interpretation,
                    Crystallography, and Petrology.
                  </p>
                </CardContent>
              </Card>

              {/* Software Engineering Program */}
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        Software Engineering
                      </h3>
                      <p className="text-primary font-semibold">
                        African Leadership Xcelerator
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Jan. 2023 – Mar. 2024</span>
                      <MapPin className="h-4 w-4 ml-2" />
                      <span className="text-sm">Nairobi, Kenya</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Intensive program covering Low and Higher Programming,
                    Frontend Specialization, DevOps and Systems. Comprehensive
                    training in Python, JavaScript, C, Linux, CLI, MySQL, React,
                    TypeScript, Testing, Scripting, Deployment, Automation,
                    Networking, and Debugging.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            This CV was last updated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
