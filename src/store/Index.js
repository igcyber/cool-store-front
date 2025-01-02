import {createStore} from 'vuex';
import auth from './module/Auth';
import order from './module/Order';

export default createStore({
    modules : {
        auth,
        order
    }
})