import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Rootlayout from './Layout/Rootlayout'
import Home from './Pages/Home'
import AuthProvider from './Context/AuthProvider'
import ProtectedRoute from './Routes/protectedRoute'
import PublicRoute from './Routes/PublicRoute'
import HomeLayout from './Layout/HomeLayout'
import Jobs from './Pages/Jobs'
import CompaniesLayouts from './Layout/CompaniesLayout'
import AllCompanies from './Pages/Company/AllCompanies'
import Company from './Pages/Company/Company'
import JobInformation from './Pages/JobInformation'
import Profile from './Pages/Profile'
import Application from './Pages/Application'
import CompanyRegister from './Pages/Company/CompanyRegister'
import JobPost from './Pages/Company/JobPost'
import ApplicationReview from './Pages/Company/ApplicationReview'

function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<Rootlayout/>}>
      {/* publicroutes */}
        <Route index element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='signup' element={<PublicRoute><Signup/></PublicRoute>}/>

      {/* privateroutes */}
        <Route  element={<ProtectedRoute><HomeLayout/></ProtectedRoute>}>
           <Route path='home' element={<Home/>}/>
           <Route path='job' element={<Jobs/>}/>
           <Route path='job/:id' element={<JobInformation/>}/>
           <Route path='user' element={<Profile/>}/>
           <Route path='application/:id' element={<Application/>}/>
           <Route path='Companyregister' element={<CompanyRegister/>}/>
           <Route path='jobpost' element={<JobPost/>}/>
        </Route>

        <Route path='companies' element={<ProtectedRoute><CompaniesLayouts/></ProtectedRoute>}>
            <Route index element={<AllCompanies/>}/>
            <Route path=':id' element={<Company/>}/> 
            <Route path='review/:id' element={<ApplicationReview/>}/>
        </Route>
      </Route>

      
    )
  )
  return (
    <>
    <AuthProvider>  
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </>
  )
}

export default App
