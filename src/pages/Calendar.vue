<template>
  <q-page class="md-page">
    <q-calendar-month
      ref="calendar"
      v-model="selectedDate"
      animated
      bordered
      focusable
      hoverable
      no-active-date
      :day-min-height="140"
      :day-height="10"
      @change="onChange"
      @moved="onMoved"
      @click-date="onClickDate"
      @click-day="onClickDay"
      @click-workweek="onClickWorkweek"
      @click-head-workweek="onClickHeadWorkweek"
      @click-head-day="onClickHeadDay"
    >
      <template #day="{ scope: { timestamp } }">
        <template
          v-for="event in eventsMap[timestamp.date]"
          :key="event.id"
        >
          <div
            :class="badgeClasses(event, 'day')"
            :style="badgeStyles(event, 'day')"
            class="my-event"
          >
            <abbr
              :title="event.details"
              class="tooltip"
            >
              <span class="title q-calendar__ellipsis">{{ event.title + (event.time ? ' - ' + event.time : '') }}</span>
            </abbr>
          </div>
        </template>
      </template>
    </q-calendar-month>
  </q-page>
</template>

<script>import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import {
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@/utils/calendar-dates.js'
import '@quasar/quasar-ui-qcalendar/QCalendarVariables.css'
import '@quasar/quasar-ui-qcalendar/QCalendarTransitions.css'
import '@quasar/quasar-ui-qcalendar/QCalendarMonth.css'
import {defineComponent} from 'vue'
// The function below is used to set up our demo data
const CURRENT_DAY = new Date()

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export default defineComponent({
  name: 'Calendar',
  components: {
    QCalendarMonth
  },
  data() {
    return {
      selectedDate: today(),
      events: [
        {
          id: 1,
          title: '1st of the Month',
          details: 'Everything is funny as long as it is happening to someone else',
          date: getCurrentDay(1),
          bgcolor: 'tertiary'
        },
        {
          id: 2,
          title: 'Sisters Birthday',
          details: 'Buy a nice present',
          date: getCurrentDay(4),
          bgcolor: 'secondary',
          icon: 'fas fa-birthday-cake'
        },
        {
          id: 3,
          title: 'Meeting',
          details: 'Time to pitch my idea to the company',
          date: getCurrentDay(10),
          time: '10:00',
          duration: 120,
          bgcolor: 'primary',
          icon: 'fas fa-handshake'
        },
        {
          id: 4,
          title: 'Lunch',
          details: 'Company is paying!',
          date: getCurrentDay(10),
          time: '11:30',
          duration: 90,
          bgcolor: 'secondary',
          icon: 'fas fa-hamburger'
        },
        {
          id: 5,
          title: 'Visit mom',
          details: 'Always a nice chat with mom',
          date: getCurrentDay(20),
          time: '17:00',
          duration: 90,
          bgcolor: 'surface',
          icon: 'fas fa-car'
        },
        {
          id: 6,
          title: 'Conference',
          details: 'Teaching Javascript 101',
          date: getCurrentDay(22),
          time: '08:00',
          duration: 540,
          bgcolor: 'primary',
          icon: 'fas fa-chalkboard-teacher'
        },
        {
          id: 7,
          title: 'Girlfriend',
          details: 'Meet GF for dinner at Swanky Restaurant',
          date: getCurrentDay(22),
          time: '19:00',
          duration: 180,
          bgcolor: 'secondary',
          icon: 'fas fa-utensils'
        },
        {
          id: 8,
          title: 'Rowing',
          details: 'Stay in shape!',
          date: getCurrentDay(27),
          bgcolor: 'tertiary',
          icon: 'rowing',
          days: 2
        },
        {
          id: 9,
          title: 'Fishing',
          details: 'Time for some weekend R&R',
          date: getCurrentDay(27),
          bgcolor: 'tertiary',
          icon: 'fas fa-fish',
          days: 2
        },
        {
          id: 10,
          title: 'Vacation',
          details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
          date: getCurrentDay(29),
          bgcolor: 'tertiary',
          icon: 'fas fa-plane',
          days: 5
        }
      ]
    }
  },
  computed: {
    eventsMap() {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[event.date] = (map[event.date] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, {day: 1})
              if (!map[timestamp.date]) {
                map[timestamp.date] = []
              }
              map[timestamp.date].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log(map)
      return map
    }
  },
  methods: {
    /*
     * `bgcolor` now names an M3 container role rather than a crayon colour.
     * The old form emitted `text-white bg-red`, which relied on hardcoded
     * hues that could not follow the theme and went unreadable the moment the
     * calendar was viewed in dark mode. A container role always carries its
     * `on-` pair, so the badge is legible in both schemes.
     */
    badgeClasses(event, type) {
      return {
        [`md-event--${event.bgcolor}`]: true
      }
    },
    badgeStyles(day, event) {
      const s = {}
      // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
      // s.top = 0
      // s.bottom = 0
      // s.width = (event.days * this.parsedCellWidth) + '%'
      return s
    },
    onToday() {
      this.$refs.calendar.moveToToday()
    },
    onPrev() {
      this.$refs.calendar.prev()
    },
    onNext() {
      this.$refs.calendar.next()
    },
    onMoved(data) {
      console.log('onMoved', data)
    },
    onChange(data) {
      console.log('onChange', data)
    },
    onClickDate(data) {
      console.log('onClickDate', data)
    },
    onClickDay(data) {
      console.log('onClickDay', data)
    },
    onClickWorkweek(data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek(data) {
      console.log('onClickHeadWorkweek', data)
    }
  }
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

.my-event {
  position: relative;
  width: 100%;
  margin: 1px 0 0 0;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  /* label-small: the smallest step in the scale, which is what a day cell can
     actually hold. Replaces a bare `font-size: 12px`. */
  font: 500 11px/16px var(--md-sys-typescale-plain-font);
  letter-spacing: 0.5px;
  /* extra-small, not the cell's own radius -- nested containers must not share
     one (optical roundness). */
  border-radius: var(--md-sys-shape-corner-extra-small);
  padding-inline: var(--md-sys-space-50);
}

/*
 * Four tones cycled across the event list. error-container is deliberately
 * absent: it carries meaning in this system, and a birthday tinted with it
 * would read as a problem.
 */
.md-event--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-event--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-event--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-event--surface {
  background: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface);
}

.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

abbr.tooltip {
  text-decoration: none
}
</style>
