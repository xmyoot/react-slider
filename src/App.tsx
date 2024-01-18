import './App.css'
import ImageSlider from './components/ImageSlider/ImageSlider'

const slides = [
  {
    title: 'San Francisco – Oakland Bay Bridge, United States',
    url:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    title: 'Bird',
    url:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    title: 'Bali, Indonesia',
    url:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    title: 'Goč, Serbia',
    url:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];
function App() {
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
}

export default App
