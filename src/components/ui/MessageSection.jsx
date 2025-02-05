import { forwardRef } from "react";
import { motion } from "framer-motion";
import star from "../../assets/icon/stars.png"
const floatingEmoji1 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [-1, 3, -1], // Horizontal movement
        y: [0, -6, 0],    // Vertical movement
        transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};
const MessageSection = forwardRef(({ isInView, data }, ref) => (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.2 }}
        className="bg-[#fffffff9] shadow-sm rounded-lg p-2 mt-2 relative overflow-visible "
    >   
        <motion.div
            className="absolute left-[-6px] top-[-1px] font-bold text-6xl "
            variants={floatingEmoji1}
            initial="initial"
            animate="animate"
        >
            <img src={star} alt="" className="w-6 h-6" />
        </motion.div>
        {Array.isArray(data) ? (
            <ul>
                {data.map((message, index) => (
                    <li key={index} className="text-lg p-2 text-start text-gray-700">
                        {message}
                    </li>
                ))}
            </ul>
        ) : null}
    </motion.div>
));

export default MessageSection;
