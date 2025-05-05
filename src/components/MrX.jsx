import React, {useEffect} from 'react';
import { useInView } from 'react-intersection-observer';
import HomeSection from '@/sections/Home';
import NewsSection from "@/sections/News.jsx";
import Header from "@/components/Header.jsx";


const MrX = () => {
    const [homeRef, _] = useInView({ threshold: 0.5, triggerOnce: true})
    const [newsRef, isNewsVisible] = useInView({ threshold: 0.5, triggerOnce: true})

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
        <div className="min-h-screen flex flex-col bg-(--color-background) text-(--color-text) cursor-[url('/src/assets/img/cursor.png'),auto]">
            <main className="flex-grow relative ">
                <section ref={homeRef}  id="home" className="h-screen w-full">
                    <HomeSection/>
                </section>
                <section ref={newsRef} id="news" className="h-screen w-full">
                    <Header/>
                    <NewsSection isActive={isNewsVisible}/>
                </section>
            </main>
        </div>
    );
};

export default MrX;