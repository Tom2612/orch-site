import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Concerts from './pages/Concerts';
import ConcertPage from './pages/ConcertPage';
import ConcertForm from './pages/ConcertForm';
import GroupSignupForm from './pages/GroupSignupForm';
import Groups from './pages/Groups';
import GroupProfile from './pages/GroupProfile';
import ConcertUpdateForm from './pages/ConcertUpdateForm';
import GroupLogin from './pages/GroupLogin';
import PrivateRoute from './hooks/useProtect';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/concerts' element={<Concerts />} />
          <Route path='/concerts/:id' element={<ConcertPage />} />
          <Route path='/new-concert' element={<PrivateRoute><ConcertForm /></PrivateRoute>} />
          <Route path='/new-group' element={!user ? <GroupSignupForm /> : <Navigate to='/groups/profile' />} />
          <Route path='/login-group' element={!user ? <GroupLogin /> : <Navigate to='/groups/profile' />} />
          <Route path='/all-groups' element={<Groups />} />
          <Route path='/groups/profile' element={<PrivateRoute><GroupProfile /></PrivateRoute>} />
          <Route path={'/:id/edit'} element={<PrivateRoute><ConcertUpdateForm /></PrivateRoute>} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
