import './Default.css'

import { Route, Routes } from 'react-router-dom'

// components
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

// pages
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import NotFound from '../../pages/NotFound/NotFound'
import LogInPage from '../../pages/LogInPage/LogInPage'
import SignUp from '../../pages/SignUp/SignUp'
import Guest from '../../pages/Guest/Guest'
import Admin from '../../pages/Admin/Admin'
import Business from '../../pages/Business/Business'
import CardDetails from '../../pages/CardDetails/CardDetails'
import Favorites from '../../pages/Favorites/Favorites'
import CreateNewCard from '../../pages/CreateNewCard/CreateNewCard'
import MyCards from '../../pages/MyCards/MyCards'
import UpdateCard from '../../pages/UpdateCard/UpdateCard'
import UpdatUser from '../../pages/UpdateUser/UpdateUser'


export default function Default() {
  return (
    <div className='Default'>

      <Header />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<LogInPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/update-user' element={<UpdatUser />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/business' element={<Business />} />
        <Route path='/guest' element={<Guest />} />
        <Route path='/card-details/:cardId' element={<CardDetails />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/my-cards' element={<MyCards />} />
        <Route path='/create-card' element={<CreateNewCard />} />
        <Route path='/update-card/:cardId' element={<UpdateCard />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  )
}
