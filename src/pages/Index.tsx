
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LyricsForm from "@/components/LyricsForm";
import LyricsDisplay from "@/components/LyricsDisplay";
import { Music } from "lucide-react";

const Index = () => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLyrics = (generatedLyrics: string) => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setLyrics(generatedLyrics);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-theme-red/10 p-3">
              <Music className="h-8 w-8 text-theme-red" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-theme-red">AI-Powered</span> Lyrics Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create unique, customized lyrics for your songs with our advanced AI. 
            Choose your genre, topic, and mood - let the creativity flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LyricsForm onGenerateLyrics={handleGenerateLyrics} isGenerating={isGenerating} />
          
          {lyrics ? (
            <LyricsDisplay lyrics={lyrics} />
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] border border-dashed border-theme-red/20 rounded-lg bg-secondary/30">
              <div className="text-center p-6">
                <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">No Lyrics Generated Yet</h3>
                <p className="text-muted-foreground">
                  Fill out the form and click "Generate Lyrics" to create your custom lyrics.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
