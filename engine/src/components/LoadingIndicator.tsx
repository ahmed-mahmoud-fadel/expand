import { motion } from "framer-motion"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const LoadingIndicator = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#0008",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "5rem",
        color: "#333",
      }}
      animate={{
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 1,
        easings: ["linear"],
        repeat: Infinity,
      }}
      >
        <AiOutlineLoading3Quarters />
      </motion.div>
    </div>
  );
}
 
export default LoadingIndicator;