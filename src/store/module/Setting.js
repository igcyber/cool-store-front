import Api from '../../api/Api';

const setting = {
    
    namespaced: true,

    //state
    state: {
        setting : []
    },

    mutations: {
        GET_SETTING(state, setting){
            state.setting = setting
        }
    },

    actions: {
        getSetting({commit}) {
            Api.get('/setting')
            .then(response => {
                commit('GET_SETTING', response.data.setting)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },

    getters: {
    
    }

}

export default setting;