import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import CartMobileLink from "./Components/CartMobile"
import GlobalProvider from './provider/GlobalProvider';
function App() {
  const location = useLocation()
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response

      if (responseData.success) {

        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {

    } finally {
      dispatch(setLoadingCategory(false))
    }
  }
  const fetchSubCategory = async () => {
    try {
      //  dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {

        dispatch(setAllSubCategory(responseData.data))
      }
    } catch (error) {

    } finally {
      // dispatch(setLoadingCategory(false))
    }
  }

  // const fetchCartItem = async ()=> {
  //   try {
  //      const response = await Axios({
  //           ...SummaryApi.getCartItem
  //       })
  //       const { data : responseData } = response
  //       if(responseData.success){
  //         console.log(responseData)
  //       dispatch(handleAddItemCart(responseData.data))

  //       }
  //   } catch (error) {

  //   }
  // }
  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  }, [])
  return (

    <GlobalProvider>
      <Header />
      <main className='min-h-[75vh]' >
        <Outlet />
      </main>
      <Footer />
      <Toaster />

      {
        location.pathname !== '/checkout' && (
          <CartMobileLink />
        )
      }

    </GlobalProvider>

  )
}

export default App
