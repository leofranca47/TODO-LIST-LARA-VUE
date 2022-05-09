<template>
    <div>
        <h1>Editar uma tarefa</h1>
        <form action='#' method="post" @submit.prevent="editTodo">
            <input type="text" placeholder="nome" v-model="todo.name">
            <input type="text" placeholder="descrição" v-model="todo.description">
            <button  class="button"  type="submit" :disabled="todo.loading">
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
    import { reactive, onMounted } from 'vue'
    import TodoService from '@/services/Todos.service.js'
    import router from '@/router'
export default {
    name: 'EditTodo',
    props: {
        id: {
            require: true
        }
    },

    setup(props) {
        const todo = reactive({
            name: '',
            description: '',
            completed: false,
            loading: false
        });

        onMounted(async () => {
            TodoService.getTodo(props.id)
                .then((response) => {
                    response = response.data.data
                    todo.name = response.title
                    todo.description = response.body
                    todo.completed = response.completed == "S"
                })
        });

        const editTodo = () => {
            todo.loading = true
            TodoService.editTodo(props.id, {...todo})
                .then(() => {
                    router.push({name: 'todo.index'})
                })
                .catch((error) => console.log(error))
                .finally(todo.loading = false)
        }

        return {
            todo,
            editTodo
        }
    }
}
</script>
