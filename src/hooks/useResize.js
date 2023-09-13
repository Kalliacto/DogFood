import { useState, useEffect } from 'react';

const useResize = (screenWidth) => {
    const [width, setWidth] = useState(screenWidth);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

export default useResize;
