import React, { useState } from 'react';
import { Play, Save, AlertTriangle, CheckCircle, Wand2, Terminal, Loader2, Sparkles } from 'lucide-react';
import { analyzeCode } from '../services/geminiService';

export const FunctionsView: React.FC = () => {
  const [code, setCode] = useState(`exports.scheduledFunction = onSchedule("every 5 minutes", async (event) => {
    // This function will run every 5 minutes
    const users = await db.collection('users').where('status', '==', 'inactive').get();
    
    users.forEach(doc => {
        console.log("Deleting inactive user", doc.id);
        doc.ref.delete();
    });
});`);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeCode(code);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex h-full">
        {/* Editor Area */}
      <div className="flex-1 flex flex-col border-r border-console-border">
        <div className="h-14 border-b border-console-border flex items-center justify-between px-4 bg-white">
            <div className="flex items-center space-x-2">
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">index.js</span>
                <span className="text-xs text-gray-400 ml-2">Last saved 2m ago</span>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2 px-3 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md text-sm font-medium transition-colors"
                >
                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                    <span>AI Review</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                    <Save size={16} />
                    <span>Deploy</span>
                </button>
            </div>
        </div>
        
        <div className="flex-1 relative bg-slate-900 text-slate-300 font-mono text-sm overflow-hidden">
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent p-6 resize-none focus:outline-none leading-6"
                spellCheck={false}
            />
        </div>
        
        {/* Console / Output */}
        <div className="h-48 bg-white border-t border-console-border flex flex-col">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center space-x-2">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase">Console Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs text-gray-600 overflow-auto">
                <div className="flex space-x-2">
                    <span className="text-green-600">I</span>
                    <span>[2023-10-25T14:32:00.000Z] Function execution started</span>
                </div>
                 <div className="flex space-x-2">
                    <span className="text-green-600">I</span>
                    <span>[2023-10-25T14:32:01.200Z] Cleaned up 0 inactive users</span>
                </div>
                 <div className="flex space-x-2">
                    <span className="text-green-600">I</span>
                    <span>[2023-10-25T14:32:01.250Z] Function execution took 1250ms</span>
                </div>
            </div>
        </div>
      </div>

      {/* Analysis Sidebar */}
      {analysis && (
        <div className="w-96 bg-white flex flex-col border-l border-console-border animate-slide-in-right">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 flex items-center">
                    <Sparkles size={16} className="text-indigo-500 mr-2" />
                    AI Analysis
                </h3>
                <button onClick={() => setAnalysis(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="p-6 overflow-auto flex-1 prose prose-sm max-w-none prose-indigo">
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {analysis}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button className="w-full py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Apply Suggestions
                </button>
            </div>
        </div>
      )}
    </div>
  );
};