import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

export default function AdminDashboard() {

  const [reservations, setReservations] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://pethotel-production.up.railway.app/api/reservation?skip=${skip}&limit=${limit}`,)
      .then(res => {
        console.log(res.data.data)
        setReservations(res.data.data)
        setLoading(false)
      })
  }, [])

  const confirmReservation = (id) => {
    axios.post(`https://pethotel-production.up.railway.app/api/reservation/confirm/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`https://pethotel-production.up.railway.app/api/reservation?skip=${skip}&limit=${limit}`,)
          .then(res => {
            console.log(res.data.data)
            setReservations(res.data.data)
            setLoading(false)
          })
      })
  }

  const cancelReservation = (id) => {
    axios.post(`https://pethotel-production.up.railway.app/api/reservation/cancel/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`https://pethotel-production.up.railway.app/api/reservation?skip=${skip}&limit=${limit}`,)
          .then(res => {
            console.log(res.data.data)
            setReservations(res.data.data)
            setLoading(false)
          })
      })
  }

  const finaliceReservation = (id) => {
    axios.post(`https://pethotel-production.up.railway.app/api/reservation/complete/${id}`)
      .then(res => {
        console.log(res)
      })
      .then(() => {
        setLoading(true)
        axios.get(`https://pethotel-production.up.railway.app/api/reservation?skip=${skip}&limit=${limit}`,)
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
      name: 'Acciones',
      cell: row => <div style={{margin: '10px'}}>
        <button onClick={() => confirmReservation(row._id)}>Confirmar</button>
        <button onClick={() => cancelReservation(row._id)}>Cancelar</button>
        <button onClick={() => finaliceReservation(row._id)}>Finalizar</button>
      </div>
    }
  ]


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{margin: '20px'}}>
        <DataTable
          title="Reservas"
          columns={columns}
          data={reservations}
          progressPending={loading}
          pagination
          paginationServer
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </div>
  )
}

const obj = {
  "_id": "63f4c7816f647776d1895905",
  "service_type": "hotel",
  "status": "pending",
  "isActive": true,
  "start_date": "2023-02-23T00:00:00.000Z",
  "end_date": "2023-02-25T00:00:00.000Z",
  "pickUp": true,
  "guarderia_dias": [],
  "guarderia_duracion": "",
  "pets_count": "2",
  "pets": [
    {
      "pets_type": "perro",
      "pets_name": "carlos",
      "pets_size": "grande",
      "pets_race": "golden retriever",
      "pets_age": "2"
    },
    {
      "pets_type": "perro",
      "pets_name": "jose",
      "pets_size": "grande",
      "pets_race": "golden retriever",
      "pets_age": "3"
    }
  ],
  "address_pickup": "",
  "spa_services": [],
  "description": "",
  "client": {
    "_id": "63ebf8f9adbdab8a1beac6b7",
    "name": "Jesus",
    "lastName": "Arenas",
    "email": "arenasjesus.w@gmail.com"
  },
  "createdAt": "2023-02-21T13:30:33.011Z",
}
