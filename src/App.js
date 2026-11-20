import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Features from './pages/Features.js';
import Signup from './pages/Signup.js';
import Signin from './pages/Signin.js';
import Dashboard from './pages/Dashboard.js';
import Profileupd from './pages/Profileupd.js';
import ProfilePage from './component/ProfilePage.js';
import Transaction from './pages/Transaction.js';
import Budgetgoals from './pages/Budgetgoals.js';
import About from './pages/About.js';
import Reports from './pages/Reports.js';
import Settings from './pages/Settings.js';



function App() {
  return (
    <div className="App">

      <BrowserRouter>


      <Routes>

        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/features' element={<Features></Features>}></Route>

        <Route path='/abt'  element={<About></About>}></Route>


        <Route path='/signup' element={<Signup></Signup>}></Route>

        <Route path='/signin' element={<Signin></Signin>}></Route>

        <Route path='/profileupd' element={<Profileupd></Profileupd>}></Route>


        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>


        <Route path='/transactions' element={<Transaction></Transaction>}></Route>


        <Route path='/budgetgoals' element={<Budgetgoals></Budgetgoals>}></Route>


        <Route path='/reports' element={<Reports></Reports>}></Route>

        <Route path='/settings' element={<Settings></Settings>}></Route>






    
      </Routes>



      </BrowserRouter>
    
    </div>
  );
}

export default App;
