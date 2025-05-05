import React, {useEffect, useState} from "react";
import Homer from "@/assets/img/homer.png"
import MrX from "@/assets/img/mrX.png"
import {isMobile} from "react-device-detect";

const NewsSection = ({isActive}) => {
    const [currentImage, setCurrentImage] = React.useState(Homer);
    const [isTapped, setIsTapped] = useState(false);

    useEffect(() => {
        console.log(isActive)
        if (isActive) {
            setCurrentImage(Homer)
            const timer = setTimeout(() => {
                setCurrentImage(MrX);
            }, 2000)
            return () => clearTimeout(timer)
        } else {
            setCurrentImage(Homer)
        }

    }, [isActive]);
    return (
        <div className="w-full min-h-screen flex flex-col relative ">
            <div className="flex gap-2">
                <div className={`${isMobile ? "w-1/3" : "w-[350px]"}  bg-(--color-background-secondary) border-l-2 border-r-2 border-b-2
                border-t-(--color-background-secondary) border-black p-4 -mt-[2px] z-10}`}>
                    <div
                        className={`${isMobile ? "" : "h-[600px]"} w-full border-black flex items-center justify-center p-4 `}>
                        <img
                            src={`${currentImage}`}
                            alt="Animación"
                            className={`${isMobile ? "" : " mt-[100px]"} max-h-full max-w-full object-contain`}
                        />
                    </div>
                </div>


                <div
                    className={`${isMobile ? "p-2 mt-5 h-[250px]" : "p-16 mt-16 h-[600px]"} w-full bg-transparent border-black overflow-y-scroll overflow-hidden snap-y snap-mandatory `}>
                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-green-500 text-green-500 no-underline" : "bg-green-500 border-black text-black underline" : "bg-green-500 border-black text-black underline hover:no-underline hover:bg-black hover:border-green-500 hover:text-green-500"}`}>
                        <h1 className={`${isMobile ? "text-5xl" : "md:text-4xl lg:text-9xl text-7xl"}  font-bold  text-center  leading-tight`}>
                            Quimby's<br/>Dirty Pool
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-pink-400 text-pink-400 no-underline" : "bg-pink-400 border-black text-black underline" : "bg-pink-400 border-black text-black underline hover:no-underline hover:bg-black hover:border-pink-400 hover:text-pink-400"}`}>
                        <h1 className={`${isMobile ? "text-5xl" : "md:text-4xl lg:text-9xl text-7xl"}  font-bold  text-center  leading-tight`}>
                            Bagels<br/>are old<br/>Donuts!
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-green-500 text-green-500 no-underline" : "bg-green-500 border-black text-black underline" : "bg-green-500 border-black text-black underline hover:no-underline hover:bg-black hover:border-green-500 hover:text-green-500"}`}>
                        <h1 className={`${isMobile ? "text-5xl" : "md:text-4xl lg:text-9xl text-7xl"}  font-bold  text-center  leading-tight`}>
                            Police Host<br/>Race Riot
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-pink-400 text-pink-400 no-underline" : "bg-pink-400 border-black text-black underline" : "bg-pink-400 border-black text-black underline hover:no-underline hover:bg-black hover:border-pink-400 hover:text-pink-400"}`}>
                        <h1 className={`${isMobile ? "text-5xl" : "md:text-4xl lg:text-9xl text-7xl"}  font-bold  text-center  leading-tight`}>
                            Journalistic<br/>Dynamite
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-green-500 text-green-500 no-underline" : "bg-green-500 border-black text-black underline" : "bg-green-500 border-black text-black underline hover:no-underline hover:bg-black hover:border-green-500 hover:text-green-500"}`}>
                        <h1 className={`${isMobile ? "text-2xl" : "md:text-3xl lg:text-7xl text-5xl"}  font-bold  text-center  leading-tight`}>
                            Bulletin:<br/><br/>
                            <p className={`${isMobile ? "text-sm" : "text-3xl"}  font-bold  text-center  leading-tight`}>
                                New Race Discovered Living Six<br/>
                            Inches Under Denver -- All<br/>
                            Named 'Mortonson'
                            </p>
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-pink-400 text-pink-400 no-underline" : "bg-pink-400 border-black text-black underline" : "bg-pink-400 border-black text-black underline hover:no-underline hover:bg-black hover:border-pink-400 hover:text-pink-400"}`}>
                        <h1 className={`${isMobile ? "text-4xl" : "md:text-3xl lg:text-7xl text-5xl"}  font-bold  text-center  leading-tight`}>
                            English And German<br/>Are The Same<br/>Language
                        </h1>
                    </div>

                    <div onClick={() => isMobile && setIsTapped(!isTapped)} className={`mb-12 snap-start h-full flex items-center justify-center border-1  
                    ${isMobile ? isTapped ? "bg-black border-green-500 text-green-500 no-underline" : "bg-green-500 border-black text-black underline" : "bg-green-500 border-black text-black underline hover:no-underline hover:bg-black hover:border-green-500 hover:text-green-500"}`}>
                        <h1 className={`${isMobile ? "text-4xl" : "md:text-3xl lg:text-7xl text-5xl"}  font-bold  text-center  leading-tight`}>
                            They're Controlling<br/>Our Minds With<br/>Flu Shots
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsSection;

