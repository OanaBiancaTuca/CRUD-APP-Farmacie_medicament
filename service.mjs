import Sequelize from "sequelize";
import { Farmacie, Medicament } from './repository.mjs';

// function where(request){
// 	if(request.query.filter){
// 		return request.query.filter.split(',').reduce((filter,condition)=>{
// 			let data=condition.split('-');
// 			filter[data[0]]={[Sequelize.Op[data[1]]]:data[2]};
// 			return filter;
// 		},{})
// 	}
// 	else{
// 		return undefined
// 	}
// }


// o functie pentru a obtine toate farmaciile
async function getFarmacii(request, response) {
	try {
		const f = await Farmacie.findAll({
			//where: where(request),
			// order:order(request)
		});//metoda findll() intoarce toate obiectele din colectie
		if (f.length > 0) {//daca am  inregistrari
			response.status(200).json(f);//serializez json in body rooms
		} else {
			response.status(204).send();//no content
		}
	} catch (error) {
		response.status(500).json(error);//erorile se serializeaza cu un status code
	}
}

async function getFarmacie(request, response) {
	try {
		if (request.params.id) {
			const f = await Farmacie.findByPk(request.params.id);
			if (f) {
				response.json(f);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addFarmacie(request, response) {
	try {
		if (request.body.name
			&& request.body.street && request.body.county && request.body.email) {//verificam daca ce vine din client e ok
			await Farmacie.create(request.body);//il creez
			response.status(201).send();
		} else {
			response.status(400).send();//daca nu e valid-> bad request
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

//pentru update
async function saveFarmacie(request, response) {
	try {
		const f = await Farmacie.findByPk(request.params.id);
		if (f) {
			Object.entries(request.body).forEach(([name, value]) => f[name] = value);
			await f.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function removeFarmacie(request, response) {
	try {
		if (request.params.id) {
			const f = await Farmacie.findByPk(request.params.id);
			if (f) {
				await f.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
async function getMedicamente(request, response) {
	try {
		const medicamente = await Medicament.findAll({
			where: request.query.farmacieId
				? {farmacieId: {[Sequelize.Op.eq]: request.query.farmacieId}}
				: undefined,
			//   attributes: ['id', 'name', 'price', 'noUnits','farmacieId']

		});
		if (medicamente.length > 0) {
			response.status(200).json(medicamente);
		} else {
			response.status(204).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
async function getMedicament(request, response) {
	try {
		if (request.params.id) {
			const m = await Medicament.findByPk(request.params.id);
			if (m) {
				response.json(m);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addMedicament(request, response) {
	try {
		if (request.body.name
			&& request.body.price
			&& request.body.noUnits
			&& request.body.farmacieId) {
			await Medicament.create(request.body);
			response.status(201).send();
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function saveMedicament(request, response) {
	try {
		const m = await Medicament.findByPk(request.params.id);
		if (m) {
			Object.entries(request.body).forEach(([name, value]) => m[name] = value);
			await m.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function removeMedicament(request, response) {
	try {
		if (request.params.id) {
			const m = await Medicament.findByPk(request.params.id);
			if (m) {
				await m.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
// function order(request){
// 	if(request.headers['x-sort']){
// 		return request.headers['x-sort'].split(',').reduce((sort,field)=>{
// 			sort.push([field.substring(1),field.charAt(0) === '+' ? 'ASC':'DESC']);
// 			return sort;
// 		},[]);
// 	}
// 	else{
// 		return undefined;
// 	}
// }

// function attributes(req){
//     if(req.headers['x-fields']){ //ce nu e standard trb prefixat cu x-
//         return  req.headers['x-fields'].split(',');
//     } else{
//         return undefined;
//     }
// }


export {getFarmacie,addFarmacie,getFarmacii,saveFarmacie,removeFarmacie,getMedicamente,addMedicament,
    getMedicament,saveMedicament,removeMedicament};