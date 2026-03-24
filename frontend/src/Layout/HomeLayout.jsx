
import { Outlet } from 'react-router-dom'
import Navbars from '../Components/Navbars'

function HomeLayout() {

  return (
    <>
    <Navbars />
    <div  style={{ paddingTop: "71px", 
                  background:'#c8cbcd',
                  width:'100%',
                  minHeight:'100vh'
                  }}>
                    
         <Outlet/>
    </div>
   
    </>
  )
}

export default HomeLayout