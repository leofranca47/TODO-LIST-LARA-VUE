<template>
    <div>
        <input type="checkbox" :checked="completed" @change="toogleStatus"/>
        {{ todo.title }} - {{ todo.body }}
        <router-link :to="{name: 'todo.edit', params: { id: todo.identify}}"><i class="fas fa-edit"></i></router-link>
        <a href="#" @click.prevent="deleteTodo"><i class="fas fa-trash-alt"></i></a>
    </div>
</template>

<script>
import {computed} from 'vue'
import TodoService from '@/services/Todos.service.js'
export default {
    name: 'MyTodo',
    props: {
        todo: {
            required : true,
            type : Object
        },
    },

    setup(props, {emit}) {
        const completed = computed(() => props.todo.completed == "S")

        const toogleStatus = () => {
            const params = {
                name: props.todo.title,
                description: props.todo.body,
                completed: !completed.value
            }

            TodoService.editTodo(props.todo.identify, params)
                .then(() => {
                    emit('toogleCompleted', props.todo, params.completed ? "S" : "N")
                })
        }

        const deleteTodo = () => {
            TodoService.deleteTodo(props.todo.identify)
                .then(() => {
                    emit('deleteTodo', props.todo)
                })
        }

        return {
            deleteTodo,
            completed,
            toogleStatus,
        }
    }
}
</script>
