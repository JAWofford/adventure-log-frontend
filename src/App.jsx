import { Routes, Route} from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import TopNav from './components/TopNav'
import './App.css'
import TripLogForm from './components/TripLogForm'
import TripList from './components/TripList'
import ReviewList from './components/ReviewList'

function App() {


  return (
  
  <div className="app">   
      
      <header className="app-header">
        <TopNav/>

      </header>

    <main>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/register" element={<RegistrationForm />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newtriplog" element={<TripLogForm />} />
        <Route path="/triplist" element={<TripList />} />
         <Route path="/reviewlist" element={<ReviewList />} />
      </Routes>
    </main> 

  </div>  
  )
}

export default App
