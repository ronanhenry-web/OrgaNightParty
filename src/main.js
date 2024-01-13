import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'

import { firebaseApp } from './firebase'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
})

app.mount('#app')
