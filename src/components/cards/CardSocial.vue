<template>
  <!--
    Grid note: with Quasar's breakpoints realigned to Material's
    (quasar.variables.scss), these map onto the spec's pane guidance directly --
    one column on compact, two on medium, four from expanded up.
  -->
  <div class="row q-col-gutter-md">
    <div
      v-for="item in items"
      :key="item.title"
      class="col-12 col-sm-6 col-md-3 md-stat__cell"
    >
      <q-card flat class="md-stat" :class="`md-stat--${item.tone}`">
        <q-card-section class="md-stat__body">
          <div class="row items-center no-wrap q-gutter-sm">
            <div class="md-stat__icon">
              <q-icon :name="item.icon" size="20px" />
            </div>
            <div class="col md-label-large md-stat__label">{{ item.title }}</div>

            <!--
              Direction is carried by the arrow and the sign, not by colour.
              A red/green delta would be unreadable to a colour-blind reader and
              would also fight the four container tones these tiles sit on.
            -->
            <div class="md-stat__delta md-label-medium md-label-medium--emphasized">
              <q-icon :name="item.up ? 'trending_up' : 'trending_down'" size="16px" />
              {{ item.delta }}
            </div>
          </div>

          <div class="md-stat__value md-display-small md-display-small--emphasized">
            {{ item.value }}
          </div>

          <div class="md-body-small md-stat__note">{{ item.note }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

/*
 * `tone` names an M3 container role rather than a colour.
 *
 * These tiles used to carry two hardcoded hexes each (#5064b5/#3e51b5,
 * #bb5751/#d83e30, ...) picked for contrast against a white page, which meant
 * they could not follow a theme and turned into four glaring blocks the moment
 * the page went dark. Container roles are designed for exactly this: a filled
 * surface with a guaranteed-legible `on-` pair in both schemes.
 *
 * error-container is deliberately not in the rotation -- it is the one
 * container role that carries meaning, and a KPI tinted with it reads as a
 * failure. The fourth slot uses a neutral surface instead.
 */
const TONES = [ 'primary', 'secondary', 'tertiary', 'surface' ]

const withTones = entries => entries.map((entry, index) => ({
  ...entry,
  tone: TONES[ index % TONES.length ]
}))

/*
 * Font Awesome icons here (twitter, google, dollar-sign, chart-bar, chart-line)
 * are all already in the 21-icon subset under src/assets/fonts. Swapping one for
 * an FA icon outside that set fails the production build until
 * `npm run fonts:subset` is re-run -- see postcss.config.js.
 */
const SOCIAL = withTones([
  { title: 'My Account', icon: 'person', value: '200', delta: '+12.5%', up: true, note: 'Steady growth this month' },
  { title: 'Followers', icon: 'fab fa-twitter', value: '500', delta: '+8.2%', up: true, note: 'Up from 462 last month' },
  { title: 'Connections', icon: 'fab fa-google', value: '50', delta: '-4.0%', up: false, note: 'Down slightly this period' },
  { title: 'Website Visits', icon: 'bar_chart', value: '1,020', delta: '+22.4%', up: true, note: 'Best week so far' }
])

const REVENUE = withTones([
  { title: 'Monthly Income', icon: 'fas fa-dollar-sign', value: '$20k', delta: '+12.5%', up: true, note: 'Trending up this month' },
  { title: 'Weekly Sales', icon: 'fas fa-chart-bar', value: '20', delta: '-20%', up: false, note: 'Acquisition needs attention' },
  { title: 'New Customers', icon: 'fas fa-chart-line', value: '321', delta: '+12.5%', up: true, note: 'Strong user retention' },
  { title: 'Active Users', icon: 'person', value: '82', delta: '+4.5%', up: true, note: 'Meets growth projections' }
])

export default defineComponent({
  name: 'CardSocial',

  props: {
    /*
     * Kept as `icon_position` because Dashboard.vue and Dashboard2.vue pass it
     * by that name, and it doubles as the dataset switch (left = social,
     * right = revenue).
     */
    icon_position: {
      type: String,
      required: false,
      default: 'left'
    }
  },

  computed: {
    iconPosition () {
      return this.icon_position
    },

    items () {
      return this.iconPosition === 'left' ? SOCIAL : REVENUE
    }
  }
})
</script>

<style scoped>
.md-stat__cell {
  display: flex;
}

/*
 * Equal-height tiles via flex, NOT `height: 100%`.
 *
 * A percentage height on a block card inside a stretched flex column is
 * circular -- the column's height depends on its content, and the content's
 * height depends on the column. Chrome resolves it by letting the card
 * overflow its column upward by the gutter amount, which pushed the whole row
 * 16px out of alignment and made the gap below this section 32px where every
 * other section had 16.
 */
.md-stat {
  flex: 1;
  border-radius: var(--md-sys-shape-corner-extra-large);
}

.md-stat__body { padding: var(--md-sys-space-250); }

/*
 * Optical roundness: the holder sits inside a 28px corner with 20px of
 * padding, so its own radius is 28 - 20 = 8. Matching the outer radius would
 * make the nested corners look unbalanced.
 */
.md-stat__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: var(--md-sys-shape-corner-small);
  background: color-mix(in srgb, currentColor 14%, transparent);
}

.md-stat__label { min-width: 0; }

.md-stat__delta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex: none;
  padding: 2px var(--md-sys-space-100);
  border-radius: var(--md-sys-shape-corner-full);
  border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
}

.md-stat__value { margin-block-start: var(--md-sys-space-150); }

/* Supporting line is the same role at reduced strength, not a second colour --
   these tiles sit on four different container tones. */
.md-stat__note {
  margin-block-start: var(--md-sys-space-50);
  opacity: 0.74;
}

.md-stat--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-stat--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-stat--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-stat--surface {
  background: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface);
}
</style>
