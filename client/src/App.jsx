
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ShowApplicants from "./pages/ShowApplicants"
import EditApplicant from "./pages/EditApplicant"
import AllotmentOrderPage from "./pages/AllotmentOrderPage"

function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element= { <HomePage /> }></Route>
          <Route path="/view-all" element= { <ShowApplicants /> }></Route>
          <Route path="/edit/:id" element= { <EditApplicant /> }></Route>
          <Route path="/allotment/:id" element= {<AllotmentOrderPage /> }></Route>
      </Routes>
    </>
  )
}

export default App
