
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FileText } from "lucide-react";

type LyricsFormProps = {
  onGenerateLyrics: (lyrics: string) => void;
  isGenerating: boolean;
};

const genres = [
  "Pop", "Rock", "Hip Hop", "R&B", "Country", 
  "Electronic", "Jazz", "Folk", "Metal", "Indie"
];

const LyricsForm = ({ onGenerateLyrics, isGenerating }: LyricsFormProps) => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("");
  const [complexity, setComplexity] = useState([50]);
  const [mood, setMood] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your lyrics",
        variant: "destructive"
      });
      return;
    }

    if (!genre) {
      toast({
        title: "Genre Required",
        description: "Please select a music genre",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we'd call an API here
    // For now, we'll generate mock lyrics
    setTimeout(() => {
      const mockLyrics = generateMockLyrics(topic, genre, mood, complexity[0]);
      onGenerateLyrics(mockLyrics);
    }, 2000);
  };

  return (
    <Card className="w-full border-theme-red/20 bg-theme-dark shadow-lg shadow-theme-red/5">
      <CardHeader className="border-b border-theme-red/10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5 text-theme-red" />
          Create New Lyrics
        </CardTitle>
        <CardDescription>Fill in the details to generate your custom lyrics</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium">
              Topic or Theme
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Love, heartbreak, adventure..."
              className="bg-secondary border-theme-red/20 focus:border-theme-red focus-visible:ring-theme-red"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="genre" className="block text-sm font-medium">
              Music Genre
            </label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-secondary border-theme-red/20">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="mood" className="block text-sm font-medium">
              Mood (Optional)
            </label>
            <Input
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Happy, sad, energetic..."
              className="bg-secondary border-theme-red/20 focus:border-theme-red focus-visible:ring-theme-red"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium">
                Complexity
              </label>
              <span className="text-xs text-muted-foreground">{complexity[0]}%</span>
            </div>
            <Slider
              value={complexity}
              onValueChange={setComplexity}
              max={100}
              step={1}
              className="[&>span:first-child]:bg-theme-red"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full red-gradient hover:bg-theme-red/90 transition-all"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Lyrics"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Mock function to generate lyrics 
const generateMockLyrics = (topic: string, genre: string, mood: string, complexity: number): string => {
  const topics = {
    love: [
      "Your love is a symphony, playing notes on my heart",
      "In the melody of your embrace, I found my peace",
      "Like stars aligned in the night, our love shines bright"
    ],
    heartbreak: [
      "Shattered pieces of what we were, scattered on the floor",
      "The silence echoes louder than our last goodbye",
      "Memory fades but the pain remains, a ghost of what was"
    ],
    default: [
      "Journey through the unknown, seeking what lies ahead",
      "Voices in the distance, calling out my name",
      "Time stands still in moments like these, frozen in wonder"
    ]
  };

  const lowerTopic = topic.toLowerCase();
  const versesKey = lowerTopic.includes("love") 
    ? "love" 
    : lowerTopic.includes("heart") || lowerTopic.includes("break")
      ? "heartbreak"
      : "default";
      
  const verses = topics[versesKey as keyof typeof topics];
  
  // More complex lyrics have more verses and structure
  const verseCount = Math.max(2, Math.floor(complexity / 25));
  
  let lyrics = `[${genre.toUpperCase()} - ${mood ? mood.toUpperCase() + " VIBE" : "ANTHEM"}]\n\n`;
  lyrics += "VERSE 1:\n";
  
  for (let i = 0; i < verseCount; i++) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    lyrics += verses[randomIndex] + "\n";
    if (complexity > 30) lyrics += verses[(randomIndex + 1) % verses.length] + "\n";
    lyrics += "\n";
    
    if (i === 0 || (complexity > 60 && i < verseCount - 1)) {
      lyrics += "CHORUS:\n";
      lyrics += `${topic}, oh ${topic}\n`;
      lyrics += `This feeling never ends\n`;
      lyrics += `${topic}, my ${topic}\n`;
      lyrics += `Where do we go from here?\n\n`;
    }
    
    if (i < verseCount - 1) {
      lyrics += `VERSE ${i + 2}:\n`;
    }
  }
  
  if (complexity > 75) {
    lyrics += "BRIDGE:\n";
    lyrics += "Breaking through the silence\n";
    lyrics += "Finding our way back home\n";
    lyrics += "Through the darkness and light\n";
    lyrics += "We're never alone\n\n";
    
    lyrics += "CHORUS:\n";
    lyrics += `${topic}, oh ${topic}\n`;
    lyrics += `This feeling never ends\n`;
    lyrics += `${topic}, my ${topic}\n`;
    lyrics += `Where do we go from here?\n\n`;
  }
  
  lyrics += "OUTRO:\n";
  lyrics += verses[Math.floor(Math.random() * verses.length)];
  
  return lyrics;
};

export default LyricsForm;
