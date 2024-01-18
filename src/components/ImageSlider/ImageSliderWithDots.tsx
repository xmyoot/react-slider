import React, { useState, useRef, useEffect, useCallback } from 'react';
interface Slide {
    title: string;
    url: string;
}
interface ImageSliderProps {
    slides: Slide[]
    parentWidth: number
}
const slideStyles:React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
}
const sliderStyles:React.CSSProperties = {
    height: '100%',
    position: 'relative',
}
const leftArrowStyles:React.CSSProperties = {
    position: 'absolute',
    top: '30px',
    transform: 'translateY(0, -50%)',
    left: '20px',
    width: '50px',
    height: '100%',
    fontSize: "45px",
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
}
const rightArrowStyles:React.CSSProperties = {
    position: 'absolute',
    top: '30px',
    transform: 'translateY(0, -50%)',
    right: "20px",
    width: '50px',
    height: '100%',
    fontSize: "45px",
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
}
const dotStyles:React.CSSProperties = {
    margin: '0 0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
}
const dotsContainerStyles:React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
}
const slidesContainerStyles:React.CSSProperties = {
    display: 'flex',
    height: '100%',
    transition: 'transform ease-out 0.3s',
}
const slidesContainerOverflowStyles:React.CSSProperties = {
    overflow: "hidden",
    height: "100%",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset',
  };
const ImageSlider: React.FC<ImageSliderProps> = ({ slides, parentWidth }) => {
    const timerRef:React.MutableRefObject<number | null> = useRef(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const goToNext = useCallback(():void => {
        const isLastSlide:boolean = currentIndex === slides.length - 1;
        const newIndex:number = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length])
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            goToNext();
        }, 3000)
        return () => clearTimeout(timerRef.current as number)
    }, [goToNext])
    if (slides.length === 0) {
        return (
            <div>
                <p>No slides available</p>
            </div>
        ); 
    }
    const goToPrevious = ():void => {
        const isFirstSlide:boolean = currentIndex === 0;
        const newIndex:number = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
    const goToSlide = (slideIndex:number):void => {
        setCurrentIndex(slideIndex)
    }
    const renderDots = (): React.ReactNode[] => {
        return slides.map((_, index) => (
            <div
                key={index}
                style={dotStyles}
                onClick={() => goToSlide(index)}
            >
                {index === currentIndex ? '●' : '○ '}
            </div>
        ))
    }
    const getSlideStylesWithBackground = (index:number) => ({
        ...slideStyles,
        backgroundImage: `url(${slides[index].url})`,
        width: `${parentWidth}px`,
    })
    const getSlidesStylesContainerWithWidth = () => ({
        ...slidesContainerStyles,
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex*parentWidth)}px)`
    })
    const renderSlides = (): React.ReactNode[] => {
        return slides.map((_, index:number) => (
            <div key={index} style={getSlideStylesWithBackground(index)} />
        ))
    }
    return (
        <div style={sliderStyles}>
            <div>
                <div style={leftArrowStyles} onClick={goToPrevious}>‹</div>
                <div style={rightArrowStyles} onClick={goToNext}>›</div>
            </div>
            <div style={slidesContainerOverflowStyles}>
                <div style={getSlidesStylesContainerWithWidth()}>
                    {renderSlides()}
                </div>
            </div>
            <div style={dotsContainerStyles}>
                {renderDots()}
            </div>
        </div>
    );
};
export default ImageSlider;
