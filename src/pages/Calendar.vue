<template>
  <q-page class="q-pa-sm bg-white">
    <q-calendar
      v-model="selectedDate"
      view="month"
      locale="en-us"
      :day-height="100"
    >
      <template #week="{ week, weekdays, miniMode }">
        <template>
          <template v-for="(computedEvent, index) in getWeekEvents(week, weekdays)">
            <q-badge
              :key="index"
              class="q-row-event"
              :class="badgeClasses(computedEvent, 'day')"
              :style="badgeStyles(computedEvent, 'day', week.length)"
            >
              <template v-if="computedEvent.event">
                <q-icon :name="computedEvent.event.icon" class="q-mr-xs"></q-icon>
                <span class="ellipsis">{{ computedEvent.event.title }}</span>
              </template>
            </q-badge>
          </template>
        </template>
      </template>
    </q-calendar>
  </q-page>
</template>

<script>// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'

const CURRENT_DAY = new Date()

function getCurrentDay(day) {
    const newDay = new Date(CURRENT_DAY)
    newDay.setDate(day)
    const tm = QCalendar.parseDate(newDay)
    return tm.date
}

export default {
    name: 'Calendar',
    data() {
        return {
            selectedDate: '',
            events: [
                {
                    title: '1st of the Month',
                    color: 'orange',
                    start: getCurrentDay(1),
                    end: getCurrentDay(1)
                },
                {
                    title: 'Sisters Birthday',
                    color: 'green',
                    start: getCurrentDay(4),
                    end: getCurrentDay(4),
                    icon: 'cake'
                },
                {
                    title: 'Meeting',
                    color: 'red',
                    start: getCurrentDay(8),
                    end: getCurrentDay(8),
                    icon: 'group'
                },
                {
                    title: 'Lunch',
                    color: 'teal',
                    start: getCurrentDay(8),
                    end: getCurrentDay(8),
                    icon: 'free_breakfast'
                },
                {
                    title: 'Visit Mom',
                    color: 'blue-grey',
                    start: getCurrentDay(20),
                    end: getCurrentDay(20),
                    icon: 'card_giftcard'
                },
                {
                    title: 'Conference',
                    color: 'blue',
                    start: getCurrentDay(22),
                    end: getCurrentDay(22),
                    icon: 'ondemand_video'
                },
                {
                    title: 'Girlfriend',
                    color: 'teal',
                    start: getCurrentDay(22),
                    end: getCurrentDay(22),
                    icon: 'fastfood'
                },
                {
                    title: 'Rowing',
                    color: 'purple',
                    start: getCurrentDay(27),
                    end: getCurrentDay(28),
                    icon: 'rowing'
                },
                {
                    title: 'Vacation',
                    color: 'purple',
                    start: getCurrentDay(22),
                    end: getCurrentDay(29),
                    icon: 'flight'
                }
            ]
        }
    },
    methods: {
        isCssColor(color) {
            return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
        },

        badgeClasses(infoEvent, type) {
            const color = infoEvent.event !== void 0 ? infoEvent.event.color : 'transparent'
            const cssColor = this.isCssColor(color)
            const isHeader = type === 'header'

            return {
                [`text-white bg-${color}`]: !cssColor,
                'full-width': !isHeader && (!infoEvent.side || infoEvent.side === 'full'),
                'left-side': !isHeader && infoEvent.side === 'left',
                'right-side': !isHeader && infoEvent.side === 'right',
                'cursor-pointer': infoEvent.event !== void 0,
                'event-void': infoEvent.event === void 0 // height: 0, padding: 0
            }
        },

        badgeStyles(infoEvent, type, weekLength, timeStartPos, timeDurationHeight) {
            const s = {}
            if (timeStartPos) {
                s.top = timeStartPos(infoEvent.event.time) + 'px'
            }
            if (timeDurationHeight) {
                s.height = timeDurationHeight(infoEvent.event.duration) + 'px'
            }
            if (infoEvent.size !== void 0) {
                s.width = ((100 / weekLength) * infoEvent.size) + '% !important'
            }
            // s['align-items'] = 'flex-start'
            return s
        },

        getWeekEvents(week, weekdays) {
            const tsFirstDay = QCalendar.parsed(week[0].date + ' 00:00')
            const tsLastDay = QCalendar.parsed(week[week.length - 1].date + ' 23:59')
            const firstDay = QCalendar.getDayIdentifier(tsFirstDay)
            const lastDay = QCalendar.getDayIdentifier(tsLastDay)

            const eventsWeek = []
            this.events.forEach((event, id) => {
                const tsStartDate = QCalendar.parsed(event.start + ' 00:00')
                const tsEndDate = QCalendar.parsed(event.end + ' 23:59')
                const startDate = QCalendar.getDayIdentifier(tsStartDate)
                const endDate = QCalendar.getDayIdentifier(tsEndDate)

                if (this.isBetweenDatesWeek(startDate, endDate, firstDay, lastDay)) {
                    const left = QCalendar.daysBetween(tsFirstDay, tsStartDate, true)
                    const right = QCalendar.daysBetween(tsEndDate, tsLastDay, true)

                    eventsWeek.push({
                        id, // index event
                        left, // Position initial day [0-6]
                        right, // Number days available
                        size: week.length - (left + right), // Size current event (in days)
                        event // Info
                    })
                }
            })

            const events = []
            if (eventsWeek.length > 0) {
                const infoWeek = eventsWeek.sort((a, b) => a.left - b.left)
                infoWeek.forEach((event, i) => {
                    this.insertEvent(events, week.length, infoWeek, i, 0, 0)
                })
            }

            return events
        },

        insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
            const iEvent = infoWeek[index]
            if (iEvent !== void 0 && iEvent.left >= availableDays) {
                // If you have space available, more events are placed
                if (iEvent.left - availableDays) {
                    // It is filled with empty events
                    events.push({size: iEvent.left - availableDays})
                }
                // The event is built
                events.push({size: iEvent.size, event: iEvent.event})

                if (level !== 0) {
                    // If it goes into recursion, then the item is deleted
                    infoWeek.splice(index, 1)
                }

                const currentAvailableDays = iEvent.left + iEvent.size

                if (currentAvailableDays < weekLength) {
                    const indexNextEvent = QCalendar.indexOf(infoWeek, e => e.id !== iEvent.id && e.left >= currentAvailableDays)

                    this.insertEvent(
                        events,
                        weekLength,
                        infoWeek,
                        indexNextEvent !== -1 ? indexNextEvent : index,
                        currentAvailableDays,
                        level + 1
                    )
                } // else: There are no more days available, end of iteration
            } else {
                events.push({size: weekLength - availableDays})
                // end of iteration
            }
        },

        isBetweenDates(date, start, end) {
            return date >= start && date <= end
        },

        isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
            return (
                (dateEnd < weekEnd && dateEnd >= weekStart) ||
                dateEnd === weekEnd ||
                (dateEnd > weekEnd && dateStart <= weekEnd)
            )
        }
    }
}
</script>

<style scoped>

</style>
