<template>
  <q-layout view="lHh Lpr lFf">

    <!-- M3 app bar: a surface, not a filled primary block. Elevation comes from
         surface tone, so it is flat and only gains a hairline on scroll. -->
    <q-header class="md-appbar" bordered>
      <q-toolbar class="md-appbar__toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="menuLabel"
          :aria-expanded="String(navigationVisible)"
          @click="toggleNavigation"
        />

        <!-- Title lives in the drawer's brand block now; repeating it here
             put the same words on screen twice. -->
        <q-space />

        <div class="row items-center no-wrap q-gutter-xs">
          <md-theme-picker />

          <q-btn
            round
            dense
            flat
            :icon="isDark ? 'light_mode' : 'dark_mode'"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            @click="toggle"
          />

          <q-btn
            v-if="$q.screen.gt.xs"
            round
            dense
            flat
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            :aria-label="$q.fullscreen.isActive ? 'Exit full screen' : 'Enter full screen'"
            @click="$q.fullscreen.toggle()"
          />

          <q-btn
            round
            dense
            flat
            icon="fab fa-github"
            type="a"
            href="https://github.com/pratik227/quasar-admin"
            target="_blank"
            rel="noopener"
            aria-label="View this project on GitHub"
          />

          <q-btn
            round
            dense
            flat
            type="a"
            href="https://github.com/sponsors/pratik227"
            target="_blank"
            rel="noopener"
            aria-label="Sponsor this project on GitHub"
            class="md-appbar__sponsor"
          >
            <i class="fa fa-heart fa-2x fa-beat" aria-hidden="true"></i>
          </q-btn>

          <!-- The badge is visible text inside the button, so the accessible
               name has to contain it (axe: label-content-name-mismatch). -->
          <q-btn round dense flat icon="notifications" aria-label="Notifications, 5 unread">
            <q-badge class="md-badge" floating>5</q-badge>
            <q-menu>
              <!-- role="presentation": holds clickable QItems (role="button")
                   and a QCard, neither of which ARIA allows as list children. -->
              <q-list style="min-width: 100px" role="presentation">
                <messages />
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" flat dense no-caps class="text-primary" />
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat dense aria-label="Account">
            <q-avatar size="28px">
              <img width="28" height="28" src="/img/boy-avatar.jpg" alt="">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!--
      One drawer serves all three of Material's navigation forms:

        compact            behavior="mobile"  -> modal expanded rail over a scrim
        medium..large      96px collapsed rail, toggling to 280px expanded
        extra-large        280px expanded rail, open by default

      Quasar's `behavior` prop is what switches between overlay and inline, and
      QLayout handles offsetting the page container either way -- which is the
      reason the rail is a QDrawer rather than a hand-placed aside.
    -->
    <q-drawer
      v-model="navigationVisible"
      :behavior="isCompact ? 'mobile' : 'desktop'"
      :width="railWidth"
      show-if-above
      bordered
      class="md-rail-drawer"
    >
      <!--
        Brand block.

        The drawer is full height (view string "lHh"), so it starts at the top
        of the WINDOW, above the 64px app bar -- the first destination sat
        against the window edge with nothing above it, and no amount of list
        padding fixes that. Every sidebar in the shadcn references opens with a
        brand row for exactly this reason: it gives the navigation something to
        start under.
      -->
      <div class="md-brand" :class="`md-brand--${railMode}`">
        <div class="md-brand__mark">
          <q-icon name="dashboard" size="22px" />
        </div>
        <div v-if="railMode === 'expanded'" class="md-brand__text">
          <div class="md-title-small md-title-small--emphasized">Quasar Admin</div>
          <div class="md-label-medium md-brand__sub">Free template</div>
        </div>
      </div>

      <q-separator class="md-brand__rule" />

      <q-scroll-area class="md-drawer__scroll">
        <md-navigation-rail :mode="railMode" @navigate="onNavigate" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="md-footer">
      <!-- Sponsorship banner. Hidden on compact, where the bottom navigation
           bar owns the footer region and the screen has no room to spare. -->
      <q-banner
        v-if="!isCompact"
        class="md-promo"
        role="status"
        dense
        inline-actions
      >
        <template #avatar>
          <div class="md-promo__avatar row items-center justify-center">
            <q-icon name="shopping_cart" size="20px" />
          </div>
        </template>

        <div class="md-promo__text">
          <div class="md-title-small">
            Quasar Prime: Vue.js Admin Template &ndash; Powerfully Elegant, Ultimate Dashboard Solution! 🚀
          </div>
          <div class="md-body-small q-mt-xs">
            Join 81+ satisfied clients and get exclusive access for only <strong>$249</strong> (launch price)!
          </div>
        </div>

        <template #action>
          <!--
            href, not :to. This is an external site; `:to` hands the URL to Vue
            Router, which resolves it as an in-app path and lands on the 404
            route instead of leaving the site.
          -->
          <q-btn
            unelevated
            no-caps
            class="md-promo__cta"
            type="a"
            :href="link"
            target="_blank"
            rel="noopener"
            label="Check it out"
          />
        </template>
      </q-banner>

      <md-navigation-bar
        v-if="isCompact"
        @more="navigationVisible = true"
        @navigate="onNavigate"
      />
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'

