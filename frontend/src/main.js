import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import '@/assets/css/tailwind.css'
import 'chartist/dist/chartist.css';

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        timeSince(date) {
            const seconds = Math.floor((+new Date() - date) / 1000);
            let interval = Math.floor(seconds / 31536000);
            if (interval >= 1) {
                return `${interval} year${(interval > 1 ? 's' : '')}`;
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                return `${interval} month${(interval > 1 ? 's' : '')}`;
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                return `${interval} day${(interval > 1 ? 's' : '')}`;
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return `${interval} hour${(interval > 1 ? 's' : '')}`;
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                return `${interval} minute${(interval > 1 ? 's' : '')}`;
            }
            return `${Math.floor(seconds)} seconds`;
        },
        fileSize(size) {
            return (size / 1000 < 1000)
                ? `${(size / 1000).toFixed(2)} KB`
                : `${(size / 1000000).toFixed(2)} MB`;
        },
    },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
