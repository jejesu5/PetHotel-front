import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBarHome from '../../components/navbar/NavBarHome'

import './crearReserva.css'
import Select from "react-select";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";


export default function CrearReserva() {
  const user = useSelector(state => state.user)

  const [form, setForm] = useState({
    service_type: "",
    start_date: "",
    end_date: "",
    pickUp: false,
    pets_count: "",
    pets: [],
    spa_services: [],
    guarderia_dias: [],
    description: "",
    client: user.id
  })

  const changeServiceType = (e) => {
    setForm({
      service_type: e.target.value,
      start_date: "",
      end_date: "",
      pickUp: false,
      pets_count: "",
      pets: [],
      spa_services: [],
      guarderia_dias: [],
      description: "",
      client: user.id
    })
    return console.log(form)
  }
  const changePickUp = (e) => {
    if (e.target.value === 'si') {
      setForm({
        ...form,
        pickUp: true
      })
    }
    if (e.target.value === 'no') {
      setForm({
        ...form,
        pickUp: false
      })
    }
    return console.log(form)
  }

  const changeStartDate = (e) => {
    setForm({
      ...form,
      start_date: e.target.value
    })
    return console.log(form)
  }

  const changeEndDate = (e) => {
    setForm({
      ...form,
      end_date: e.target.value
    })
    return console.log(form)
  }

  const changeDescription = (e) => {
    setForm({
      ...form,
      description: e.target.value
    })
    return console.log(form)
  }

  const changePetsCount = (e) => {

    form.pets = []

    for (let i = 0; i < e.target.value; i++) {
      form.pets.push(
        {
          pets_type: '',
          pets_race: '',
          pets_size: '',
          pets_name: '',
          pets_age: ''
        }
      )
    }

    const stringValue = e.target.value.toString()
    setForm({
      ...form,
      pets_count: stringValue
    })
    return console.log(form)
  }
  const spaServices = [
    {value: 'peluqueria', label: 'Peluquería'},
    {value: 'baño basico', label: 'Baño Básico'},
    {value: 'baño especial', label: 'Baño Especial'},
    {value: 'corte de uñas', label: 'Corte de uñas'},
    {value: 'baño de oidos', label: 'Baño de oídos'},
    {value: 'enjuague bucal', label: 'Enjuague bucal'},
  ]

  const dias = [
    {value: 'lunes', label: 'Lunes'},
    {value: 'martes', label: 'Martes'},
    {value: 'miercoles', label: 'Miercoles'},
    {value: 'jueves', label: 'Jueves'},
    {value: 'viernes', label: 'Viernes'},
    {value: 'sabado', label: 'Sabado'},
    {value: 'domingo', label: 'Domingo'},
  ]

  const submit = (e) => {
    e.preventDefault()
    axios.post('https://pethotel-production.up.railway.app/api/reservation', form)
      .then(res => {
        console.log(res)
        toast('Reserva creada correctamente', {
          type: 'success',
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

        })
      })
      .catch(err => {
        console.log(err)
        toast('Error al crear la reserva', {
          type: 'error',
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
  }


  return (
    <>
      <ToastContainer/>
      <NavBarHome/>
      <div className='Principal-crear-reserva'>
        <section className="container">
          <header>Crear Reserva</header>
          <form onSubmit={(e) => submit(e)} className="form">

            <div className='input-box'>
              <label>Tipo de servicio deseado</label>
              <div className="select-box">
                <select name="service_type" onChange={(e) => changeServiceType(e)}>
                  <option hidden>Selecciona</option>
                  <option value="hotel">Hotel</option>
                  <option value="guarderia">Guarderia</option>
                  <option value="spa">SPA</option>
                </select>
              </div>
            </div>

            <div className="input-box">
              <label>Pickup</label>
              <div className="select-box">
                <select name="pickUp" onChange={(e) => changePickUp(e)}>
                  <option hidden>Selecciona</option>
                  <option value={'si'}>Si</option>
                  <option value={'no'}>No</option>
                </select>
              </div>
            </div>

            {form.service_type === 'hotel' || form.service_type === 'spa' ?
              <>
                <div className="input-box">
                  <label>Día de ingreso</label>

                  <input type="date" placeholder="Ingrese su numero de telefono" required name="start_date"
                         value={form.start_date} onChange={(e) => changeStartDate(e)}/>
                </div>

                <div className="input-box">
                  <label>Día de egreso</label>
                  <input type="date" placeholder="Ingrese su numero de telefono" required name="end_date"
                         value={form.end_date} onChange={(e) => changeEndDate(e)}/>
                </div>


                <div className="input-box" style={{display: 'flex', flexDirection: 'column'}}>
                  <label>Descripción</label>
                  <textarea style={{
                    maxWidth: '100%',
                    minWidth: '100%',
                    minHeight: '150px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '10px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                            placeholder="Ingrese una descripción adicional" value={form.description}
                            name='lastName'
                            onChange={(e) => changeDescription(e)}/>
                </div>
              </>
              : null}
            {
              form.service_type === 'spa' ?
                <div>
                  <label>Servicios de SPA</label>
                  <Select
                    name="guarderia_dias"
                    className={'SELECTOR'}
                    isMulti
                    options={spaServices}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        spa_services: e.map((item) => {
                          return item.value
                        })
                      })
                    }}
                  />
                </div>
                : null
            }
            {
              form.service_type === 'guarderia' ?
                <div style={{
                  marginTop: '20px',
                }}>
                  <label>Días de guardería</label>
                  <Select
                    className={'SELECTOR'}
                    name="spa_services"
                    isMulti
                    options={dias}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        guarderia_dias: e.map((item) => {
                          return item.value
                        })
                      })
                    }}
                  />
                </div>
                : null
            }
            <div className='input-box'>
              <label>Cantidad de mascotas</label>
              <div className="select-box">
                <select name="city" onChange={(e) => changePetsCount(e)}>
                  <option hidden>Selecciona</option>
                  <option value={1}>1 Mascota</option>
                  <option value={2}>2 Mascotas</option>
                  <option value={3}>3 Mascotas</option>
                  <option value={4}>4 Mascotas</option>
                  <option value={5}>5 Mascotas</option>
                  <option value={6}>6 Mascotas</option>
                  <option value={7}>7 Mascotas</option>
                  <option value={8}>8 Mascotas</option>
                  <option value={9}>9 Mascotas</option>
                  <option value={10}>10 Mascotas</option>
                </select>
              </div>
            </div>

            {form.pets.map((pet, index) => {
              return (
                <div key={index}>

                  <h4>Mascota {index + 1}</h4>

                  <div className='input-box'>
                    <label>Tipo</label>
                    <div className="select-box">
                      <select name="pets_type" onChange={
                        (e) => {
                          form.pets[index].pets_type = e.target.value
                          setForm({
                            ...form
                          })
                          return console.log(form)
                        }
                      }>
                        <option hidden>Selecciona</option>
                        <option value={'perro'}>Perro</option>
                        <option value={'gato'}>Gato</option>
                        <option value={'otro'}>Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-box">
                    <label>Raza</label>
                    <input type="text" placeholder="Ingrese la raza de su mascota"
                           value={form.pets[index].pets_race}
                           required name="pets_race" onChange={
                      (e) => {
                        form.pets[index].pets_race = e.target.value
                        setForm({
                          ...form
                        })
                        return console.log(form)
                      }
                    }/>
                  </div>

                  <div className='input-box'>
                    <label>Tamaño</label>
                    <div className="select-box">
                      <select name="pets_size" onChange={
                        (e) => {
                          form.pets[index].pets_size = e.target.value
                          setForm({
                            ...form
                          })
                          return console.log(form)
                        }
                      }>
                        <option hidden>Selecciona</option>
                        <option value={'pequeño'}>Pequeño</option>
                        <option value={'mediano'}>Mediano</option>
                        <option value={'grande'}>Grande</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-box">
                    <label>Nombre</label>
                    <input type="text" placeholder="Ingrese el nombre de su mascota" required name="pets_name"
                           onChange={
                             (e) => {
                               form.pets[index].pets_name = e.target.value
                               setForm({
                                 ...form
                               })
                               return console.log(form)
                             }
                           }/>
                  </div>

                  <div className="input-box">
                    <label>Edad</label>
                    <input type="text" placeholder="Ingrese la edad de su mascota" required name="pets_age"
                           onChange={
                             (e) => {
                               form.pets[index].pets_age = e.target.value
                               setForm({
                                 ...form
                               })
                               return console.log(form)
                             }
                           }/>
                  </div>

                </div>
              )
            })}
            <input type="submit" value="Enviar" className='button-submit'/>
          </form>
        </section>
      </div>
    </>
  )
}
