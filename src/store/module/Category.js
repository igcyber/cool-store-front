import Api from '../../api/Api';

const category = {
    
    namespaced: true,

    //state
    state: {
        categories : [],
        
        //product in category
        productInCategory: [],

        //product in subcategory
        productInSubcategory: [],
        
    },

    mutations: {
        GET_CATEGORIES(state, categories){
            state.categories = categories
        },

        PRODUCT_IN_CATEGORY(state, products){
            state.productInCategory = products
        },

        PRODUCT_IN_SUBCATEGORY(state, products){
            state.productInSubcategory = products
        }
    },

    actions: {
        getCategories({commit}) {
            Api.get('/categories')
            .then(response => {
                commit('GET_CATEGORIES', response.data.categories)
            })
            .catch(error => {
                console.log(error)
            })
        },

        getProductInCategory({commit}, slug){
            //get data product by category ke server
            Api.get(`/category/${slug}`)
            .then(response => {
                //commit ke mutation PRODUCT_IN_CATEGORY
                commit('PRODUCT_IN_CATEGORY', response.data.product)
            })
            .catch(error => {
                console.log(error)
            })
        },

        getProductInSubCategory({commit}, slug){
            //get data product by subcategory ke server
            Api.get(`/sub_category/${slug}`)
            .then(response => {
                //commit ke mutation PRODUCT_IN_CATEGORY
                commit('PRODUCT_IN_SUBCATEGORY', response.data.product)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },

    getters: {
    
    }

}

export default category;