
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Clipboard, Download, Music } from "lucide-react";

type LyricsDisplayProps = {
  lyrics: string;
};

const LyricsDisplay = ({ lyrics }: LyricsDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Lyrics have been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadLyrics = () => {
    // Extract song title from lyrics to use as filename
    const songTitleMatch = lyrics.match(/"([^"]+)"/);
    const songTitle = songTitleMatch ? songTitleMatch[1].toLowerCase().replace(/\s+/g, '-') : 'lyrics';
    
    const element = document.createElement("a");
    const file = new Blob([lyrics], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${songTitle}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Downloaded",
      description: "Lyrics have been downloaded successfully",
    });
  };

  // Function to format the lyrics with line breaks preserved
  const formatLyrics = () => {
    return lyrics.split('\n').map((line, index) => {
      // Song title styling (assumes title is in quotes at the beginning)
      if (index === 0 && line.includes('"')) {
        const titleParts = line.split('"');
        if (titleParts.length >= 3) {
          return (
            <p key={index} className="mb-1 font-bold text-xl">
              <span className="text-theme-red">"{titleParts[1]}"</span>
              <span>{titleParts[2]}</span>
            </p>
          );
        }
      }
      
      // Standard styling
      return (
        <p 
          key={index} 
          className={`mb-1 ${line.includes('VERSE') || line.includes('CHORUS') || line.includes('BRIDGE') || line.includes('OUTRO') ? 
            'font-bold text-theme-red mt-2' : ''}`}
        >
          {line || <br />}
        </p>
      );
    });
  };

  return (
    <Card className="w-full border-theme-red/20 bg-theme-dark shadow-lg shadow-theme-red/5">
      <CardHeader className="border-b border-theme-red/10 flex flex-row justify-between items-center">
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-theme-red" />
          Your Lyrics
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1 border-theme-red/20 hover:bg-theme-red hover:text-white" 
            onClick={copyToClipboard}
          >
            <Clipboard className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1 border-theme-red/20 hover:bg-theme-red hover:text-white" 
            onClick={downloadLyrics}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] lg:h-[500px] w-full px-6 py-4">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {formatLyrics()}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-theme-red/10 py-3 text-xs text-muted-foreground">
        Edit or use these lyrics as inspiration for your next hit song.
      </CardFooter>
    </Card>
  );
};

export default LyricsDisplay;
