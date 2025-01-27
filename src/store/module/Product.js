import Api from '../../api/Api';

const product = {
    //namespace module
    namespaced: true,

    //state
    state: {
        products: [],

        //detail single product
        product: {}
    },

    //mutations
    mutations: {
        //set state products dari response
        GET_PRODUCTS(state, products){
            state.products = products;
        },

        //set state detail single product
        DETAIL_PRODUCT(state, product){
            state.product = product;
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
        },

        //get single product detail dari server
        getDetailProduct({commit}, slug){
            Api.get(`/product/${slug}`)
            .then(response => {
                //commit data ke mutation dengan response
                commit('DETAIL_PRODUCT', response.data.product)
            })
            .catch(error => {
                console.log(error);
            })
        }

    },

    //getters
    getters: {

    }
}

export default product;