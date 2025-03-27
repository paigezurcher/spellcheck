import { Card } from "@/components/ui/card";

interface ResultTextProps {
  highlightedHTML: string;
}

export default function ResultText({ highlightedHTML }: ResultTextProps) {
  return (
    <Card className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6 text-gray-800 leading-relaxed min-h-[200px]">
      <div dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
    </Card>
  );
}