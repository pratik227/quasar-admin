<template>
  <q-page class="md-page">
    <!--
      Four columns of a kanban board. They were `col-3` unconditionally, which
      meant four 90px columns on a phone; they now step 1 -> 2 -> 4 and only
      reach four abreast from expanded (840px) up.
    -->
    <div
      class="row q-col-gutter-md"
      group="columns"
    >
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="md-column md-column--planned">
          <q-item class="md-column__header q-pa-sm">
            <q-item-section class="md-title-medium md-title-medium--emphasized">PLANNED TASKS</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list class="md-menu-list">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="planned_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in planned_task"
                v-bind:key="index"
                flat
                class="md-task q-my-sm"
                @mouseover="$set(task_selected_index,'planned',index)"
                @mouseleave="task_selected_index.planned = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="md-title-medium md-title-medium--emphasized q-ml-sm">{{ item.title }}</span>
                    <span class="float-right md-body-small md-supporting q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="md-task__close text-negative"
                      v-if="index==task_selected_index.planned"
                      @click="deleteTask('panned', task_selected_index.planned)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <!--
                    The tag name already says what the tag means, so the chip
                    only has to stay legible: each status maps onto a container
                    role and its on- pair instead of a flat brand colour with
                    `text-color="white"`, which the dark scheme cannot carry.
                  -->
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index"
                          :class="`md-tag md-tag--${tag.color}`">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm md-body-medium md-supporting">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card flat class="md-task full-width" v-if="add_model.planned">
              <q-card-section>
                <div class="md-title-medium md-title-medium--emphasized">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.planned.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.planned.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.planned.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm">
                <q-btn label="Add" unelevated class="text-capitalize md-filled-button"></q-btn>
                <q-btn label="Cancel" flat color="primary" class="text-capitalize" @click="add_model.planned=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.planned=true"/>
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="md-column md-column--wip">
          <q-item class="md-column__header q-pa-sm">
            <q-item-section class="md-title-medium md-title-medium--emphasized">WORK IN PROGRESS</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list class="md-menu-list">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="wip_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in wip_task"
                v-bind:key="index"
                flat
                class="md-task q-my-sm"
                @mouseover="task_selected_index.wip = index"
                @mouseleave="task_selected_index.wip = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="md-title-medium md-title-medium--emphasized q-ml-sm">{{ item.title }}</span>
                    <span class="float-right md-body-small md-supporting q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="md-task__close text-negative"
                      v-if="index==task_selected_index.wip"
                      @click="deleteTask('wip', task_selected_index.wip)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <!--
                    The tag name already says what the tag means, so the chip
                    only has to stay legible: each status maps onto a container
                    role and its on- pair instead of a flat brand colour with
                    `text-color="white"`, which the dark scheme cannot carry.
                  -->
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index"
                          :class="`md-tag md-tag--${tag.color}`">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm md-body-medium md-supporting">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card flat class="md-task full-width" v-if="add_model.wip">
              <q-card-section>
                <div class="md-title-medium md-title-medium--emphasized">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.wip.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.wip.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.wip.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm">
                <q-btn label="Add" unelevated class="text-capitalize md-filled-button"></q-btn>
                <q-btn label="Cancel" flat color="primary" class="text-capitalize" @click="add_model.wip=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.wip=true"/>
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="md-column md-column--blocked">
          <q-item class="md-column__header q-pa-sm">
            <q-item-section class="md-title-medium md-title-medium--emphasized">BLOCKED</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list class="md-menu-list">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="blocked_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in blocked_task"
                v-bind:key="index"
                flat
                class="md-task q-my-sm"
                @mouseover="task_selected_index.blocked = index"
                @mouseleave="task_selected_index.blocked  = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="md-title-medium md-title-medium--emphasized q-ml-sm">{{ item.title }}</span>
                    <span class="float-right md-body-small md-supporting q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="md-task__close text-negative"
                      v-if="index==task_selected_index.blocked"
                      @click="deleteTask('blocked', task_selected_index.blocked)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <!--
                    The tag name already says what the tag means, so the chip
                    only has to stay legible: each status maps onto a container
                    role and its on- pair instead of a flat brand colour with
                    `text-color="white"`, which the dark scheme cannot carry.
                  -->
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index"
                          :class="`md-tag md-tag--${tag.color}`">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm md-body-medium md-supporting">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card flat class="md-task full-width" v-if="add_model.blocked">
              <q-card-section>
                <div class="md-title-medium md-title-medium--emphasized">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.blocked.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.blocked.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.blocked.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm">
                <q-btn label="Add" unelevated class="text-capitalize md-filled-button"></q-btn>
                <q-btn label="Cancel" flat color="primary" class="text-capitalize" @click="add_model.blocked=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.blocked=true"/>
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="md-column md-column--completed">
          <q-item class="md-column__header q-pa-sm">
            <q-item-section class="md-title-medium md-title-medium--emphasized">COMPLETED</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list class="md-menu-list">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="completed_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in completed_task"
                v-bind:key="index"
                flat
                class="md-task q-my-sm"
                @mouseover="task_selected_index.completed = index"
                @mouseleave="task_selected_index.completed = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="md-title-medium md-title-medium--emphasized q-ml-sm">{{ item.title }}</span>
                    <span class="float-right md-body-small md-supporting q-mt-sm">{{ item.label }}
                    <q-icon
                      filled
                      size="xs"
                      name="close"
                      class="md-task__close text-negative"
                      v-if="index==task_selected_index.completed"
                      @click="deleteTask('completed', task_selected_index.completed)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <!--
                    The tag name already says what the tag means, so the chip
                    only has to stay legible: each status maps onto a container
                    role and its on- pair instead of a flat brand colour with
                    `text-color="white"`, which the dark scheme cannot carry.
                  -->
                  <q-chip dense v-for="(tag, index) in item.tags" :key="index"
                          :class="`md-tag md-tag--${tag.color}`">
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm md-body-medium md-supporting">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card flat class="md-task full-width" v-if="add_model.completed">
              <q-card-section>
                <div class="md-title-medium md-title-medium--emphasized">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="add_data.completed.title" label="Title" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.completed.label" label="Label" outlined/>
                <q-input dense class="q-mt-sm" v-model="add_data.completed.description" label="Description" outlined/>
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm">
                <q-btn label="Add" unelevated class="text-capitalize md-filled-button"></q-btn>
                <q-btn label="Cancel" flat color="primary" class="text-capitalize" @click="add_model.completed=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="add_model.completed=true"/>
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>

    </div>
    <q-resize-observer @resize="onResize"/>
  </q-page>
