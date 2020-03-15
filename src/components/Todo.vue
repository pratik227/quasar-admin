<template>
  <span>
    <q-list bordered class="bg-white text-black">
      <q-item v-for="todo in todos" :key="todo.id">
        <q-item-section avatar>
          <q-checkbox
            :id="todo.id"
            v-model="todo.completed"
            color="primary"
          />
        </q-item-section>
        <q-item-section class="text-body1 text-wrap"
                        :style="todo.completed?{'textDecoration':'line-through'}:{}">

          <q-item-label>{{ todo.todo}}</q-item-label>
          <q-item-label caption class="text-grey-8">{{ todo.todo_desc}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="chat" round flat></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </span>
</template>

<script>
    export default {
        name: "Todo",
        data() {
            return {
                todos: [
                    {
                        id: 1,
                        completed: false,
                        todo: 'Task Item 1',
                        todo_desc: 'Task Item 1 Desc'
                    },
                    {
                        id: 2,
                        completed: false,
                        todo: 'Task Item 2',
                        todo_desc: 'Task Item 2 Desc'
                    },
                    {
                        id: 3,
                        completed: false,
                        todo: 'Task Item 3',
                        todo_desc: 'Task Item 3 Desc'
                    },
                    {
                        id: 4,
                        completed: false,
                        todo: 'Task Item 4',
                        todo_desc: 'Task Item 4 Desc'
                    },
                    {
                        id: 5,
                        completed: false,
                        todo: 'Task Item 5',
                        todo_desc: 'Task Item 5 Desc'
                    },
                    {
                        id: 6,
                        completed: false,
                        todo: 'Task Item 6',
                        todo_desc: 'Task Item 6 Desc'
                    },
                    {
                        id: 7,
                        completed: false,
                        todo: 'Task Item 7',
                        todo_desc: 'Task Item 7 Desc'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
