import {config} from 'dotenv';
import Sequelize from 'sequelize';

config({});
let sequelize;
if(process.env.MODE==='development'){
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: './farmacii.db',//in ce fisier este stocata baza  ./ inseamna relativ la fisierul acesta
		define: {
			timestamps: false
		}
	});

}
else{
	sequelize=new Sequelize(process.env.DATABASE_URL,{
		dialect:'postgres',
		protocol:'postgres',
		dialectOptions:{
			ssl:{
				require:true,
				rejectUnauthorized:false
			}
		}
	})

}
const Farmacie = sequelize.define('farmacie', {
	id: {//numele coloanei
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,//defaultValue spun cum sa genereze default aceasta valoare
		allowNull: false,// trebuie sa completeze acolo ceva
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	county: {
		type: Sequelize.STRING,
		allowNull: false
	},
	street: {
		type: Sequelize.STRING,
		allowNull: false
	},
    email:{
        type: Sequelize.STRING,
        isEmail:true,
		allowNull: false

    }	
});
const Medicament = sequelize.define('medicament', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			min:1
		}
	},
    noUnits:{
        type: Sequelize.INTEGER,
		allowNull: false
    }	
});
Farmacie.hasMany(Medicament, {foreignKey: 'farmacieId'});
Medicament.belongsTo(Farmacie, {foreignKey: 'farmacieId'});

async function initialize() {
	await sequelize.authenticate(); //apel de authenticate --> pt a se conecta la baza
	await sequelize.sync({alter: true});//va astepta sa faca sync cu modelul
	//functia sync este universala --> se intampla pentru orice store
	//actualizeza definitiile din baza de date conform cu definitiile din orm
	//creaza tabelel daca nu exista
	//force : true rescrie de fiecare data tabelele
	//alter: true---->face merge intre cum arata modelul meu acum si cum e in baza
}

//la final export 
export {
	initialize,
	Farmacie,Medicament
};