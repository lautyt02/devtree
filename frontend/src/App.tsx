import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Autentication } from './layouts'
import { Home, Login, Register } from './pages'
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route element={<Autentication />}>
            <Route path='/auth/login/' element={<Login/>}/>
            <Route path='/auth/register/' element={<Register/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
