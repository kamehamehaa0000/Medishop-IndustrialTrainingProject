import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Footer from '../components/Footer'
import PlaylistHero from '../components/PlaylistHero'

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Products />
      <PlaylistHero />
      <Footer />
    </div>
  )
}

export default LandingPage
