
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ShowApplicants from "./pages/ShowApplicants"
import EditApplicant from "./pages/EditApplicant"
import AllotmentOrderPage from "./pages/AllotmentOrderPage"
import { Register } from "./components/Register"
import { Login } from "./components/Login"

function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element= { <HomePage /> }></Route>
          <Route path="/view-all" element= { <ShowApplicants /> }></Route>
          <Route path="/edit/:id" element= { <EditApplicant /> }></Route>
          <Route path="/allotment/:id" element= {<AllotmentOrderPage /> }></Route>
          <Route path='/register' element= { <Register /> }></Route>
          <Route path="/login" element= { <Login /> }></Route>
      </Routes>
    </>
  )
}

export default App
