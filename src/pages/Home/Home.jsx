import React, {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import CardGuard from "../../components/Card/CardGuard";
import NavLogout from "../../components/navbar/NavLogout";
import NavResponsive from "../../components/navbar/NavBarResponsive";
import NavBarHome from "../../components/navbar/NavBarHome";
import './Home.css'
import Logo from '../../assets/header-perrito.png'
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations, getUserGuarderia } from "../../Redux/Actions/index";
import { Link } from "react-router-dom";


export default function Home(){
    const dispatch = useDispatch();
    const userR = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const [empty, setEmpty] = useState(false)
    const reservations = useSelector(state => state.reservationsByuser)
    const guarderia = useSelector(state => state.guarderiaByuser)
    console.log(reservations)
    console.log(guarderia)
    useEffect(() => {
        if(localStorage.getItem('user') === null){
            window.location.href = '/'
        } else {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

    }, [])

    useEffect(() => {
        dispatch(getUserGuarderia(userR.id))
        dispatch(getUserReservations(userR.id))
    }, [dispatch, user.id])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!reservations.length && !guarderia.length) {
                setEmpty(true);
            }
        }, 3000);
    
        return () => {
            setEmpty(false);
            clearTimeout(timeoutId);
        };
    }, [reservations, guarderia])


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
        {empty && <>
     <div className="post-form">
        <div className="post-form-title">
                <h2>Aun no tienes reservas activas</h2>
                </div>
        </div>
        </>}
        {reservations.length && <>
     <div className="post-form">
        <div className="post-form-title">
                <h2>Reservas Activas</h2>
                </div>
                <div className="post-form__container">
                {guarderia.length && <CardGuard id={guarderia[0]._id} service_type={'Guarderia'} start_date={guarderia[0].start_date} end_date={guarderia[0].end_date} pets_count={guarderia[0].pets.length} pickup={guarderia[0].pickUp} status={'Activa'}/>}
                    {reservations.filter(reservation => reservation.status === 'on progress').map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp} status={'Activa'}/>)}
                    </div>
            </div>
            <div className="post-form">
        <div className="post-form-title">
                <h2>Proximas Reservas</h2>
                </div>
                <div className="post-form__container">
                {reservations.filter(reservation => reservation.status === 'pending').slice(0,3).map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp} status={'Pendiente'}/>)}
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
            </>}
            </div>
        </>
    )
}