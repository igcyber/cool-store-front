import {createStore} from 'vuex';
import auth from './module/Auth';
import order from './module/Order';
import category from './module/Category';
import slider from './module/Slider';
import setting from './module/Setting';
import product from './module/Product';
import cart from './module/Cart';


export default createStore({
    modules : {
        auth,
        order,
        category,
        slider,
        setting,
        product,
        cart
    }
})