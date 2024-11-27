import React from 'react';
import { BrowserRouter, Route,Routes, Switch} from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import VerifyForm from './Pages/VerifyForm';
import ListItem from './Pages/ListItem';
import DataIndividual from './Pages/DataIndividual';
import ReservationDetail from './Pages/ReservationDetail';
function App() {
  return (
      <BrowserRouter>
     
          <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Login" element={<Login/>} />
                <Route path='/VerifyForm' element={<VerifyForm />} />
                <Route path='/ListItem' element={<ListItem />} />
                <Route path='/DataPage' element={<DataIndividual />} />
                <Route path='/ReservationDetail' element={<ReservationDetail />} />
            </Routes>
     
      </BrowserRouter>
  );
}

export default App;
