import Api from '../../api/Api'


const order = {
    //set namespace
    namespaced: true,
    
    //state
    state: {
        //define state 
        orders : [],
        detailOrder : {},
        productInOrder : [],

    },

    //mutations
    mutations: {
        //GET ORDER
        GET_ORDER(state, orders){
            state.orders = orders
        },

        //DETAIL ORDER
        DETAIL_ORDER(state, detailOrder){
            state.detailOrder = detailOrder
        },

        //PRODUCT IN ORDER
        PRODUCT_IN_ORDER(state, product){
            state.productInOrder = product
        }


    },

    //actions
    actions: {
        //get order
        getOrder({commit}){
            //define variable token
            const token = localStorage.getItem('token');

            //set default header axios dengan token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //akses api 
            Api.get('/order')
            .then(response => {
                //commit ke mutation GET_ORDER
                commit('GET_ORDER', response.data.data)
            })
        },

        //detail order
        detailOrder({commit}, snap_token) {
            //define variable token
            const token = localStorage.getItem('token')

            //set default axios header
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            
            //Akses api
            Api.get(`order/${snap_token}`)
            .then(response => {
                //commit ke mutation DETAIL_ORDER
                commit('DETAIL_ORDER', response.data.data)

                //commit ke mutation PRODUCT IN ORDER
                commit('PRODUCT_IN_ORDER', response.data.product)
            })
        }
    },

    //getters
    getters: {
        getOrder(state){
            return state.orders
        },

        detailOrder(state){
            return state.detailOrder
        },

        productInOrder(state){
            return state.productInOrder
        }
    }
}

export default order;