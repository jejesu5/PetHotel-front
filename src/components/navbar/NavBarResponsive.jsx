import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import PopupMenu from '../Popup/PopupMenu'
import './NavBarResponsive.css'

export default function NavResponsive () {
  const [menu, setMenu] = useState(false)
  return (
        <div className="responsive-container">
            <button className="responsive-button">
            <GiHamburgerMenu className={`${!menu ? 'text-zinc-50' : 'text-orange-500'} text-2xl`} onClick={() => setMenu(!menu)} />
            <PopupMenu menu={menu} setMenu={setMenu}/>
            </button>
            
        </div>

  )
}
