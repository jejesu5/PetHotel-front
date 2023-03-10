import React, {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import NavLogout from "../../components/navbar/NavLogout";
import NavResponsive from "../../components/navbar/NavBarResponsive";
import NavBarHome from "../../components/navbar/NavBarHome";
import './Home.css'
import Logo from '../../assets/header-perrito.png'
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations } from "../../Redux/Actions/index";
import { Link } from "react-router-dom";


export default function Home(){
    const dispatch = useDispatch();
    const userR = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const reservations = useSelector(state => state.reservationsByuser)
    console.log(reservations)
    useEffect(() => {
        if(localStorage.getItem('user') === null){
            window.location.href = '/'
        } else {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

    }, [])

    useEffect(() => {
        dispatch(getUserReservations(userR.id))
    }, [dispatch, user.id])


    return(
        <>
        <div className="home-background">
        <div className="NavBar-home">
        <NavBarHome/>
        </div>
        <div className="NavBar-responsive">
        <NavResponsive/>
        </div>
        <div className="header-princ">
       <img src={Logo} alt="logo" Name="logo-header"/>
      </div>
     <div className="post-form">
        <div className="post-form-title">
                <h2>Reservas Activas</h2>
                </div>
                <div className="post-form__container">
                    {reservations.filter(reservation => reservation.status === 'on progress').map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp} status={'Activa'}/>)}
                    </div>
            </div>
            <div className="post-form">
        <div className="post-form-title">
                <h2>Proximas Reservas</h2>
                </div>
                <div className="post-form__container">
                {reservations.filter(reservation => reservation.status === 'pending').map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp} status={'Pendiente'}/>)}
                    </ div>
            </div>
            <div className="post-form">
            <div className="post-form-title">
                <h2>Ultimas Reservas</h2>
                </div>
                <div className="post-form__container">
                {reservations.filter(reservation => reservation.status === 'canceled' || reservation.status === 'completed').slice(0,3).map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp}
                status={reservation.status === 'completed' ? 'Finalizada' : 'Cancelada'}/>)}
                    </ div>
                    <Link to="/all">
                    <p>Ver todas mis reservas</p>
                    </Link>
            </div>
            </div>
        </>
    )
}