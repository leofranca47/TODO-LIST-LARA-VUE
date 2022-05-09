<template>
    <div>
        <h1>
            Listagem de tarefas
            <router-link :to="{name: 'todo.create'}"><i class="fas fa-plus-circle"></i></router-link>
        </h1>

        <b v-if="loading">Carregando ...</b>

        <ul>
            <li v-for="todo in todos" :key="todo.identify">
                <Todo
                    :todo="todo"
                    @deleteTodo="removeTodoList"
                    @toogleCompleted="updateCompleted"
                />
            </li>
        </ul>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import TodoService from '@/services/Todos.service.js'
    import Todo from './todo'

    export default {
        name: 'TodoView',
        setup() {
            const todos = ref([])
            const loading = ref(true)

            onMounted(() => {
                TodoService.getAll()
                                .then(response => todos.value = response.data.data)
                                .catch(error => console.log(error))
                                .finally(
                                    loading.value = false
                                )
            })

            const updateCompleted = (todo, params) => {
                todos.value[todos.value.indexOf(todo)]['completed'] = params;
            }

            const removeTodoList = (todo) => todos.value.splice(todos.value.indexOf(todo), 1)

            return {
                loading,
                todos,
                removeTodoList,
                updateCompleted,
            }
        },

        components: {
            Todo
        }
    }
</script>
