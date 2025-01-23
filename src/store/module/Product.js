import Api from '../../api/Api';

const product = {
    //namespace module
    namespaced: true,

    //state
    state: {
        products: [],
    },

    //mutations
    mutations: {
        //set state products dari response
        GET_PRODUCTS(state, products){
            state.products = products;
        }
    },

    //actions
    actions: {
        getProducts({commit}){
            //get data products dari server
            Api.get('/products')
            .then(response => {
                //commit ke mutations dengan response
                commit('GET_PRODUCTS', response.data.products);
            })
            .catch(error => {
                //show error log
                console.log(error);
            })
        }
    },

    //getters
    getters: {

    }
}

export default product;