</template>

<script>
import Vue from "vue";
import draggable from "vuedraggable";
import {ref} from 'vue'

import {defineComponent} from 'vue'


let planned_task = [
  {
    title: 'Buy milk',
    label: '15 mins',
    tags: [{name: 'Error', color: 'negative'}, {name: 'Warning', color: 'warning'}],
    description: '2 Gallons of milk at the Deli store'
  },
  {
    title: 'Dispose Garbage',
    label: '10 mins',
    tags: [{name: 'Info', color: 'info'}, {name: 'Success', color: 'positive'}],
    description: 'Sort out recyclable and waste as needed'
  },
  {
    title: 'Write Blog',
    label: '10 mins',
    tags: [{name: 'Warning', color: 'warning'}],
    description: 'Can AI make memes?'
  },
  {
    title: 'Pay Rent',
    label: '5 mins',
    tags: [{name: 'Error', color: 'negative'}, {name: 'Warning', color: 'warning'}, {
      name: 'Info',
      color: 'info'
    }],
    description: 'Transfer to bank account'
  }
];
let wip_task = [
  {
    title: 'Clean House',
    label: '30 mins',
    tags: [{name: 'Error', color: 'negative'}, {name: 'Success', color: 'positive'}],
    description: 'Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses'
  },
  {
    title: 'Go Trekking',
    label: '30 mins',
    tags: [{name: 'Info', color: 'info'}, {name: 'Success', color: 'positive'}, {
      name: 'Info',
      color: 'info'
    }, {name: 'Success', color: 'positive'}, {name: 'Info', color: 'info'}, {
      name: 'Success',
      color: 'positive'
    }],
    description: 'Completed 10km on cycle'
  },
];
let blocked_task = [
  {
    title: 'Morning Jog',
    label: '30 mins',
    tags: [{name: 'Error', color: 'negative'}],
    description: 'Track using fitbit'
  },
];
let completed_task = [
  {
    title: 'Practice Meditation',
    label: '15 mins',
    tags: [],
    description: 'Use Headspace app'
  },
  {
    title: 'Maintain Daily Journal',
    label: '15 mins',
    tags: [],
    description: 'Use Spreadsheet for now'
  },
  {
    title: 'Go Trekking',
    label: '15 mins',
    tags: [{name: 'Info', color: 'info'}, {name: 'Success', color: 'positive'}],
    description: 'Completed 10km on cycle'
  },
];

