import React from 'react'
import VirusGame from './components/game'
import { Route, Routes } from 'react-router-dom'
import RedeemPage from './components/remeam'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {   <VirusGame />} />
      <Route path='/redeem' element = { <RedeemPage /> } />
    </Routes>
 
    </>
  )
}
