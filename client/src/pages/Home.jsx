import React from 'react'
import Hero from '../componenets/Hero';
import LatestCollection from '../componenets/LatestCollection';
import BestSeller from '../componenets/BestSeller';
import OurPolicy from '../componenets/OurPolicy';
import NewsLetter from '../componenets/NewsLetter';

const Home = () => {
  return (
    <div>
     <Hero/>
     <LatestCollection/>
     <BestSeller/>
     <OurPolicy/>
     <NewsLetter/>
    </div>
  )
}

export default Home;
