import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Index'
import store from './store/Index'

const app = createApp(App)

app.use(router);
app.use(store);

app.mixin({
    methods : {
        moneyFormat(number) {
            let val = (number/1).toFixed(2).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },   
        calcDiscount(product){
            return product.price - (product.price * (product.discount)/100);
        }
    }
});

app.mount('#app');


