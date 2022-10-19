import { useEffect } from 'react';

function ScrollToTop ({ children, location: { pathname } }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children || null
};

export default ScrollToTop;
