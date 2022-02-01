import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";


function MedicamentForm(props) {
	const navigate = useNavigate();
	const {medicamentId} = useParams();
	const {search} = useLocation();
	const queryParameters = new URLSearchParams(search);
	const farmacieId = queryParameters.get('farmacieId');
	const [medicament, setMedicament] = useState({
		name: '',
		price: 0,
		noUnits: 0,
		farmacieId: farmacieId ? farmacieId : 'new'
	
	});
	const [farmacii, setFarmacii] = useState([]);


	const loadMedicament = async (medicamentId) => {
		if (medicamentId && medicamentId !== 'new') {
			const response = await fetch(`/models/medicamente/${medicamentId}`);
			if (response.status === 200) {
				setMedicament(await response.json());
			}
		}
	}

	const loadFarmacii = async () => {
		const response = await fetch(`/models/farmacii`);
		if (response.status === 200) {
			setFarmacii(await response.json());
		}
	};
	
	useEffect(() => loadFarmacii(), [farmacii]);
	useEffect(() => loadMedicament(medicamentId), [medicamentId]);


	function set(property, value) {
		const record = {...medicament};
		record[property] = value;
		setMedicament(record);
	}



	async function saveMedicament() {
		if (medicamentId === 'new') {
			const response = await fetch(`/models/medicamente`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(medicament)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/models/medicamente/${medicamentId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(medicament)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deleteMedicament() {
		if (medicament.id && medicamentId !== 'new') {
			const response = await fetch(`/models/medicamente/${medicamentId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}


	return (

		<div>
				<div className="butoaneStart">
		<input type="button" className="butonAdd" value="Home"
						onClick={()=>navigate('/')}/>
		</div>
		<div className="form">
			<h1>Medicament</h1>
			<form onSubmit={saveMedicament} onReset={() => navigate('/')}>
				<label>Name</label>
				<input type="text" value={medicament.name}
					onChange={event => set('name', event.target.value)}/>
					{/* trebuie sa am onChange altfel nu ma lasa sa editez */}
					{/* event.target.value e ce scrie in controlul respevctiv */}


                    <label>Price</label>
				<input type="float" value={medicament.price}
					onChange={event => set('price', event.target.value)}/>

                         <label>Number of unit:</label>
				<input type="number" value={medicament.noUnits}
					onChange={event => set('noUnits', event.target.value)}/>

{/*                     
				<label>Farmacie</label>
				<div className="select">
					<select value={medicament.farmacieId}
						onChange={event => set('farmacieId', event.target.value)}>
						<option value="new">-- New --</option>
						{
							farmacii.map((farmacie, index) =>
								(<option key={index} value={farmacie.id}>{farmacie.name}</option>))
						}
					</select>	
					<input type="button" className="edit" value="Edit"
						onClick={() => navigate(`/farmacii/${medicament.farmacieId}`)}/>	
				</div>
 */}


				<div className="buttons">
					<input type="submit" value="Save"/>

					{/* delete e conditionat ca studentul  sa existe deja */}
					{medicamentId && medicamentId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteMedicament}/>}


					<input type="reset" value="Cancel"/>
					{/* pe onClick pot pune navigate('/') */}


				</div>
			</form>
			<div id="dialog" className="modal-dialog"/>
		</div>		
		</div>
	);
}

export default MedicamentForm;