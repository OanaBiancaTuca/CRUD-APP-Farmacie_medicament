import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import FarmacieForm from './FarmacieForm';
import Home from './Home';
import './index.css';
import MedicamentForm from './MedicamentForm';
import MedicamentForm2 from './MedicamentForm2';


ReactDOM.render(

  <HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/farmacii/:farmacieId" element={<FarmacieForm />} />
    <Route path="/medicamente/:medicamentId" element={<MedicamentForm />} />
    <Route path="/medicamente/*/:medicamentId/" element={<MedicamentForm2 />} />

  </Routes>
</HashRouter>,
  document.getElementById('root')
);

