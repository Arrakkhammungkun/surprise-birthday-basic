import { memo } from "react";
import { motion } from "framer-motion";

const floatingEmoji1 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [-1, 3, -1], // Horizontal movement
        y: [0, -10, 0],    // Vertical movement
        transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatingEmoji2 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [0, 0, 0],      // No horizontal movement
        y: [-10, 10, -10], // Vertical movement
        transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatingEmoji3 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [-20, 20, -20], // Horizontal movement
        y: [10, -10, 10],  // Vertical movement
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatingEmoji4 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [0, -0, 0],  // Horizontal movement
        y: [10, -20, 10],  // Vertical movement
        transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatingEmoji5 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [0, -0, 0],  // Horizontal movement
        y: [5, 0, 5],  // Vertical movement
        transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const floatingEmoji6 = {
    initial: { x: 0, y: 0 },
    animate: {
        x: [2, -0, 2],  // Horizontal movement
        y: [5, -20, 5],  // Vertical movement
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};


const Header = memo(({ content: { title, subtitle } }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative text-[#FFB0B0]"
    >
        {/* Floating Emojis */}
        <motion.div
            className="absolute left-[-15px] top-[-20px] font-bold text-6xl"
            variants={floatingEmoji1}
            initial="initial"
            animate="animate"
        >
            🎉
        </motion.div>
        <motion.div
            className="absolute right-[25px] top-[10px] font-bold text-4xl"
            variants={floatingEmoji2}
            initial="initial"
            animate="animate"
        >
            🎂
        </motion.div>
        <motion.div
            className="absolute left-[35px] bottom-[-80px] font-bold text-3xl"
            variants={floatingEmoji5}
            initial="initial"
            animate="animate"
        >
            ⭐️
        </motion.div>
        <motion.div
            className="absolute right-[30px] bottom-[-370px] font-bold text-[50px]"
            variants={floatingEmoji6}
            initial="initial"
            animate="animate"
        >
            ✨
        </motion.div>
        <motion.div
            className="absolute right-[40px] bottom-[-30px] font-bold text-8xl"
            variants={floatingEmoji4}
            initial="initial"
            animate="animate"
        >
            🎈
        </motion.div>

        {/* Header Content */}
        <h1 className="text-8xl font-extrabold w-[350px] text-wrap font-['Kanit']">
            {title}
        </h1>
        <h1 className="text-6xl font-bold w-[350px] text-wrap font-['Kanit'] text-center">
            {subtitle}
        </h1>
    </motion.div>
));

export default Header;
