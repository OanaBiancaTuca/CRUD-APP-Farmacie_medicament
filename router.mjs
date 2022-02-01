import express from 'express';
import{getFarmacie,addFarmacie,getFarmacii,saveFarmacie,removeFarmacie,getMedicamente,addMedicament,
getMedicament,saveMedicament,removeMedicament} from './service.mjs';

const router=express.Router();

//tot ce tine de studenti
router.route('/farmacii')// toate apelurile care apartin de rooms
	.get((request, response) => getFarmacii(request, response))// primesc ub request si un response
	.post((request, response) => addFarmacie(request, response));



router.route('/farmacii/:id')
	.get((request, response) => getFarmacie(request, response))
	.patch((request, response) => saveFarmacie(request, response))//patch--update
	.delete((request, response) => removeFarmacie(request, response));

router.route('/medicamente')
	.get((request, response) => getMedicamente(request, response))
	.post((request, response) => addMedicament(request, response));


router.route('/medicamente/:id')
	.get((request, response) => getMedicament(request, response))
	.patch((request, response) => saveMedicament(request, response))
	.delete((request, response) => removeMedicament(request, response));

    export default router;