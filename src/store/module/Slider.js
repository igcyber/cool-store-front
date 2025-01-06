import Api from '../../api/Api';

const slider = {
    
    namespaced: true,

    //state
    state: {
        sliders: []
    },

    mutations: {
        GET_SLIDERS(state, sliders){
            state.sliders = sliders
        }
    },

    actions: {
        getSliders({commit}){

            //fetch data dari API Backend
            Api.get('/sliders')
            .then(response => {

                //commit perubahan data ke mutations
                commit('GET_SLIDERS', response.data.sliders);
            })
            .catch(error => {

                //show error log console
                console.log(error);
            })

        }
    },

    getters: {

    }

}

export default slider;