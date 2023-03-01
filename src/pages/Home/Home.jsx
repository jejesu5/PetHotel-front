import React, {useEffect} from "react";
import Card from "../../components/Card/Card";
import NavLogout from "../../components/navbar/NavLogout";
import './Home.css'
import Logo from '../../assets/header-perrito.png'
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations } from "../../Redux/Actions/index";


export default function Home(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const reservations = useSelector(state => state.reservationsByuser)
    console.log(reservations)

    useEffect(() => {
        dispatch(getUserReservations(user.id))
    }, [dispatch, user.id])

    return(
        <>
        <div className="home-background">
        <NavLogout/>
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
                {reservations.filter(reservation => reservation.status === 'canceled' || reservation.status === 'completed').map(reservation => <Card key={reservation._id} id={reservation._id} service_type={reservation.service_type} start_date={reservation.start_date} end_date={reservation.end_date} pets_count={reservation.pets_count} pickup={reservation.pickUp}
                status={reservation.status === 'completed' ? 'Finalizada' : 'Cancelada'}/>)}
                    </ div>
                    <p>Ver todas mis reservas</p>
            </div>
            </div>
        </>
    )
}