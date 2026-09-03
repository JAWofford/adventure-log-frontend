import { Routes, Route, Link} from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

function App() {


  return (
  
  <div className="app">   
      <h1>Adventure Log</h1>

    <main>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/register" element={<RegistrationForm />}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main> 

    <Link to="/register">
      <h3>Register</h3>
    </Link>

  </div>  
  )
}

export default App
