import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/Todo/TodoView.vue'
import AddTodo from '@/views/Todo/AddTodo.vue'
import EditTodo from '@/views/Todo/EditTodo.vue'

const routes = [
  {
    path: '/',
    name: 'todo.index',
    component: TodoView
  },
  {
    path: '/todos/create',
    name: 'todo.create',
    component: AddTodo
  },
  {
    path: '/todo/:id/edit',
    name: 'todo.edit',
    component: EditTodo,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
