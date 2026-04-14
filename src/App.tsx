import Taskbar from './components/Taskbar/Taskbar';
import bgImage from './assets/bg.png';
import Desktop from './components/Desktop/Desktop';
import './App.css';

function App() {
  return (
    <div className="h-screen w-full bg-white relative overflow-hidden flex flex-col font-mono">
      <main 
        className="flex-1 relative w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      >
        <div className="absolute inset-0 bg-gray-100/10 backdrop-blur-[2px] -z-10"></div>
        
        <Desktop />
      </main>
      
      <Taskbar />
    </div>
  );
}

export default App;