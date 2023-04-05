import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import {Link} from "react-router-dom";
import './AdminDashboardReservas.css';

export default function AdminDashboardUsuarios() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://pethotel-production.up.railway.app/api/user/`,)
      .then(res => {
        console.log(res.data.data)
        setUsers(res.data.data)
        setLoading(false)
      })
  }, [])

  const eliminarUser = (id) => {
    axios.delete(`https://pethotel-production.up.railway.app/api/user/${id}`)
      .then(()=> {
        setLoading(true)
        axios.get(`https://pethotel-production.up.railway.app/api/user/`,)
          .then(res => {
            setUsers(res.data.data)
            setLoading(false)
          })
      })
  }


  const columns = [
    {
      name: 'Nombre',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: 'lastName',
      sortable: true,
    },
    {
      name: 'Correo',
      selector: 'email',
      sortable: true,

    },
    {
      name: 'Teléfono',
      selector: 'phoneNumber',
      sortable: true,
    },
    {
      name: 'Dirección',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'Numero de documento',
      selector: 'idNumber',
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row =>
        <div>
          <button onClick={() => eliminarUser(row._id)} className={'cancel'}>Eliminar Usuario</button>
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
      <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
        <div className={'tableContainer'}>
          <DataTable
            title="Usuarios"
            columns={columns}
            data={users}
            progressPending={loading}
            pagination
            paginationServer
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </div>
  )
}
