import axios, {AxiosRequestConfig} from 'axios'
import { useRouter } from 'next/router'

interface AuthFetchProps {
    endpoint: string
    redirectRoute: string
    formData: any
    options?: AxiosRequestConfig<any>
}

export function useAuthFetch(){
    const router = useRouter()

    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options
    }: AuthFetchProps) => {
        try {
            const {data} = await axios.post(`/api/auth/${endpoint}`,
                formData,
                options
            )

            /*Mostrar una notificacion*/

            if(redirectRoute) router.push(redirectRoute)


            
        } catch (error) {
            
        }
    }

    return authRouter
}