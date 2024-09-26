import { useEffect, useLayoutEffect, useState } from "react";


export function useScreenSize() {
    const [windowSize, setWindowSize] = useState<{ width: number; height: number}>({
        width: 992,
        height: 0,
    })
    
    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    // eslint-disable-next-line
}, [])

    return {
        width: windowSize.width,
        height: windowSize.height,
        isMobile: windowSize.width < 992
    }
}


export function useCustomScreenSize({ mobile } : { mobile: number }) {
    const [windowSize, setWindowSize] = useState<{ width: number; height: number}>({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    
    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
}, [])

    return {
        width: windowSize.width,
        height: windowSize.height,
        isMobile: windowSize.width < mobile
    }
}


export function useScreenHeightReset() {
    const setDocumentHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    }
    
    useLayoutEffect(() => {
        window.addEventListener('resize', setDocumentHeight)
        return () => {
            window.removeEventListener('resize', setDocumentHeight);
        };
    }, [])
}