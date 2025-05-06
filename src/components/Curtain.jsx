import { useEffect, useState } from "react";

const Curtain = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        console.log("Curtain")
        const timer = setTimeout(() => setIsVisible(false), 4500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999999] flex pointer-events-none">
            <div className="w-1/2 h-screen bg-curtain animate-slide-left origin-left">
                <div className="flex items-center justify-end h-full w-full">
                    <h1 className="text-7xl lg:text-9xl text-white text-stroke">Hom<br/>Web </h1>
                </div>
            </div>
            <div className="w-1/2 h-screen bg-curtain animate-slide-right origin-right">
                <div className="flex items-center justify-start h-full pr-6 w-full">
                    <h1 className="text-7xl lg:text-9xl text-white text-stroke">er's<br/>Page</h1>
                </div>
            </div>
        </div>
    );
};

export default Curtain;
