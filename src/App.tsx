import { BrowserRouter as Router, Routes, Route } from 'react-router';

import './App.css'
import { Dashboard } from './components/dashboard';

function App() {

  return (
   <Router  basename='/widget-app'>
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
   </Router>
  )
}

export default App
