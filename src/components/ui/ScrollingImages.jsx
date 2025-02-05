import React, { useState } from "react";
import { motion } from "framer-motion";
import { images_history } from "../../assets/mock/mock"; // import ข้อมูลที่ประกอบไปด้วยภาพและข้อความ

const ScrollingImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images_history.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images_history.length) % images_history.length);
  };

  return (
    <div className="relative">
      <motion.div
        className="w-full h-64 overflow-hidden"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="flex">
          {images_history.map((image, index) => (
            <div
              key={`${image.src}-${index}`} // ใช้ key ที่ไม่ซ้ำ
              className="w-full flex-shrink-0 relative"
            >
              <img
                src={image.src}
                alt={`image-${image.id}`}
                className="w-full h-full object-cover"
              />
              {/* ข้อความที่แสดงบนภาพ */}
              <div className="absolute bottom-10 w-full text-center text-white text-xl font-bold bg-black bg-opacity-50 py-2">
                {image.text}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ปุ่มสำหรับเปลี่ยนรูป */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          onClick={prevImage}
          className="bg-gray-600 text-white px-4 py-2 rounded-full"
        >
          Prev
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          onClick={nextImage}
          className="bg-gray-600 text-white px-4 py-2 rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ScrollingImages;
