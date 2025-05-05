import { isMobile } from 'react-device-detect';

const Header = () => {
    return (
        <header
            className={`${isMobile ? "h-[150px]" : "h-[300px]" } bg-(--color-background-secondary) border-2 border-black w-full mx-auto flex items-center px-4 sm:px-6 py-4  `}>
            <div
                className={` ${isMobile ? "ml-2" : "ml-15 mt-10 z-10"} flex flex-col items-center justify-center w-[100px] sm:w-[130px]text-center leading-none flex-shrink-0 bg-transparent`}>
                <div className="text-5xl sm:text-7xl -rotate-12 font-black bg-transparent">Mr.</div>
                <div
                    className="text-[90px] sm:text-[200px] md:text-[100px] lg:text-[300px] font-black -rotate-12 -mt-4 sm:-mt-6 sm:ml-4 bg-transparent">X
                </div>
            </div>

            <div className="flex-1 text-center pl-4 sm:pl-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[color:var(--color-primary)] text-stroke leading-tight">
                    All The Muck<br/>
                    That's Fit To Rake
                </h1>
            </div>
        </header>

    );
};

export default Header;