import React, {useEffect, useRef, useState} from "react";
import Jesus from "@/assets/img/jesus.gif"
import Mouth from "@/assets/img/mouth.gif"
import Toaster from "@/assets/img/toaster.gif"
import Worm from "@/assets/img/worm.gif"
import Clock from "@/assets/img/clock.gif"
import Bell from "@/assets/img/bell.gif"
import HolaAudio from "@/assets/sounds/hola.mp3"

const HomeSection = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [displayText, setDisplayText] = useState("Homer's");
    const audioRef = useRef(null);

    const TYPING_SPEED = 100;
    const DELETING_SPEED = 100;
    const INITIAL_DELAY = 6000;


    const toggleSound = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    useEffect(() => {
        const initialDelay = setTimeout(() => {
            let currentText = "Homer's";
            const newText = "Mr. X's";

            const deleteText = () => {
                if (currentText.length > 0) {
                    currentText = currentText.slice(0, -1);
                    setDisplayText(currentText);
                    setTimeout(deleteText, DELETING_SPEED);
                } else {
                    setTimeout(typeText, TYPING_SPEED);
                }
            };

            const typeText = () => {
                let index = 0;
                const typing = () => {
                    if (index < newText.length) {
                        setDisplayText(newText.slice(0, index + 1));
                        index++;
                        setTimeout(typing, TYPING_SPEED);
                    }
                };
                typing();
            };

            deleteText();
        }, INITIAL_DELAY);

        return () => clearTimeout(initialDelay);
    }, []);

    return (
        <div className="w-full min-h-screen flex items-center flex-col p-2 md:p-6 bg-(--color-background) relative">
            <button
                onClick={toggleSound}
                className="absolute top-4 left-4 z-50 hover:scale-110 transition-transform cursor-[url('/src/assets/img/cursor.png'),auto]"
                aria-label={isMuted ? "unmute" : "mute"}
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 7.5v9L9 13H5v-2h4l4-3.5z"/>
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 4.5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 4.5v-15L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                )}
            </button>

            <audio ref={audioRef} src={`${HolaAudio}`} loop />

            <h1 className="text-center text-[4vh] md:text-[7vh] font-bold pb-[2vh] md:pb-[6vh] flex items-center justify-center">
                    {displayText} Web Page
            </h1>

            {/* JESUS */}
            <img
                src={`${Jesus}`}
                className="absolute top-[25%] md:top-1/2 left-1/2 h-[20vh] md:h-[50vh] lg:h-[60vh] gap-[3vw] md:gap-[10vw] -translate-x-1/2 -translate-y-1/2 z-0 px-[1vh] md:px-[5vh]"
                alt="Jesus"
            />

            {/* LEFT */}
            <div className="absolute left-[3vw] md:left-[5vw] lg:right-[0vw] flex gap-[0.3vw] md:gap-[1vw] mt-[10vh] md:mt-[15vh] z-10 scale-50 md:scale-90 lg:scale-100">
                <div className="flex flex-col h-auto">
                    <img src={`${Clock}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] ml-[2vw] md:ml-[5vw]" alt="Clock"/>
                    <img src={`${Worm}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] -ml-[0.5vw] md:-ml-[1vw]" alt="Worm"/>
                    <img src={`${Toaster}`} className="h-[4vh] md:h-[8vh] mt-[2vh] md:mt-[5vh]" alt="Toaster"/>
                    <img src={`${Bell}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] ml-[4vw] md:ml-[8vw] mt-[0.3vh] md:mt-[0.5vh]" alt="Bell"/>
                    <img src={`${Worm}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] ml-[0.3vw] md:ml-[0.5vw] pb-[0.5vh] md:pb-[2vh]" alt="Worm"/>
                </div>
                <div className="flex flex-col h-auto">
                    <div className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh]"/>
                    <img src={`${Toaster}`} className="h-[3vh] md:h-[7vh] mb-[2vh] md:mb-[5vh] -mt-[2vh] md:-mt-[4vh] ml-[1vw] md:ml-[2vw]" alt="Toaster"/>
                    <img src={`${Mouth}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] -mt-[0.5vh] md:-mt-[1vh]" alt="Mouth"/>
                    <img src={`${Clock}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] mt-[4vh] md:mt-[8vh] ml-[1.5vw] md:ml-[3vw]" alt="Clock"/>
                    <img src={`${Worm}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh] pt-[0.5vh] md:pt-[2vh]" alt="Worm"/>
                </div>
            </div>

            {/* RIGHT */}
            <div className="absolute right-[3vw] md:right-[5vw] lg:right-[3vw] mt-[12vh] md:mt-[25vh] flex gap-[0.3vw] md:gap-[1vw] z-10 scale-50 md:scale-90 lg:scale-100">
                <div className="flex flex-col h-auto">
                    <img src={`${Worm}`} className="h-[4vh] md:h-[8vh] mb-[2vh] md:mb-[5vh]" alt="Worm"/>
                    <img src={`${Bell}`} className="h-[6vh] md:h-[12vh] mb-[2vh] md:mb-[5vh] mt-[2vh] md:mt-[5vh]" alt="Bell"/>
                    <img src={`${Toaster}`} className="h-[10vh] md:h-[18vh] mb-[2vh] md:mb-[5vh] mt-[2vh] md:mt-[5vh]" alt="Toaster"/>
                </div>
                <div className="flex flex-col h-auto">
                    <img src={`${Toaster}`} className="h-[3vh] md:h-[7vh] mb-[2vh] md:mb-[5vh] -mt-[2vh] md:-mt-[5vh]" alt="Toaster"/>
                    <img src={`${Mouth}`} className="h-[8vh] md:h-[15vh] mb-[2vh] md:mb-[5vh]" alt="Mouth"/>
                    <img src={`${Clock}`} className="h-[3vh] md:h-[7vh] mb-[2vh] md:mb-[5vh] ml-[2vw] md:ml-[5vw]" alt="Clock"/>
                </div>
            </div>
        </div>
    );
};

export default HomeSection;

