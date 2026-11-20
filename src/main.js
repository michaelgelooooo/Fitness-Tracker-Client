import 'bootswatch/dist/flatly/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "notyf/notyf.min.css";

import { createRouter, createWebHistory } from "vue-router";
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import Logout from "./pages/Logout.vue";
import Workouts from './pages/Workouts.vue';
import AddWorkout from './pages/AddWorkout.vue';
import EditWorkout from './pages/EditWorkout.vue';
import ErrorPage from "./pages/ErrorPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/logout",
            name: "Logout",
            component: Logout,
        },
        {
            path: "/workouts",
            name: "Workouts",
            component: Workouts,
        },
        {
            path: "/workouts/addWorkout",
            name: "Add Workout",
            component: AddWorkout,
        },
        {
            path: "/workouts/editWorkout/:id",
            name: "Edit Workout",
            component: EditWorkout,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "Not Found",
            component: ErrorPage,
        }
    ]
});

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');