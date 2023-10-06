import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import Problem from '@/components/Problem.vue'
import Trend from "@/components/Trending.vue";
export const menuRouter = [
    {
        path: '/',
        name: 'problemPage',
        component: Problem
    },
    {
        path: '/trending',
        name: 'trendingPage',
        component: Trend
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...menuRouter
    ]
})

export default router
