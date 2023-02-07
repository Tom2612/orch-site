import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Concerts from './pages/Concerts';
import ConcertPage from './pages/ConcertPage';
import ConcertForm from './pages/ConcertForm';
import GroupForm from './pages/GroupForm';
import Groups from './pages/Groups';
import GroupProfile from './pages/GroupProfile';
import ConcertUpdateForm from './pages/ConcertUpdateForm';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/concerts' element={<Concerts />} />
          <Route path='/concerts/:id' element={<ConcertPage />} />
          <Route path='/new-concert' element={<ConcertForm />} />
          <Route path='/new-group' element={<GroupForm />} />
          <Route path='/all-groups' element={<Groups />} />
          <Route path='/profile' element={<GroupProfile />} />
          <Route path={'/:id/edit'} element={<ConcertUpdateForm />} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
