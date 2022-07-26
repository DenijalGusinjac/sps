
import axios from "../plugins/axios"
export default {
    namespace: true,

    state:{
        token: null,
        user: null
    },

    mutations:{

    },
    
    actions: {
        async login (_, credentials){
            
            const response = await axios.post('auth', credentials )
            console.log(response)
        }
    }
}