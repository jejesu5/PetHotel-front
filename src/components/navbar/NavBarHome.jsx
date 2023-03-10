import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../../Redux/Actions'
import Logo from '../../assets/LOGO-WHITE.png'
import './NavLogout.css'

export default function NavBarHome () {
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(signOut())
    }

  return (
        <div className="Nav-container">
            <div className="Nav-firstIcon">
                <img alt="galu" src={Logo} className='Img-nav'/>
            </div>

            <div className="Nav-2ndcontainer" >
            <Link to='/create'>
            <p>Reservar</p>
            </Link>
            <Link to='/stream'>
            <p>Stream</p>
            </Link>
            <Link to='/profile'>
            <p>Perfil</p>
            </Link>
            <Link to='/'>
            <p onClick={handleSignOut}>Salir</p>
            </Link>
            </div>
        </div>
  )
}