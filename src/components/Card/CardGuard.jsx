import React from "react";
import "./Card.css";
import hotel from "../../assets/perro-mimido.jpg"
import spa from "../../assets/perrito-shower.jpg"
import guarderia from "../../assets/perrito-jugando.jpg"

function formatDate(date){
	date = new Date(date);
	const formattedDateTime = date.toLocaleString([], {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	  });
	  return formattedDateTime;
}

let buttonText = {
	"Activa": "Ver Stream",
	"Pendiente": "Cancelar",
	"Cancelada": "Ver detalle",
	"Finalizada": "Ver detalle"
}

export default function CardGuard({id, service_type, start_date, end_date, pets_count, pickup, status}){
	console.log(formatDate(start_date))
    return(
        <div className="card">
           <div class="course">
		<div class="course-preview">
			<img src={service_type === 'hotel' ? hotel : service_type === 'spa' ? spa : guarderia} alt="gatito" className="image-princ"/>
			<div className="barra-status">
				<span style={{backgroundColor: status === 'Pendiente' ? 'yellow' : status === 'Cancelada' ? 'red' : 'green'}}></span>
            <p>{status}</p>
			</div>
		</div>
		<div class="course-info">
			<h6>Servicio Mensual</h6>
			<h1>{service_type}</h1>
			<h5>Inicio del Servicio: {formatDate(start_date)}</h5>
            <h5>Fin del Servicio: {formatDate(end_date)}</h5>
            <h5>Numero de mascotas: {pets_count}</h5>
            <h5>Pick up: {pickup === true ? 'SI' : 'NO'}</h5>
			{ <button class="btn">{buttonText[status]}</button>}
		</div>
	</div>
        </div>
    )
}