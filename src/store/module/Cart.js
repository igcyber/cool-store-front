import Api from '../../api/Api';

const cart = {
    namespaced: true,
    //state
    state:{
        cart: [],
        //total cart
        cartTotal: 0,
        //cart weight
        cartWeight: 0,
    },
    //mutations
    mutations: {
        //get data cart
        GET_CART(state, product){
            state.cart = product
        },
        //get total cart
        TOTAL_CART(state, total){
            state.cartTotal = total
        },
        //get cart weight
        CART_WEIGHT(state, weight){
            state.cartWeight = weight
        }
        
    },
    //actions
    actions: {
        //addToCart
        addToCart({commit}, {product_id, price, qty, weight}){
            //get data token dan user
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;

            //send data cart ke server
            Api.post('/cart', {
                product_id: product_id,
                price: price,
                qty: qty,
                weight: weight,
                customer_id: user.id
            })
            .then(() => {
                //get data cart
                Api.get('/carts')
                .then(response => {
                    //commit mutation GET_CART
                    commit('GET_CART', response.data.carts)
                })

                //get total cart
                Api.get('/cart/total-price')
                .then(response => {
                    //commit mutation TOTAL_CART
                    commit('TOTAL_CART', response.data.total)
                })
            })
        },
        
        //action cartCount
        cartCount({commit}){
            //get data token & user
            const token = localStorage.getItem('token');

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;

            //get data cart
            Api.get('/carts')
            .then(response => {
                //commit mutation to GET_CART
                commit('GET_CART', response.data.carts)
            })
        },

        //action get total price
        cartTotal({commit}){
            //get data token & user
            const token = localStorage.getItem('token');

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;

            //get data total cart
            Api.get('/cart/total-price')
            .then(response => {
                //commit mutation to TOTAL_CART
                commit('TOTAL_CART', response.data.total)
            })
        },

        //action get total weight
        cartWeight({commit}){
            //get data token & user
            const token = localStorage.getItem('token');

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;

            //get total weight
            Api.get('/cart/total-weight')
            .then(response => {
                //commit mutation to CART_WEIGHT
                commit('CART_WEIGHT', response.data.total)
            })
        },

        removeCart({commit}, cart_id){
            //get data token & user
            const token = localStorage.getItem('token');

            //set axios dengan headers type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token;

            //send remove request to server API
            Api.post('/cart/remove-item', {
                cart_id: cart_id
            })
            .then(() => {
                //get data carts
                Api.get('/carts')
                .then(response => {
                    commit('GET_CART', response.data.carts)
                })

                //get data total cart
                Api.get('/cart/total-price')
                .then(response => {
                    commit('TOTAL_CART', response.data.total)
                })

                //get total weight
                Api.get('/cart/total-weight')
                .then(response => {
                    //commit mutation to CART_WEIGHT
                    commit('CART_WEIGHT', response.data.total)
                })
            })
        }
    },
    //getters
    getters: {
        //get cart
        getCart(state){
            return state.cart
        },
        //count cart
        cartCount(state){
            return state.cart.length
        },
        //cart total price
        cartTotal(state){
            return state.cartTotal
        }
    }
}

export default cart;