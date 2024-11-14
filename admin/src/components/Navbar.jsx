import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between  ' >
      <img  className='w-[max(15%,80px)]' src="./ShopBizzAdmin.png" alt="" />
      <button className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-xl ' >Logout</button>
    </div>
  )
}

export default Navbar
