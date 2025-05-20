
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-dark p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-theme-red/10 p-3">
            <Music className="h-10 w-10 text-theme-red" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-glow text-theme-red">404</h1>
        <p className="text-xl text-white mb-8">This track doesn't exist</p>
        <Button 
          className="red-gradient hover:bg-theme-red/90" 
          size="lg" 
          asChild
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
