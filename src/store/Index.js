import {createStore} from 'vuex';
import auth from './module/Auth';
import order from './module/Order';
import category from './module/Category';
import slider from './module/Slider';


export default createStore({
    modules : {
        auth,
        order,
        category,
        slider
    }
})