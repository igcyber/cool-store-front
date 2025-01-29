import Api from '../../api/Api';

const auth = {
    namespaced: true,

    state: {
        //state untuk token, menggunakan local storage untuk menyimpan token JWT
        token : localStorage.getItem('token') || '',

        //state untuk user, menggunakan local storage untuk menyimpan data user login
        user : JSON.parse(localStorage.getItem('user')) || {}
    },

    mutations: {
        AUTH_SUCCESS(state, token, user){
            state.token = token;
            state.user = user;
        },

        GET_USER(state, user){
            state.user = user;
        },

        AUTH_LOGOUT(state){
            state.token = '';
            state.user = {};
        }
    },

    actions: {
        //action register
        register({ commit }, user) {

        //define callback promise
        return new Promise((resolve, reject) => {

            //send data ke server
            Api.post('/register', {

                    //data yang dikirim ke serve untuk proses register
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation

                })

                .then(response => {

                    //define variable dengan isi hasil response dari server
                    const token = response.data.token
                    const user = response.data.user

                    //set localStorage untuk menyimpan token dan data user
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = "Bearer " +  token

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    commit('GET_USER', user)

                    //resolve ke component dengan hasil response
                    resolve(response)

                }).catch(error => {

                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })

            })
        
        },

        getUser({commit}){
            //ambil data token dari localStorage
            const token = localStorage.getItem('token');

            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get('/user')
            .then(response => {
                //commit ke mutation GET_USER dengan response
                commit('GET_USER', response.data.user)
            })
        },

        logout({commit}) {
            return new Promise((resolve) => {

                //commit ke mutation
                commit('AUTH_LOGOUT')

                //remove value dari localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                // commit ke module cart, untuk set mutation dan state cart menjadi kosong
                commit('cart/GET_CART', 0, {root: true})
                commit('cart/TOTAL_CART', 0, {root: true})

                //delete dari header axios
                delete Api.defaults.headers.common['Authorization'];

                //return resolve to component
                resolve()

            })

        },

        login({commit}, user){
            return new Promise((resolve, reject) => {
                Api.post('/login', {
                    //request ke server
                    email : user.email,
                    password : user.password
                })
                .then(response => {
                    //simpan response dari server ke variable 
                    const token = response.data.token;
                    const user = response.data.user;

                    //simpan data user ke localstorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user))

                    //set default header axios dengan token
                    Api.defaults.headers.common['Authorization'] = "Bearer " + token;

                    //commit auth success ke mutation
                    commit('AUTH_SUCCESS', token, user)

                    //commit get user ke mutation
                    commit('GET_USER', user)

                    //commit cartTotal dan cartCount ke state module cart
                    Api.get('/carts')
                    .then(response => {

                        //commit mutation GET_CART
                        commit('cart/GET_CART', response.data.carts, {root: true})
                    })

                    Api.get('/cart/total-price')
                    .then(response => {

                        //commit mutation TOTAL_CART
                        commit('cart/TOTAL_CART', response.data.total, {root: true})
                    })

                    //resolve ke component dengan response
                    resolve(response)
                })
                .catch(error => {
                    //jika gagal remove token dan localstorage
                    localStorage.removeItem('token');

                    //reject ke component dengan response
                    reject(error.response.data);
                })
            })
        }
            
    },

    getters: {

        //get current user
        currentUser(state){
            return state.user
        },

        //logged in
        isLoggedIn(state){
            return state.token
        }

    }

}

export default auth;