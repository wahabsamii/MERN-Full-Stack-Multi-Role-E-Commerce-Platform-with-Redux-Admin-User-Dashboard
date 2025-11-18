import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Homehero'
import FlashSales from '../components/FlashSales'
import BrowseByCategory from '../components/BrowseByCategory'
import BestSellingProducts from '../components/BestSellingProducts'
import MusicExperience from '../components/MusicExperience'
import OurProducts from '../components/OurProducts'
import NewArrival from '../components/NewArrival'
import Features from '../components/Features'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
    <Hero />
    <FlashSales />
    <BrowseByCategory />
    <BestSellingProducts />
    <MusicExperience />
    <OurProducts />
    <NewArrival />
    <Features />
    </div>
  )
}

export default Home