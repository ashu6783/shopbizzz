import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import NavBar from './componenets/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
