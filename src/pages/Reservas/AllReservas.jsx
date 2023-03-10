import React from "react";
import { useState, useEffect } from "react";
import NavLogout from "../../components/navbar/NavLogout";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { getUserReservations } from "../../Redux/Actions";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import '../Home/Home.css'


export default function AllReservas() {
    const dispatch = useDispatch();
    const reservas = useSelector(state => state.reservationsByuser)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(reservas.length === 0){
            dispatch(getUserReservations(user.id))
        }
    }, [dispatch, reservas])

    console.log(reservas)


    const columns = [
        {
            field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header',
            headerAlign: 'center', width: 90
        },
        {
            field: 'servicio', headerName: 'Servicio',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center', width: 130
        },
        {
            field: 'estado', headerName: 'Estado', headerClassName: 'super-app-theme--header',
            headerAlign: 'center', width: 130
        },
        {
            field: 'fecha_inicio',
            headerName: 'Inicio',
            type: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 130,
        },
        {
            field: 'fecha_fin',
            headerName: 'Finaliza',
            type: 'Date',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 130,
        },
        {
            field: 'nro_mascotas',
            headerName: 'Nro. Mascotas',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 130,
        },
        {
            field: 'mascotas',
            headerName: 'Mascotas',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 150,
        }
        
    ];
      
      const rows = reservas.map((reserva, index) => {
      switch (reserva.status) {
        case 'pending':
            reserva.status = 'Pendiente'
            break;
        case 'on progress':
            reserva.status = 'En proceso'
            break;
        case 'canceled':
            reserva.status = 'Cancelada'
            break;
        case 'completed':
            reserva.status = 'Completada'
            break;
        default:
            break;
    }

    let service_type = reserva.service_type.charAt(0).toUpperCase() + reserva.service_type.slice(1)

        return {
            id: reserva._id,
            servicio: service_type,
            estado: reserva.status,
            fecha_inicio: new Date(reserva.start_date).toLocaleDateString(),
            fecha_fin: new Date(reserva.end_date).toLocaleDateString(),
            nro_mascotas: reserva.pets.length,
            mascotas: reserva.pets.map(pet => pet.pets_name).join(', ')

        }
    });
      
      return (
        <div className="home-background">
        <NavLogout/>
     <div className="post-form">
        <div className="post-form-title" style={{marginTop: '60px'}}>
                <h2>Todas las Reservas</h2>
                </div>
                <Box
      sx={{
        height: 600,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
        },
      }}
    >
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            headerClassName="header"
          />
          </Box>
          <Link to="/home">
                    <p>Volver</p>
                    </Link>
          </div>
        </div>
      );


}