import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">{children}</main>
      <Footer />
    </div>
  );
};

export { Layout };
