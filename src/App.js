import { _birthdayMessages, _messages ,_messages1,} from "../src/assets/mock/mock";
import { useRef, useState,useEffect } from "react";
import { useInView } from "framer-motion";
import  _albums  from "./assets/images/mybaby.png";
import { useModal } from "./hooks/useModal";
import { Header, MessageSection, StackCard} from "./components/ui";
import { MemoryZone } from "./components/common";
import ScrollingImages from "./components/ui/ScrollingImages"
import musicFile from "./assets/music/song2.mp3";
import img_song from "./assets/icon/img_music.jpg"
import { motion } from "framer-motion";
import  play1  from "./assets/icon/play.png"
import  stop1  from "./assets/icon/stop.png"
import  next1  from "./assets/icon/Next11.svg"
import  next2  from "./assets/icon/Next22.svg"
import video1 from "./assets/videos/video.mp4"
import { div } from "framer-motion/client";
import img_mybabe from "./assets/images/S.jpg"
import { v4 as uuidv4 } from "uuid"; 
function App() {
    const { isModalVisible, currentImage, openModal, closeModal } = useModal()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordFields, setPasswordFields] = useState(['', '', '', '']); // Hook ที่เพิ่มมา
    const videoRef = useRef(null);
    const [hearts, setHearts] = useState([]);
    const handleInputChange = (value, index) => {
        const newFields = [...passwordFields];
        if (value.length <= 1) {
            newFields[index] = value;
            setPasswordFields(newFields);

            // ย้ายไปช่องถัดไปถ้าใส่ตัวเลขแล้ว
            if (value && index < 3) {
                document.getElementById(`field-${index + 1}`).focus();
            }
        }
    };
    const handlePasswordSubmit = () => {
        const enteredPassword = passwordFields.join('');
        if (enteredPassword === '0702') {
            setIsAuthenticated(true);
            dropHearts()
            setTimeout(() => {
                videoRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 300); 
 
            
        } else {
            alert('รหัสผ่านไม่ถูกต้อง');
        }
    };
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    


    const togglePlay = () => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const startDate = new Date("2024-12-09T00:00:00"); // กำหนดวันเริ่มคบกัน
    
   
    const getTimeElapsed = () => {
        const startDate = new Date("2024-12-09T00:00:00");
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
    
        
        if (months < 0) {
            years -= 1;
            months += 12;
        }
    
        
        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // วันสุดท้ายของเดือนก่อน
            days += prevMonth.getDate();
        }
    
        const diff = Math.floor((now - startDate) / 1000);
       
        const hours = Math.floor(diff % (24 * 3600) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        const format = (num) => num.toString().padStart(2, '0');
        
        return { years, 
            months, 
            days:format(days), 
            hours:format( hours), 
            minutes:format( minutes) , 
            seconds:format(seconds) };
    };

    const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed());
    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.ontimeupdate = () => {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          };
        }
    }, []);

    const handleTimeUpdate = () => {
     
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progress = (currentTime / duration) * 100;
        console.log(`Current Progress: ${progress}%`);
      };
    
      const handleSeek = (e) => {
        if (audioRef.current) {
          const rect = e.target.getBoundingClientRect();
          const seekTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
          audioRef.current.currentTime = seekTime;
        }
      };
      
      

    
    const messageRef = useRef(null);
    const memoryZoneRef = useRef(null);

    const isInViewMessageRef = useInView(messageRef, {
        once: true,
        amount: 0.2,
    });

    const isInViewMemoryZoneRef = useInView(memoryZoneRef, {
        once: true,
        amount: 0.2,
    });

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    useEffect(() => {
        const interval = setInterval(() => {
          setTimeElapsed(getTimeElapsed());
        }, 1000);
    
        return () => clearInterval(interval); 

        
      }, []);


      const dropHearts = () => {
        const newHearts = Array.from({ length: 90 }, () => {
          const id = uuidv4(); // ใช้ uuid เพื่อสร้าง id ที่ไม่ซ้ำ
    
          // ตั้งเวลาให้หัวใจหายไปหลังจาก 10 วินาที
          setTimeout(() => {
            setHearts((prev) => prev.filter((heart) => heart.id !== id));
          }, 10000);
    
          return {
            id,
            left: Math.random() * window.innerWidth, // ตำแหน่งแนวนอนสุ่ม
            delay: Math.random() * 3, // หน่วงเวลาสุ่ม 0 - 3 วินาที
            duration: 5 + Math.random() * 5, // ความเร็วตกสุ่ม (5 - 10 วินาที)
          };
        });
    
        setHearts((prev) => [...prev, ...newHearts]); // เพิ่มหัวใจเข้าสตาเต
      };
    

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-10 gap-14 relative">
                    <Header
                        content={{
                            title: "Happy Biw's Day",
                            subtitle: "",
                        }}
                    />
                    <div className="w-[245px] h-[320px] rounded-lg shadow-lg">
                        <img
                            src={_albums}
                            alt={`image_${_albums}`}
                            onClick={() => openModal(_albums)}
                            loading="lazy"
                            className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="mb-2 bg-[#ffe3e3] rounded-md p-4 mt-3  bg-opacity-70 shadow-xl text-gray-700 w-full text-center text-xl font-bold">
                        <h1>คนพิเศษคนน่ารัก</h1>
                    </div>
                    <motion.div className="music-section w-full flex flex-col mt-[1rem] items-center gap-4  bg-white p-8 rounded-3xl shadow-2xl  bg-opacity-30 animate-floating"
                    
                        initial={{ y: 0 }} 
                        animate={{ y: [0, -5, 0,-3,0],
                            x: [0, 1, 0, -1,0] 
                         } } 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    
                        >

                        <div className="ml-2 flex gap-3 items-end justify-end">
                            {/* <h1 className="text-2xl bg-blue-50 rounded-full w-10 h-10 flex justify-center items-center">🎵</h1> */}
                            <motion.img src={img_song} alt="Song Cover" className="w-14 h-14 rounded-full bg-cover mb-2" 
                                animate={{
                                    scale: [1, 1.05, 1], // ขยายไป 1.2 เท่า แล้วกลับมา
                                }}
                                transition={{
                                    duration: 0.7, 
                                    repeat: Infinity,
                                    repeatType: "reverse", 
                                }}
                            />

                            <div className=" items-end gap-4">
                                <h3 className="text-xl font-bold text-gray-700">
                                    แค่มีเธอให้รัก ก็นับเป็นโชคดีของฉัน
                                </h3>
                                <p className="text-sm mt-1">No One Else</p>
                            </div>
                            
                        </div>
                    
                        {/* Time display */}
                        <div className="flex justify-between w-full  text-base text-black font-bold tracking-[0.20em]">
                            <span>0{formatTime(currentTime)}</span>
                            <span>0{formatTime(audioRef.current?.duration || 0)}</span>
                        </div>
                        <div className="w-full  cursor-pointer relative mt-[-0.7rem]" onClick={handleSeek}>
                            <div
                                className="h-2 rounded-full border-[1px] border-[#b5b5b2]"
                                style={{
                                    background: `linear-gradient(to right, #868685 ${progress}%, #f9f9f9 ${progress}%)`,
                                }}
                            >
                                {/* Circle at the current time */}
                                <div
                                    className="absolute -top-1 left-0 w-4 h-4  rounded-full bg-[#868685] "
                                    style={{
                                        left: `calc(${progress}% - 0.5rem)`, // Center the circle on the current progress
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-14 justify-center">
                            <img src={next1}
                                    alt={"next"}
                                    className="w-6 h-6 rotate-180"
                            >
                            </img>
                            <h1
                                className="text-2xl  rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
                                onClick={togglePlay}
                                >
                                <img
                                    src={isPlaying ? stop1 : play1}
                                    alt={isPlaying ? "Pause" : "Play"}
                                    className="w-7 h-7"
                                />
                            </h1>
                            <img src={next2}
                                    alt={"next"}
                                    className="w-6 h-6 "
                            >
                            </img>

                            <div className="absolute">
                
                                <audio ref={audioRef} src={musicFile} loop 
                                onEnded={() => audioRef.current.play()}/>

                            </div>
                        </div>

                    </motion.div>
   

                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />
                    {
                    /* <MemoryZone
                        ref={memoryZoneRef}
                        isInView={isInViewMemoryZoneRef}
                        data={
                            //ข้อความ section birthday
                            _birthdayMessages
                        }
                    /> */}




                    <div className="flex">
                        <h2 className="mb-4 text-6xl ml-2 text-start  font-bold text-[#71d2ff]">
                            Memories Zone 🎉
                        </h2>
                        
                    </div>

                    { !isAuthenticated && (
                        <div className="flex flex-col items-center justify-center  mt-[-4rem]">
                            <div className="  p-6 w-80 text-center">


                                <p className="mb-4 text-gray-600">
                                    ใส่รหัสผ่าน 4 หลัก (ใส่วันเกิด)
                                </p>
                                <div className="flex justify-center gap-4 mb-4">
                                    {passwordFields.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`field-${index}`}
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleInputChange(e.target.value, index)}
                                            maxLength="1"
                                            className="w-12 h-12 text-center border border-[gray-300 ] rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#febaba]"
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handlePasswordSubmit}
                                    className="mt-4 w-full py-3 bg-[#ffa5a5] text-white font-bold rounded-lg hover:bg-[#febaba] transition-colors"
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        </div>
                    )}

                    {isAuthenticated &&(
                        <div className="mb-20 max-w-[350px] py-10 gap-14 flex flex-col justify-center">

                            <video 
                                ref={videoRef}
                                
                                key={isAuthenticated} 
                                autoPlay 
                                muted 
                                loop
                                className="rounded-lg w-full"
                                src={video1}>
                            </video>

                            <div className=" mt-10">
                                <div>
                                    <h1 className="text-[#ff99ff] text-4xl font-bold ">เราคบกันมานานแค่ไหนแล้วน้าาา 💖</h1>
                                </div>
                                <div className="flex items-center justify-center w-full mt-7">
                                    <img src={img_mybabe} alt="baby" className="w-[200px] h-[200px] rotate-90 rounded-xl shadow-lg"></img>

                                </div>
                                <div className="flex flex-col justify-center text-center">
                                    <div className="font-bold text-center mt-3 text-2xl">
                                        {timeElapsed.months} &nbsp; : &nbsp; {timeElapsed.days}&nbsp; :&nbsp; {timeElapsed.hours}&nbsp; : &nbsp;{timeElapsed.minutes} &nbsp;:&nbsp; {timeElapsed.seconds}                              
                                    </div>
                                    <div className="flex gap-5 mx-auto">
                                        <h1 className="text-xs ">months   </h1>
                                        <h1 className="text-xs relative -right-1">   day  </h1>
                                        <h1 className="text-xs relative -right-2">  hours </h1>
                                        <h1 className="text-xs relative -right-1"> minutes </h1>
                                        <h1 className="text-xs ">seconds</h1>
                                    </div>
                                </div>
                        

                            </div>
    
                            <MessageSection
                                data={_messages1}
                                ref={messageRef}
                                isInView={isInViewMessageRef}
                            />
                            <div className=" font-bold text-start text-[#f78da4] text-5xl">
                                รูปคู่ คนน่ารัก
                                {/* <div className={`pb-20 font-bold text-[#f78da4] text-3xl`}>
                                    
                                </div> */}
                            </div>

                             <div >
                                <StackCard />
                            </div>

                            <div className={`pb-60 font-bold text-[#f78da4] text-3xl`}>
                                
                            </div>
                            <div className={`pb-20 font-bold text-center text-[#f78da4] text-3xl`}>
                                รักบิวนะค้าบบบ 💕
                            </div>
               
                        </div>
                    )}
                </div>
            </div>
            {hearts.map((heart) => (
                                    <div
                                    key={heart.id}
                                    className="absolute text-red-500 text-3xl animate-fall"
                                    style={{
                                        left: heart.left + "px",
                                        animationDelay: `${heart.delay}s`,
                                        animationDuration: `${heart.duration}s`,
                                    }}
                                    >
                                    ❤️
                                    </div>
                                ))}
            {isModalVisible && (
                <div className="modal show" onClick={closeModal}>
                    <div className="modal-content">
                        {currentImage && (
                            <img
                                src={currentImage}
                                alt="Preview"
                                className="modal-image"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
