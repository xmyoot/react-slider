# React + Typescript (Image Slider Component)

This provides a minimal setup to get a minimal React Slider Component

Component takes the following types:
`interface Slide {
    title: string;
    url: string;
}
interface ImageSliderProps {
    slides: Slide[]
    parentWidth: number
}`

Basic usage: 
`function App() {
  const containerStyles = {
    width: "200px",
    height: "138px",
    margin: "0 auto"
  }
  return (
      <div style={containerStyles}>
        <ImageSlider slides={slides} parentWidth={200} />
      </div>
  )
}`
