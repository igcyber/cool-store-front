<template>
    <div class="col-lg-9">
        <!-- Navbar -->
        <NavComponent/>

        <div id="header-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div v-if="sliders.length > 0">
                    <div class="carousel-item" v-for="(slider, id) in sliders" :key="slider.id" :class="{active: id == 0}" style="height: 410px;">
                        <img class="img-fluid" :src="slider.image" alt="Image Slider">
                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div class="p-3" style="max-width: 700px;">
                                <h4 class="text-light text-uppercase font-weight-medium mb-3">{{ setting.promo_text }}</h4>
                                <h3 class="display-4 text-white font-weight-semi-bold mb-4">{{ setting.slogan_text }}</h3>
                                <a :href="slider.link" class="btn btn-light py-2 px-3">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <img 
                        class="img-fluid" 
                        :src="'https://placehold.co/1280x600'" 
                        alt="No Sliders Available" 
                    />
                </div>
            </div>
            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div class="btn btn-dark" style="width: 45px; height: 45px;">
                    <span class="carousel-control-prev-icon mb-n2"></span>
                </div>
            </a>
            <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                <div class="btn btn-dark" style="width: 45px; height: 45px;">
                    <span class="carousel-control-next-icon mb-n2"></span>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
    import NavComponent from "./Nav.vue";
    import {computed, onMounted} from 'vue';
    import {useStore} from 'vuex';
    export default {
        name: 'SliderComponent',

        components: {
            NavComponent
        },  

        setup(){
            //store vuex
            const store = useStore();

            //panggil action getSlidrs dari module slider
            onMounted(() => {
                store.dispatch('slider/getSliders'),
                store.dispatch('setting/getSetting')
            })

            //computed properti state sliders dari module slider untuk component
            const sliders = computed(() => store.state.slider.sliders)
            const setting = computed(() => store.state.setting.setting)
            
            return {
                store,
                sliders,
                setting
            }
        }
    }
</script>