<template>
  <span>
    <q-list class="md-todo">
      <q-item v-for="todo in todos" :key="todo.id">
        <q-item-section avatar>
          <q-checkbox
            :id="todo.id"
            v-model="todo.completed"
            color="primary"
            :aria-label="`Mark &quot;${todo.todo}&quot; as complete`"
          />
        </q-item-section>
        <!-- Completion is a class rather than an inline style so the strike is
             themeable and survives a dark-mode repaint. -->
        <q-item-section class="md-body-large text-wrap"
                        :class="{ 'md-todo__item--done': todo.completed }">

          <q-item-label>{{ todo.todo }}</q-item-label>
          <q-item-label caption>{{ todo.todo_desc }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="chat" round flat :aria-label="`Comment on &quot;${todo.todo}&quot;`"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </span>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

const todos = ref([
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
])
export default defineComponent({
  name: "Todo",
  setup() {
    return {
      todos
    }
  }
})
</script>

<style scoped>
/*
 * Was bg-white / text-black, which only worked on a light page. The list is a
 * neutral surface nested inside TodoList.vue's primary-container panel; the
 * tone difference is what separates them, so no border is needed.
 *
 * Optical roundness: the panel's corner is 28 and the card section pads it by
 * 16, so this one is 28 - 16 = 12 (medium). Matching 28 would look unbalanced.
 */
.md-todo {
  background: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-medium);
  overflow: hidden;
}

/* Quasar's item captions already resolve to currentColor at 54%, so the
   description follows the surface role without an explicit colour. */
.md-todo__item--done {
  text-decoration: line-through;
  color: var(--md-sys-color-on-surface-variant);
}
</style>
