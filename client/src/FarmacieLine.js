//linia farmaciei

import React, {useState, useEffect} from 'react';
import MedicamentRow from './MedicamentRow';

function FarmacieLine(props) {
	//cu ajutorul lui props vom lua setari ale componentei cand e utilizata-->atributele date vor fi 
	//vizibile prin props

	const [medicamente, setMedicamente] = useState([]);
	const style = {
		height: `${props.height}%`,
	};
	//incarc medicementele pentru farmacia curenta
	const loadMedicamente = async (farmacieId) => {
		const response = await fetch(`/models/medicamente?farmacieId=${farmacieId}`);
		if (response.status === 200) {
			setMedicamente(await response.json());
		}
	};
	useEffect(() => loadMedicamente(props.farmacie.id), [props.farmacie.id]);
	return (
		<div className={`column background${props.index % 4 + 1}`} style={style}>
			<p className="column-title">
				<a href={`#/farmacii/${props.farmacie.id}`}>{props.farmacie.name} </a>
                <a href={`#/medicamente/new?farmacieId=${props.farmacie.id}`} className="add">+</a>
				{/* pentru adaugare --student.id studentul  in care vrem sa adaugam*/}
                <p className='pSecundar'>{props.farmacie.county} {props.farmacie.street}</p>
				{/* generez editarea */}


			



			</p>
            {/* mapam fiecare medicament */}
			<div className="cards">
				{
					medicamente.map((medicament, index) => <MedicamentRow medicament={medicament} index={props.index} key={index}/>)
				}
			</div>
		</div>
	);
}

export default FarmacieLine;