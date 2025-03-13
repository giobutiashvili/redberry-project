import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDown, faCheck} from '@fortawesome/free-solid-svg-icons';;

library.add(faAngleDown,faCheck,);
const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
