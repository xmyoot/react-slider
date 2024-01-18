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
const slideAfterStyles:React.CSSProperties = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)',
    zIndex: 1,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
}
const sliderStyles:React.CSSProperties = {
    height: '100%',
    position: 'relative',
}

const rightArrowStyles:React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '0',
    width: '40px',
    fontSize: '60px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
}
const leftArrowStyles:React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '0',
    width: '40px',
    fontSize: '60px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
}
const slidesContainerStyles:React.CSSProperties = {
    display: 'flex',
    height: '100%',
    transition: 'transform ease-out 0.3s',
}
const slidesContainerOverflowStyles:React.CSSProperties = {
    overflow: "hidden",
    height: "100%",
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  }
const ImageSlider: React.FC<ImageSliderProps> = ({ slides, parentWidth }) => {
    const timerRef:React.MutableRefObject<number | null> = useRef(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const goToNext = useCallback(():void => {
        const isLastSlide:boolean = currentIndex === slides.length - 1
        const newIndex:number = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }, [currentIndex, slides.length])
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            goToNext()
        }, 3000)
        return () => clearTimeout(timerRef.current as number)
    }, [goToNext])
    if (slides.length === 0) {
        return (
            <div>
                <p>No slides available</p>
            </div>
        ) 
    }
    const goToPrevious = ():void => {
        const isFirstSlide:boolean = currentIndex === 0
        const newIndex:number = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
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
            <div style={slideAfterStyles} />
            <div style={leftArrowStyles} onClick={goToPrevious}>‹</div>
            <div style={rightArrowStyles} onClick={goToNext}>›</div>
            <div style={slidesContainerOverflowStyles}>
                <div style={getSlidesStylesContainerWithWidth()}>
                    {renderSlides()}
                </div>
            </div>
        </div>
    )
}
export default ImageSlider
