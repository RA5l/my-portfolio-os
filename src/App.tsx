import Taskbar from './components/Taskbar/Taskbar';
import bgImage from './assets/bg.png';
import './App.css'

function App() {
  return (
    <div className="h-screen w-full bg-white relative overflow-hidden flex flex-col font-mono">
      {/*Desktop*/}
      <main className="flex-1 relative w-full">
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative group">
      <div className="absolute -inset-4 bg-gray-100/50 rounded-full blur-2xl group-hover:bg-gray-200/50 transition-all duration-700"></div>
      <img src={bgImage} alt="Raseel Mohammed" />
    </div>
  </div>
</main>
      <Taskbar />
    </div>
  )

 
}

export default App
