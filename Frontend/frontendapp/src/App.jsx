import React from 'react';
import { BrowserRouter, Route,Routes, Switch} from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import VerifyForm from './Pages/VerifyForm';
import ListItem from './Pages/ListItem';
function App() {
  return (
      <BrowserRouter>
     
          <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Login" element={<Login/>} />
                <Route path='/VerifyForm' element={<VerifyForm />} />
                <Route path='/ListItem' element={<ListItem />} />
            </Routes>
     
      </BrowserRouter>
  );
}

export default App;
