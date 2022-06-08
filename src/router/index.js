import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import LoginView from '../views/users/LoginView.vue'
import ProfileView from '../views/users/ProfileView.vue'

import BooksView from '../views/books/BooksView.vue'
import BookView from '../views/books/BookView.vue'
import BookCreate from '../views/books/BookCreate.vue'
import BookUpdate from '../views/books/BookUpdate.vue'

import AuthorsView from '../views/authors/AuthorsView.vue'
import AuthorView from '../views/authors/AuthorView.vue'
import AuthorCreate from '../views/authors/AuthorCreate.vue'
import AuthorUpdate from '../views/authors/AuthorUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView,
  },
  {
    path: '/author/create',
    name: 'authorCreate',
    component: AuthorCreate
  },
  {
    path: '/author/update/:id',
    name: 'authorUpdate',
    component: AuthorUpdate
  },
  {
    path: '/author/view/:id',
    name: 'author',
    component: AuthorView
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/book/create',
    name: 'bookCreate',
    component: BookCreate
  },
  {
    path: '/book/update/:id',
    name: 'bookUpdate',
    component: BookUpdate
  },
  {
    path: '/book/view/:id',
    name: 'book',
    component: BookView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
