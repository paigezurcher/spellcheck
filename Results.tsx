import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ResultText from "@/components/ResultText";

type TransformedData = {
  originalText: string;
  transformedText: string;
  highlightedHTML: string;
  stats: {
    spellingErrors: number;
    grammarIssues: number;
    grade: string;
  };
};

export default function Results() {
  const [_, navigate] = useLocation();
  const [data, setData] = useState<TransformedData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("transformedData");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleStartOver = () => {
    sessionStorage.removeItem("transformedData");
    navigate("/");
  };

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Essay Analysis Complete</h1>
        <p className="text-lg text-gray-600">We found several issues that need your attention</p>
        <div className="flex justify-center mt-4">
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="h-2 w-2 bg-orange-500 rounded-full mr-1"></span>
            Needs Revision
          </span>
        </div>
      </header>

      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">Corrected Essay</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="h-3 w-3 bg-secondary rounded-full mr-1"></span>
              <span className="text-xs text-gray-500">Spelling</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></span>
              <span className="text-xs text-gray-500">Grammar</span>
            </div>
          </div>
        </div>

        <ResultText highlightedHTML={data.highlightedHTML} />

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-indigo-800 mb-2">Summary of Changes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-md border border-indigo-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-secondary">{data.stats.spellingErrors}</span>
              <span className="text-xs text-gray-500">Spelling Errors</span>
            </div>
            <div className="bg-white p-3 rounded-md border border-indigo-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-yellow-500">{data.stats.grammarIssues}</span>
              <span className="text-xs text-gray-500">Grammar Issues</span>
            </div>
            <div className="bg-white p-3 rounded-md border border-indigo-100 flex flex-col items-center">
              <span className="text-2xl font-bold text-indigo-500">{data.stats.grade}</span>
              <span className="text-xs text-gray-500">Overall Grade</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button 
          onClick={handleStartOver} 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          Start Over
        </button>
        <button 
          className="bg-secondary hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Report
        </button>
      </div>
    </div>
  );
}