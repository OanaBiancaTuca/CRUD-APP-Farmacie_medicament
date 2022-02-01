import React from 'react';

function MedicamentRow(props) {
	//atributul medicament il accesez prin intermediul lui props
	return (
		<div className={`card background${props.index % 4 + 1}`}>
			<p>
				<a href={`#/medicamente/${props.medicament.id}`}>Medicament: {props.medicament.name}- {props.medicament.price} lei</a>
				{/* link catre materie urmat de id-ul materiei */}
			</p>
		</div>		
	);
}

export default MedicamentRow;