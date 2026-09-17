import { Routes, Route } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import TopNav from './components/TopNav'
import './App.css'
import TripLogForm from './components/TripLogForm'
import TripList from './components/TripList'
import ReviewList from './components/ReviewList'
import TripDetail from './components/TripDetail'
import ReviewForm from './components/ReviewForm'
import ReviewDetail from './components/ReviewDetail'
import AboutPage from './components/AboutPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {


  return (

    <div className="app">
      {/* starts new pages scrolled to the top */}
      <ScrollToTop/>

      <header className="app-header">
        
          <TopNav />
        
      </header>


      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* Trips */}
          <Route path="/newtriplog" element={<TripLogForm />} />
          <Route path="/triplist" element={<TripList />} />
          <Route path="/trip/:tripId" element={<TripDetail />} />
          {/* Reviews */}
          <Route path="/reviewlist" element={<ReviewList />} />
          <Route path="/review/:campgroundId" element={<ReviewDetail />} />
          <Route path="/newReview" element={<ReviewForm />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <Footer />
      </footer>

    </div>
  )
}

export default App
