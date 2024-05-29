import React from 'react'
import DarkModeBtn from './darkModeBtn'

function Navbar({mode,changeMode}) {
  return (
    <nav className='flex justify-between bg-violet-900 text-white py-2'>
        <span className='font-bold text-xl mx-4 cursor-pointer'>i-List</span>
        <ul className='flex gap-8 text-white mx-9'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Task</li>
            <li className='cursor-pointer'> <DarkModeBtn mode={mode} changeMode={changeMode} /> </li>
        </ul>
    </nav>
  )
}

export default Navbar