import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InternshipForm from './InternshipForm'
import Paymet from './Paymet'

function AllRoutes() {
  return (
    
        <Routes>
          <Route path="/" element={<InternshipForm />} />
          <Route path="/payment-page" element={<Paymet />} />
        </Routes>
  )
}

export default AllRoutes