import axios from "axios";

const BaseUrl= import.meta.env.VITE_BACKEND_BASE_URL
const axiosInstant=axios.create({
   baseURL:BaseUrl,
})

//request interceptors

axiosInstant.interceptors.request.use(
    (request)=>{
        const accesstoken= localStorage.getItem('accesstoken')
       /* console.log(request)*/
        if(accesstoken){
            request.headers.Authorization= `Bearer ${accesstoken}`
        }
        return request
    },
    (Error)=>{
        return Promise.reject(Error)
    }
)

// respone interceptors

axiosInstant.interceptors.response.use(
    function(response){
        return response
    },
    async function(error){
        const originalRequest=error.config;
        if(error.response.status===401 && !originalRequest.retry){
            originalRequest.retry=true
            const refreshToken=localStorage.getItem('refreshtoken')

            try{
                const response= await axiosInstant.post('account/refresh/',{refresh:refreshToken})
                console.log('refreshertoken refreshed')
                localStorage.setItem('accesstoken',response.data.access)
                originalRequest.headers.Authorization=`Bearer ${response.data.access}`
                return axiosInstant(originalRequest)
            }
            catch(err){
                localStorage.removeItem('accesstoken')
                localStorage.removeItem('refreshtoken')
                return Promise.reject(err)
        }
       
    }
     return Promise.reject(error);
}
    
)

export default axiosInstant