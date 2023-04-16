import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Link} from "react-router-dom";
import './AdminDashboardReservas.css';

export default function AdminDashboardUsuarios() {

  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/reservation`,)
      .then(res => {
        console.log(res.data.data)
        setReservations(res.data.data)
        setLoading(false)
      })
  }, [])

  const confirmReservation = (id) => {
    axios.post(`/api/reservation/confirm/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`/api/reservation}`,)
          .then(res => {
            console.log(res.data.data)
            setReservations(res.data.data)
            setLoading(false)
          })
      })
  }

  const cancelReservation = (id) => {
    axios.post(`/api/reservation/cancel/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`/api/reservation`,)
          .then(res => {
            console.log(res.data.data)
            setReservations(res.data.data)
            setLoading(false)
          })
      })
  }

  const finaliceReservation = (id) => {
    axios.post(`/api/reservation/complete/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`/api/reservation`,)
          .then(res => {
            console.log(res.data.data)
            setReservations(res.data.data)
            setLoading(false)
          })
      })
  }


  const columns = [
    {
      name: 'Nombre',
      selector: 'client.name',
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: 'client.lastName',
      sortable: true,
    },
    {
      name: 'Servicio',
      selector: 'service_type',
      sortable: true,
    },
    {
      name: 'Estado',
      selector: 'status',
      sortable: true,
    },
    {
      name: 'Fecha de inicio',
      selector: 'start_date',
      sortable: true,
    },
    {
      name: 'Fecha de fin',
      selector: 'end_date',
      sortable: true,
    },
    {
      name: 'Ver más',
      cell: row => <p className={'text'} onClick={() => {
        setOpen(true)
        setDetail(row)
      }}>Ver más...</p>
    },
    {
      name: 'Acciones',
      cell: row =>
        <div>
          <button className={'confirm'} onClick={() => confirmReservation(row._id)}>Confirm</button>
          <button className={'cancel'} onClick={() => cancelReservation(row._id)}>Cancel</button>
          <button className={'finalizar'} onClick={() => finaliceReservation(row._id)}>Finalizate</button>
        </div>
    }
  ]


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className={'navbarContainer'}>
        <Link className={'navBarbutton'} to={'/admin/dashboard/reservas'}>
          Ver Reservas
        </Link>
        <Link className={'navBarbutton'} to={'/admin/dashboard/usuarios'}>
          Ver Usuarios
        </Link>
      </div>
      <div style={{display:'flex', alignItems:"center", justifyContent: 'center'}}>
        <div className={'tableContainer'}>
          <DataTable
            title="Reservas"
            columns={columns}
            data={reservations}
            progressPending={loading}
            pagination
            paginationServer
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
      <Dialog className={'adt'} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <h3>Detalles de la Reserva</h3>
        </DialogTitle>
        <DialogContent>
          <p>ID del servicio: {detail?._id}</p>
          <p>Nombre: {detail?.client?.name} {detail?.client?.lastName}</p>
          <p>Correo: {detail?.client?.email}</p>
          <p>Servicio: {detail?.service_type}</p>
          <p>Estado: {detail?.status}</p>
          <hr/>
          <p>Desde: {detail?.start_date?.slice(0, 10)} hasta: {detail?.end_date?.slice(0, 10)}</p>
          <p>Recogida: {detail?.pickUp ? 'Si' : 'No'}</p>
          <p>Dirección: {detail?.address_pickup ? detail?.address_pickup : 'N/A'}</p>
          <p>Duración de la guardería: {detail?.guarderia_duracion ? detail?.guarderia_duracion : 'N/A'}</p>
          <p>Cantidad de mascotas: {detail?.pets_count}</p>
          <hr/>
          <p>Descripción: {detail?.description ? detail?.description : 'N/A'}</p>
          <hr/>
          <h4>Mascotas:</h4>
          {detail?.pets?.map((pet, index) => (
            <div key={index}>
              <p>Tipo: {pet?.pets_type}</p>
              <p>Nombre: {pet?.pets_name}</p>
              <p>Tamaño: {pet?.pets_size}</p>
              <p>Raza: {pet?.pets_race}</p>
              <p>Edad: {pet?.pets_age}</p>
              <hr/>
            </div>
          ))}
          <h4>Spa:</h4>
          {detail?.spa_services?.map((spa, index) => (
            <div key={index}>
              <p>{spa}</p>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
