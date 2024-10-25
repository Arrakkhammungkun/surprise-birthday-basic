import { _birthdayMessages, _messages } from "../src/assets/mock/mock";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { _albums } from "./assets/mock/mock";
import { useModal } from "./hooks/useModal";
import { Header, MessageSection, StackCard } from "./components/ui";
import { MemoryZone } from "./components/common";

function App() {
    const { isModalVisible, currentImage, openModal, closeModal } = useModal();

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

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-12 gap-16 relative">
                    <Header
                        content={{
                            title: "Happy Earn's Day",
                            subtitle: "",
                        }}
                    />
                    {/* <div className="w-[245px] h-[320px] rounded-lg shadow-lg mb-12">
                        <img
                            src={_albums}
                            alt={`image_${_albums}`}
                            onClick={() => openModal(_albums)}
                            loading="lazy"
                            className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer"
                        />
                    </div> */}
                    <div>
                        <StackCard />
                    </div>
                    

                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />
                    {/* <MemoryZone
                        ref={memoryZoneRef}
                        isInView={isInViewMemoryZoneRef}
                        data={
                            //ข้อความ section birthday
                            _birthdayMessages
                        }
                    /> */}
                    {/* <div className={`pb-20 font-bold text-[#f78da4] text-3xl`}>
                        Captions 💕
                    </div> */}
                    <div className={`pb-20`}> </div>
                </div>
            </div>

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
