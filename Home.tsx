import EssayForm from "@/components/EssayForm";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [_, navigate] = useLocation();

  const handleSubmit = async (text: string) => {
    try {
      const response = await apiRequest("POST", "/api/transform", { text });
      const data = await response.json();
      sessionStorage.setItem("transformedData", JSON.stringify(data));
      navigate("/results");
    } catch (error) {
      console.error("Failed to transform text:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Essay Checker Pro</h1>
        <p className="text-lg text-gray-600">Improve your writing with our advanced spell checking technology</p>
        <div className="flex justify-center mt-4">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
            AI-Powered
          </span>
        </div>
      </header>

      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-2">How It Works</h2>
          <p className="text-gray-600">
            Our advanced algorithm will scan your essay for grammatical errors, spelling mistakes, and suggest improvements to enhance your writing. Simply paste your text below and click "Check My Essay".
          </p>
        </div>

        <EssayForm onSubmit={handleSubmit} />
      </section>

      <section className="text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">Results in seconds</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">100% Secure</h3>
            <p className="text-gray-600 text-sm">Your essays are private</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800">Smart Suggestions</h3>
            <p className="text-gray-600 text-sm">Contextual improvements</p>
          </div>
        </div>
      </section>
    </div>
  );
}