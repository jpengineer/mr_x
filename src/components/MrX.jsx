import React, {useEffect, useRef} from 'react';
import HomeSection from '@/sections/Home';


const MrX = () => {
    const homeRef = useRef(null);

    // const isHomeInView = useInView(homeRef, {once: false});
    // const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({behavior: 'smooth'});
                }
            }, 100);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-(--color-background) text-(--color-text)">
            <main className="flex-grow relative ">
                <section ref={homeRef} id="home" className="h-min-screen">
                    <HomeSection/>
                </section>
            </main>
        </div>
    );
};

export default MrX;