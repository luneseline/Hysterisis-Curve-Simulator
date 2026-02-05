import { useState } from 'react';
import { Sparkles, Terminal, Activity, BookOpen, ClipboardList, Target, Trophy, PlayCircle, Home } from 'lucide-react';
import { SimulationCanvas } from './features/simulation/components/SimulationCanvas';
import { ControlPanel } from './features/simulation/components/ControlPanel';
import { BetterGraphics } from './features/simulation/components/BetterGraphics';
import { AimPage } from './features/pages/AimPage';
import { TheoryPage } from './features/pages/TheoryPage';
import { ProcedurePage } from './features/pages/ProcedurePage';
import { ResultPage } from './features/pages/ResultPage';
import { ReferencesPage } from './features/pages/ReferencesPage';
import { HomePage } from './features/pages/HomePage';

type Tab = 'simulation' | 'aim' | 'theory' | 'procedure' | 'result' | 'references' | 'home';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'simulation', label: 'Simulation', icon: PlayCircle },
    { id: 'aim', label: 'Aim', icon: Target },
    { id: 'theory', label: 'Theory', icon: Activity },
    { id: 'procedure', label: 'Procedure', icon: ClipboardList },
    { id: 'result', label: 'Result', icon: Trophy },
    { id: 'references', label: 'References', icon: BookOpen },
  ] as const;

  return (
    <div className="h-screen w-screen bg-background overflow-hidden flex flex-col relative">
      <BetterGraphics />

      {/* nav header */}
      {activeTab !== 'home' && (
        <header className="h-16 border-b border-white/10 bg-surface flex items-center px-6 justify-between shrink-0 z-10 relative">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-primary/20 p-2 rounded-lg border border-primary/50">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden md:block">
              <span className="text-primary neon-text">HYSTERESIS</span> Simulator <span className="text-xs align-top opacity-50">PRO</span>
            </h1>
          </div>

          {/* Navigation Tabs (excluding Home, as logo takes you there) */}
          <div className="flex bg-black/40 rounded-lg p-1 border border-white/5 overflow-x-auto mx-4 no-scrollbar">
            {tabs.filter(t => t.id !== 'home').map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              System Active
            </div>
            <Terminal className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer" />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-hidden relative">
        {activeTab === 'simulation' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left: Canvas Area */}
            <div className="lg:col-span-2 glass-panel p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
              <SimulationCanvas />
              <div className="absolute top-4 left-4">
                <div className="text-xs font-mono text-primary/50">SCOPE DISPLAY // SOURCE: INPUT</div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="lg:col-span-1 h-full overflow-hidden">
              <ControlPanel />
            </div>
          </div>
        ) : (
          <div className="h-full w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'home' && <HomePage onNavigate={(t) => setActiveTab(t)} />}
            {activeTab === 'aim' && <AimPage />}
            {activeTab === 'theory' && <TheoryPage />}
            {activeTab === 'procedure' && <ProcedurePage />}
            {activeTab === 'result' && <ResultPage />}
            {activeTab === 'references' && <ReferencesPage />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
