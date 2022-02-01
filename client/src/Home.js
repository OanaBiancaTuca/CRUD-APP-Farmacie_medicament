//punct de intrare 

import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import FarmacieLine from './FarmacieLine'

function Home() {//functie pentru componenta bord

//afisez coloane care sa contina numele farmaciei si medicamentele care sunt disponibile in aceasta

//useState stie sa-mi initializeze componenta

const navigate = useNavigate();
  const [farmacii, setFarmacii] = useState([]);//o lista vida

  const loadFarmacii = async () => {
    const response = await fetch ('/models/farmacii');
    if (response.status === 200) {//statusul setat de noi 200 
      setFarmacii(await response.json());
    }
  };
  useEffect(() => loadFarmacii(), []);

  return (
    <div>   	
    <div className="butoaneStart">
    <input type="button" className="butonAdd" value="Home"
					onClick={()=>navigate('/')}/>
        	<input type="button" className="butonFarmacie" value="Adauga Farmacie"
					onClick={()=>navigate('farmacii/new')}/> 
          	<input type="button" className="butonFarmacie" value="Adauga Medicament"
					onClick={()=>navigate('medicamente/*/new')}/> 
           
    </div>
  
  <div className="container">
    {
      farmacii.map((farmacie, index) => <FarmacieLine key={index} farmacie={farmacie} index={index} height={100 / farmacie.length - 1} />)
 
    }
  </div>
  </div>
  )
}
export default Home;