import Messages from './Messages.vue'
import MdNavigationRail from '@/components/navigation/MdNavigationRail.vue'
import MdNavigationBar from '@/components/navigation/MdNavigationBar.vue'
import MdThemePicker from '@/components/MdThemePicker.vue'
import { useBreakpoint } from '@/composables/useBreakpoint.js'
import { useDarkMode } from '@/composables/useDarkMode.js'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Messages,
    MdNavigationRail,
    MdNavigationBar,
    MdThemePicker
  },

  setup () {
    const { isCompact, breakpoint } = useBreakpoint()
    const { isDark, toggle } = useDarkMode()

    const navigationVisible = ref(false)

    /*
     * The expanded rail is the default from the `expanded` breakpoint (840dp)
     * up: labels beat icon-guessing, and Material allows either form there --
     * it only *requires* the expanded rail at extra-large.
     *
     * Medium (600-839dp) stays collapsed on purpose. A 280px rail on a 600px
     * window leaves 320px for the content, which is narrower than the compact
     * layout it just grew out of.
     *
     * The menu button overrides either way; this watcher only sets the default
     * as the window crosses a boundary.
     */
    const railExpanded = ref(false)

    watch(breakpoint, name => {
      railExpanded.value = [ 'expanded', 'large', 'extra-large' ].includes(name)
    }, { immediate: true })

    /* Compact always gets the full tree -- a 96px rail over a scrim would hide
     * the content without giving anything back. */
    const railMode = computed(() => (
      isCompact.value === true || railExpanded.value === true ? 'expanded' : 'collapsed'
    ))

    const railWidth = computed(() => (railMode.value === 'expanded' ? 280 : 96))

    return {
      isCompact,
      isDark,
      toggle,
      navigationVisible,
      railMode,
      railWidth,

      link: 'https://quasar-prime-admin-template.netlify.app/analytics',

      menuLabel: computed(() => (
        isCompact.value === true
          ? 'Open navigation menu'
          : railExpanded.value === true ? 'Collapse navigation' : 'Expand navigation'
      )),

      toggleNavigation () {
        /*
         * Two different gestures behind one button, because the rail means two
         * different things by size: on compact it is an overlay to show or
         * hide, everywhere else it is always visible and the button changes its
         * width instead.
         */
        if (isCompact.value === true) {
          navigationVisible.value = navigationVisible.value === false
          return
        }
        railExpanded.value = railExpanded.value === false
      },

      onNavigate () {
        /* Dismiss the overlay after a destination is chosen; on desktop the
         * rail is inline and should stay put. */
        if (isCompact.value === true) navigationVisible.value = false
      }
    }
  }
})
</script>

<style scoped>
.md-appbar {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md-appbar__toolbar {
  min-height: 64px;
  padding-inline: var(--md-layout-margin);
}

.md-appbar__sponsor { color: var(--md-sys-color-error); }

/*
 * Not color="negative" text-color="white": in dark mode `error` resolves to a
 * light tone (#ffb4ab) and a white label on it is unreadable. M3's badge role
 * pair is error / on-error, which inverts correctly with the scheme.
 */
.md-badge {
  background: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
}

.md-brand {
  display: flex;
  align-items: center;
  gap: var(--md-sys-space-150);
  min-height: 64px;
  padding-inline: var(--md-sys-space-300);
  color: var(--md-sys-color-on-surface);
}

.md-brand--collapsed {
  justify-content: center;
  padding-inline: var(--md-sys-space-100);
}

.md-brand__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: var(--md-sys-shape-corner-medium);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-brand__text { min-width: 0; }

.md-brand__sub { color: var(--md-sys-color-on-surface-variant); }

.md-brand__rule { background: var(--md-sys-color-outline-variant); }

/* Fills what is left of the drawer under the brand block. */
.md-drawer__scroll { height: calc(100% - 65px); }

.md-rail-drawer {
  background: var(--md-sys-color-surface);
  /* The rail resizes between 96px and 280px; without a transition the whole
     page jumps. Spatial curve, so it settles with a slight overshoot. */
  transition: width var(--md-sys-motion-duration-default-spatial) var(--md-sys-motion-spring-expressive-default-spatial);
}

.md-footer {
  background: transparent;
  color: var(--md-sys-color-on-surface);
}

.md-promo {
  display: flex;
  align-items: center;
  gap: var(--md-sys-space-200);
  margin: var(--md-sys-space-200);
  padding: var(--md-sys-space-150) var(--md-sys-space-200);
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-promo__avatar {
  width: 44px;
  height: 44px;
  border-radius: var(--md-sys-shape-corner-medium);
  background: color-mix(in srgb, var(--md-sys-color-on-tertiary-container) 12%, transparent);
}

.md-promo__text {
  flex: 1 1 auto;
  min-width: 0;
}

.md-promo__cta {
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-tertiary);
  color: var(--md-sys-color-on-tertiary);
}

@media (max-width: 719px) {
  .md-promo { flex-direction: column; align-items: flex-start; }
  .md-promo__cta { width: 100%; }
}

/* FONT AWESOME GENERIC BEAT */
.fa-beat { animation: fa-beat 5s ease infinite; }

@keyframes fa-beat {
  0%   { transform: scale(1); }
  5%   { transform: scale(1.25); }
  20%  { transform: scale(1); }
  30%  { transform: scale(1); }
  35%  { transform: scale(1.25); }
  50%  { transform: scale(1); }
  55%  { transform: scale(1.25); }
  70%  { transform: scale(1); }
}

/* The beat is decoration; honour the OS setting. */
@media (prefers-reduced-motion: reduce) {
  .fa-beat { animation: none; }
}
</style>
