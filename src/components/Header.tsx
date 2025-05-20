
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full px-6 py-4 bg-theme-dark border-b border-theme-red/20">
      <div className="flex items-center gap-2">
        <Music className="h-8 w-8 text-theme-red" />
        <h1 className="text-2xl font-bold text-white">
          <span className="text-theme-red">Lyrics</span>Master
        </h1>
      </div>
      <nav>
        <Button variant="ghost" className="text-white hover:text-theme-red hover:bg-theme-dark/50">
          About
        </Button>
      </nav>
    </header>
  );
};

export default Header;