export default defineComponent({
  name: "TaskBoard",
  component:{
    draggable
  },
  setup() {
    const size = ref({width: '200px', height: '200px'});


    return {
      task_selected_index: {
        blocked: ref(null),
        completed: ref(null),
        planned: ref(null),
        wip: ref(null)
      },
      /*
       * QScrollArea takes these as plain style objects, so they are the one
       * place on this page a colour cannot be a class. A var() in an inline
       * style still resolves against the element, which is under <body>, so
       * the scrollbar follows the dark toggle like everything else.
       *
       * The values were previously wrapped in ref() inside a plain object.
       * setup() only unwraps refs at the top level, so each one reached the DOM
       * as "[object Object]" and the styling never applied at all.
       */
      thumbStyle: {
        right: '4px',
        borderRadius: 'var(--md-sys-shape-corner-extra-small)',
        backgroundColor: 'var(--md-sys-color-primary)',
        width: '5px',
        opacity: 0.75
      },
      add_model: {
        blocked: ref(false),
        completed: ref(false),
        planned: ref(false),
        wip: ref(false)
      },
      add_data: {
        blocked: ref({}),
        completed: ref({}),
        planned: ref({}),
        wip: ref({})
      },
      size,
      barStyle: {
        right: '2px',
        borderRadius: 'var(--md-sys-shape-corner-small)',
        backgroundColor: 'var(--md-sys-color-outline-variant)',
        width: '9px',
        opacity: 0.4
      },
      planned_task,
      wip_task,
      blocked_task,
      completed_task,

      deleteTask(name, index) {
        if (name == 'panned') {
          this.planned_task.splice(index, 1)
        }
        if (name == 'wip') {
          this.wip_task.splice(index, 1)
        }
        if (name == 'completed') {
          this.completed_task.splice(index, 1)
        }
        if (name == 'blocked') {
          this.blocked_task.splice(index, 1)
        }
      },

      onResize(size_dynamic) {
        size.value = size_dynamic;
      },
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    getHeight() {
      return this.size.height - 90 + 'px'
    }
  }
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

/*
 * The four columns were `custom_bg` / `custom_bg2`, two hardcoded gradients
 * (#a18cd1 -> #fbc2eb and #4facfe -> #00f2fe) with `.text-color { color: white }`
 * on top. They neither followed the theme nor distinguished the columns from
 * one another -- two of them shared a gradient. Each column is now a container
 * role with its own on- pair, which both tells them apart and survives the
 * dark toggle.
 *
 * error-container is deliberately not used for BLOCKED: it is the one
 * container role that carries meaning in this system, and it is already spoken
 * for by the "Error" tag below.
 */
.md-column {
  border-radius: var(--md-sys-shape-corner-large);
  padding: var(--md-sys-space-50);
}

.md-column--planned {
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
}

.md-column--wip {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-column--blocked {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-column--completed {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

/* Was an inline `style="cursor: move"` on all four headers. */
.md-column__header {
  cursor: move;
  border-radius: var(--md-sys-shape-corner-medium);
}

/*
 * Optical roundness: the card sits inside a 16px column corner with 4px of
 * padding, so 16 - 4 = 12. It steps to the lowest surface tone so it reads as
 * lifted off whichever container role its column carries.
 */
.md-task {
  background: var(--md-sys-color-surface-container-lowest);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-medium);
}

/* Was `absolute-top-right q-mr-md q-mt-xs`; logical properties so the dismiss
   affordance stays in the trailing corner under RTL. */
.md-task__close {
  position: absolute;
  inset-block-start: var(--md-sys-space-50);
  inset-inline-end: var(--md-sys-space-200);
  cursor: pointer;
}

.md-supporting { color: var(--md-sys-color-on-surface-variant); }

/* Was an inline `min-width: 100px` on each of the four overflow menus. */
.md-menu-list { min-inline-size: 100px; }

/*
 * Status tags. M3 has no success/info/warning roles, and `text-color="white"`
 * on Quasar's positive/info/warning went unreadable the moment those colours
 * were lightened for dark mode. The chip label already carries the meaning, so
 * each status takes a container role purely to stay legible -- with the single
 * exception of "Error", which genuinely is the case error-container exists for.
 */
.md-tag {
  border-radius: var(--md-sys-shape-corner-small);
}

.md-tag--negative {
  background: var(--md-sys-color-error-container);
  color: var(--md-sys-color-on-error-container);
}

.md-tag--warning {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-tag--info {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-tag--positive {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

/* Quasar pairs a filled `color` with a hardcoded `text-white`, unreadable on
   the dark-scheme primary. */
</style>
