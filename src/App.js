import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Signup from './signup/singup';
import Notice from './signup/notice';
import Login from './signup/login';
import Activate from './signup/activate';
import Message from './signup/msg';
import ForgotPassword from './signup/forgotPassword';
import ResetPassword from './signup/reserPassword';
import UpdatePassword from './signup/updatePassword';
import GenerateUrl from './url-shortener/url';
import Shorten from './url-shortener/shorten';
import Base from './url-shortener/base';
import GeneratedLink from './url-shortener/dashboard';
import GetCounts from './url-shortener/counts';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Signup/>}/>
        <Route path='/notice' element={<Notice/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/activate/:id/:token' element={<Activate/>}/>
        <Route path='/message/:id' element={<Message/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/password-reset/:id/:token' element={<ResetPassword/>}/>
        <Route path='/update-password/:id/:token' element={<UpdatePassword/>}/>
        <Route path='/url-generate' element={<GenerateUrl/>}/>
        <Route path='/:shortId' element={<Shorten/>}/>
        <Route path='/base' element={<Base/>}/>
        <Route path='/links' element={<GeneratedLink/>}/>
        <Route path='/dashboard' element={<GetCounts/>}/>
      </Routes>
    </div>
  );
}

export default App;
