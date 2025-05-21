import { ThemeModeToggle } from "@/compoents/themes/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, World!</h1>
      <p className="mt-4 text-lg">Welcome to my portfolio website.</p>
      <div className="mt-8">
        <ThemeModeToggle />
      </div>
      <Button className="mt-4 " variant="default">
        Get Started
      </Button>
    </main>
  );
}
