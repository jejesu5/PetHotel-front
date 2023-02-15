import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../../assets/LOGO-WHITE.png'
import './NavLogout.css'

export default function NavLogout () {
  return (
        <div className="Nav-container">
            <div className="Nav-firstIcon">
                <Link to={'/'}>
                <img alt="galu" src={Logo} className='Img-nav'/>
                </Link>
            </div>

            <div className="Nav-2ndcontainer" >
            <Link to='/'>
            <p>Ingresar</p>
            </Link>
            <Link to='/register'>
            <p>Registrarse</p>
            </Link>
            </div>
        </div>
  )
}
