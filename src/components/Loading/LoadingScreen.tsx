import { motion } from "framer-motion";
import RLogoLoading from "./RLogoLoading";

interface LoadingScreenProps {
  message?: string;
  color?: string;
  showProgress?: boolean;
  progress?: number;
}

export default function LoadingScreen({ 
  message = "",
  color = "#000000",
  showProgress = false,
  progress = 0
}: LoadingScreenProps) {
  
  return (
    <motion.div 
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <RLogoLoading 
          size={180} 
          color={color}
          strokeWidth={3.5}
          loop={true}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {message && (
            <p className="text-slate-700 mb-4 font-medium tracking-wide">{message}</p>
          )}
          
          {showProgress && (
            <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </motion.div>

        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}