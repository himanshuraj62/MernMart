import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
function App() {
 const dispatch =  useDispatch();
  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }
 useEffect(()=>{
    fetchUser()
    // fetchCategory()
    // fetchSubCategory()
    // fetchCartItem()
  },[])
  return (
    <>
      <Header />
      <main className='min-h-[75vh]' >
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
