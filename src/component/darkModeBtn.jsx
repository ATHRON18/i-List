import React, { useState } from 'react'



function DarkModeBtn({mode,changeMode}) {
    
    
    
  return (
    <>
        <div> <span onClick={changeMode} >{mode==="dark"?"Dark Mode":"Light Mode"}</span> </div>
    </>
  )
}

export default DarkModeBtn
