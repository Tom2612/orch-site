import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './hooks/useProtect';
import ErrorPage from './components/ErrorPage';
import Unauthorized from './pages/Unauthorized';

// OLD Concert pages
import ConcertPage from './pages/ConcertPage';

// NEW Concert Pages
import AllConcerts from './features/concerts/AllConcerts';
import ConcertDetails from './features/concerts/ConcertDetails';
import NewConcert from './features/concerts/NewConcert';
import EditConcert from './features/concerts/EditConcert';

// Group Pages
import GroupSignupForm from './pages/GroupSignupForm';
import GroupProfile from './pages/GroupProfile';
import GroupLogin from './pages/GroupLogin';
import GroupUpdateForm from './pages/GroupUpdateForm';



function App() {
  const { user } = useAuth();
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className='pages'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/concerts' element={<AllConcerts />} />
          {/* <Route path='/concerts/:id' element={<ConcertPage />} /> */}
          <Route path='/concerts/:id' element={<ConcertDetails />} />
          <Route path='/new' element={<PrivateRoute><NewConcert /></PrivateRoute>} />
          <Route path='/concerts/edit/:id' element={<PrivateRoute><EditConcert /></PrivateRoute>} />

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
