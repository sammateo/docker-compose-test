import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center h-[80vh] gap-2">
      <p>Hello World</p>
      
      <p className="flex flex-col items-center gap-0"><span>~ pi</span> <span className=" text-xs">(from a docker container)</span></p>
    </div>
    </div>
    
  )
}
