//form de editare

import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
//am importat useNavigate ma aajuta sa dau back la pagina
//am nevoie de params pt a putea accesa parametrii
// import './confirmDialog';

function FarmacieForm(props) {
	const navigate = useNavigate();//sa ma duc pe next
	const {farmacieId} = useParams();//iau id-ul 

	//constanta pentru a edita sala
	const [farmacie, setFarmacie] = useState({
		name: '',
        county:'',
		street: '',
        email:''
	});

	//incarc farmacia cu id-ul care imi este dat in url
	//iau farmacia  din server
	const loadFarmacie = async (farmacieId) => {
		if (farmacieId && farmacieId !== 'new') {
			const response = await fetch(`/models/farmacii/${farmacieId}`);
			if (response.status === 200) {
				setFarmacie(await response.json());//deserializam
			}
		}
	}
	useEffect(() => loadFarmacie(farmacieId), [farmacieId]);// sa se execute loodstudent cu studentId


	async function saveFarmacie() {
		if (farmacieId === 'new') {
			//avem post(student noua)
			const response = await fetch('/models/farmacii', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(farmacie)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
			const response = await fetch(`/models/farmacii/${farmacieId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(farmacie)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}
	async function deleteFarmacie() {
		if (farmacieId && farmacieId !== 'new'){
			const response = await fetch(`/models/farmacii/${farmacieId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}


	//pt onChange-- seteaza proprietatea name cu valoarea
	function set(property, value) {
		const record = {...farmacie};//facem un record (clona a lui student) ca sa avem o noua adresa
		record[property] = value;
		setFarmacie(record);
	}
	return (

<div>
		<div className="butoaneStart">
		<input type="button" className="butonAdd" value="Home"
						onClick={()=>navigate('/')}/>
		</div>
		<div className="form">
			<h1>Farmacie</h1>
			<form onSubmit={saveFarmacie} onReset={() => navigate('/')}>
				<label>Name</label>
				<input type="text" value={farmacie.name}
					onChange={event => set('name', event.target.value)}/>
					{/* trebuie sa am onChange altfel nu ma lasa sa editez */}
					{/* event.target.value e ce scrie in controlul respevctiv */}


                    <label>County</label>
				<input type="text" value={farmacie.county}
					onChange={event => set('county', event.target.value)}/>

                         <label>Street</label>
				<input type="text" value={farmacie.street}
					onChange={event => set('street', event.target.value)}/>
                           <label>Email</label>
				<input type="text" value={farmacie.email}
					onChange={event => set('email', event.target.value)}/>



				<div className="buttons">
					<input type="submit" value="Save"/>

					{/* delete e conditionat ca studentul  sa existe deja */}
					{farmacieId && farmacieId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteFarmacie}/>}


					<input type="reset" value="Cancel"/>
					{/* pe onClick pot pune navigate('/') */}


				</div>
			</form>
			<div id="dialog" className="modal-dialog"/>
		</div>		
		</div>
	);
}

export default FarmacieForm;