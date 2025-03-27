import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EssayFormProps {
  onSubmit: (text: string) => void;
}

export default function EssayForm({ onSubmit }: EssayFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    const wordCount = trimmedText.split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount < 5) {
      setError("Please enter at least 5 words to continue.");
      return;
    }
    
    setError("");
    onSubmit(trimmedText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="essay-input" className="block text-sm font-medium text-gray-700 mb-1">
          Your Essay
        </Label>
        <Textarea
          id="essay-input"
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-800"
          placeholder="Paste or type your essay here... (minimum 5 words)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-primary hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors duration-200"
        >
          <span className="mr-2">Check My Essay</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </form>
  );
}