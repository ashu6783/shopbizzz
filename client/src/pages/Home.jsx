// import React from 'react'
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <div>
     <Hero/>
     <div className='mb-12'>

     </div>
     <LatestCollection/>
     <div className='mb-12'></div>
     <BestSeller/>
     <div className='mb-12'></div>
     <OurPolicy/>
     <div className='mb-12'></div>
     <NewsLetter/>
    </div>
  )
}

export default Home;
