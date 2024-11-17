import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-8">
      <Separator />
      <div className="container mx-auto px-4 max-w-3xl py-4 text-muted-foreground flex justify-between">
        <p>&copy; 2023 My Blog</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
};

export { Footer };
