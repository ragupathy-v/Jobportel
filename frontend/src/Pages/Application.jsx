
import { useParams } from 'react-router-dom'


function Application() {
    const{id}=useParams()
    //const [applicationStates,setApplicationStates]=useState(false)


    

    
  return (
    <>    
      <p>Application successfully applied</p>  
    </>
  )
}

export default Application