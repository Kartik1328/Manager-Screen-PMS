import React from 'react'
import ManagerScreen from './ManagerScreen'
import ManagerScreen2 from './ManagerScreen2'
import RouteToMgrView from './RouteToMgrView'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ManagerScreen2/>}></Route>
      <Route path="/review" element={<RouteToMgrView/>}></Route>
    </Routes>
    </BrowserRouter>
    // <div>
    //  <ManagerScreen/>
    //   {/* <ManagerScreen2/> */}
    //   {/* <PmsKra/> */}
    //   <RouteToMgrView/>
    // </div>
  )
}

export default App
