import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Concerts from './pages/Concerts';
import ConcertPage from './pages/ConcertPage';
import ConcertForm from './pages/ConcertForm';
import GroupSignupForm from './pages/GroupSignupForm';
import GroupProfile from './pages/GroupProfile';
import ConcertUpdateForm from './pages/ConcertUpdateForm';
import GroupLogin from './pages/GroupLogin';
import PrivateRoute from './hooks/useProtect';
import GroupUpdateForm from './pages/GroupUpdateForm';
import ErrorPage from './components/ErrorPage';
import Unauthorized from './pages/Unauthorized';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className='pages'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/concerts' element={<Concerts />} />
          <Route path='/concerts/:id' element={<ConcertPage />} />
          <Route path='/concerts/edit/:id' element={<PrivateRoute><ConcertUpdateForm /></PrivateRoute>} />
          <Route path='/new-concert' element={<PrivateRoute><ConcertForm /></PrivateRoute>} />
          <Route path='/new-group' element={!user ? <GroupSignupForm /> : <Navigate to='/groups/profile' />} />
          <Route path='/login-group' element={!user ? <GroupLogin /> : <Navigate to='/groups/profile' />} />
          <Route path='/groups/profile' element={<PrivateRoute><GroupProfile /></PrivateRoute>} />
          <Route path='/groups/edit/:id' element={<PrivateRoute><GroupUpdateForm /></PrivateRoute>} />
          <Route path='/unauthorised' element={<Unauthorized />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
