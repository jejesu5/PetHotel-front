import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/LOGO-COMMON.png'
import { FaPlay } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { BsCalendar2Date, BsBookmarkStarFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import './PopupMenu.css'

export default function PopupMenu ({ menu, setMenu }) {

  return (
        <div className='popupMenu-container' style={{display: menu ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <div className="popupMenu-info">
            <div className="popupMenu-info__name">
                <Link to={'/'}>
                <img alt="galu" src={Logo} className='w-full'/>
                </Link>
            </div>
            <div className="popupMenu-display">
                <AiOutlineClose onClick={() => setMenu(false)}/>
            </div>
            </div>
            <div className="popupMenu-item">
            <Link to={'/home'}>
            <h2>Home </h2>
            </Link>
            <HiHome/>
            </div>
            <div className="popupMenu-item">
            <Link to='/stream'>
            <h2>Stream</h2>
            </Link>
            <FaPlay/>
            </div>
            <div className="popupMenu-item">
            <Link to='/reservas'>
            <h2>Reservas</h2>
            </Link>
            <BsBookmarkStarFill/>
            </div>
            <div className="popupMenu-item">
            <Link to='/calendario'>
            <h2>Calendario</h2>
            </Link>
            <BsCalendar2Date/>
            </div>
            <div className=" w-[80%] flex items-center p-2.5 flex items-center justify-center mt-3">
            </div>
        </div>
  )
}
