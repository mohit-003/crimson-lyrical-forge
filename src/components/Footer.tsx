
import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-theme-red/20 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-theme-red" />
          <p className="text-sm text-muted-foreground">
            <span className="text-theme-red font-medium">Lyrics</span>Master © {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Creating musical magic with AI</p>
      </div>
    </footer>
  );
};

export default Footer;
