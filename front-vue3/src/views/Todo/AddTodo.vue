<template>
    <div>
        <h1>Adicionar uma nova tarefa</h1>
        <form action='#' method="post" @submit.prevent="addTodo">
            <input type="text" placeholder="nome" v-model="todo.name">
            <input type="text" placeholder="descrição" v-model="todo.description">
            <button class="button" type="submit" :disabled="todo.loading">
                <span v-if="todo.loading">
                    Enviando ...
                </span>
                <span v-else>
                    Enviar
                </span>
            </button>

            <router-link class="button buttonBack" :to="{name: 'todo.index'}">Voltar</router-link>
        </form>
    </div>
</template>

<script>
    import { reactive } from 'vue'
    import TodoService from '@/services/Todos.service.js'
    import router from '@/router'
export default {
    name: 'AddTodo',
    setup() {
        const todo = reactive({
            name: '',
            description: '',
            completed: false,
            loading: false
        });

        const addTodo = () => {
            todo.loading = true
            TodoService.addTodo({...todo})
                .then(() => router.push({name: 'todo.index'}))
                .catch((error) => console.log(error))
                .finally(todo.loading = false)
        }

        return {
            todo,
            addTodo
        }
    }
}
</script>
