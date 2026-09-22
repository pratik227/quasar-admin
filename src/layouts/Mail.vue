<template>
  <q-layout view="lHh Lpr lff">
    <!--
      List-detail, Material's second canonical layout:
      https://m3.material.io/foundations/layout/canonical-examples/list-detail

      Three regions, which is also exactly the shape of shadcn's sidebar-09 --
      an icon rail for folders, a fixed list pane, and a flexible detail pane.
      The two designs agree because it is the same problem: an explorable list
      beside the thing it explores.

      Region widths come from the spec: the fixed pane is 360dp at expanded and
      412dp at large/extra-large (--md-layout-pane-fixed), and the detail pane
      takes the remainder.
    -->
    <q-header class="md-mail__bar" bordered>
      <q-toolbar class="md-mail__toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Toggle folders"
          @click="railOpen = !railOpen"
        />

        <!-- Breadcrumb, as in sidebar-09: the rail selection then the list. -->
        <q-breadcrumbs class="md-body-medium md-mail__crumbs" active-color="primary" gutter="xs">
          <q-breadcrumbs-el label="All Inboxes" />
          <q-breadcrumbs-el :label="activeFolder.label" />
        </q-breadcrumbs>

        <q-space />

        <md-theme-picker />

        <q-btn
          round
          dense
          flat
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        />
        <q-btn round flat dense to="/" aria-label="Back to dashboard" icon="dashboard" />
      </q-toolbar>
    </q-header>

    <!-- Region 1: folder rail. Icon-only, labels in tooltips -- same reasoning
         as the main navigation rail: 96px cannot hold "Important". -->
    <q-drawer
      v-model="railOpen"
      :width="96"
      :behavior="isCompact ? 'mobile' : 'desktop'"
      show-if-above
      bordered
      class="md-mail__rail"
    >
      <q-list class="md-mail__folders" role="navigation" aria-label="Mail folders">
        <q-item
          v-for="folder in folders"
          :key="folder.id"
          v-ripple
          clickable
          :active="folder.id === activeFolderId"
          active-class="md-mail__folder--active"
          class="md-mail__folder"
          @click="selectFolder(folder.id)"
        >
          <q-item-section avatar class="md-mail__folder-icon">
            <q-icon :name="folder.icon" size="24px" />
            <q-badge v-if="folder.count" floating class="md-mail__count">{{ folder.count }}</q-badge>
          </q-item-section>
          <q-tooltip anchor="center right" self="center left">{{ folder.label }}</q-tooltip>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="md-mail">
        <!--
          Region 2: the list pane. Fixed width, so the detail pane is the one
          that absorbs a window resize -- Material requires at least one
          flexible pane, and a reading column is the one that benefits.
        -->
        <aside
          v-show="!isCompact || selected === null"
          class="md-mail__list"
          aria-label="Message list"
        >
          <div class="md-mail__list-head">
            <div class="row items-center justify-between no-wrap">
              <h1 class="md-title-large q-my-none">{{ activeFolder.label }}</h1>
              <q-toggle
                v-model="unreadOnly"
                label="Unreads"
                class="md-label-large"
                dense
                color="primary"
              />
            </div>

            <q-input
              v-model="query"
              dense
              outlined
              clearable
              type="search"
              placeholder="Type to search…"
              class="md-mail__search q-mt-md"
              aria-label="Search messages"
            >
              <template #prepend><q-icon name="search" /></template>
            </q-input>
          </div>

          <!--
            Native overflow rather than QScrollArea. QScrollArea layers an
            absolutely positioned container and scrollbar over its content, and
            that layer sat above the list items -- pointer events landed on the
            wrapper instead of the row, so messages could not be opened. A mail
            list needs no custom scrollbar, and native scrolling keeps keyboard
            and screen-reader behaviour intact for free.
          -->
          <div class="md-mail__scroll">
            <q-list>
              <q-item
                v-for="mail in visibleMail"
                :key="mail.id"
                v-ripple
                clickable
                :active="mail.id === selected"
                active-class="md-mail__item--active"
                class="md-mail__item"
                @click="selected = mail.id"
              >
                <q-item-section>
                  <div class="row items-center justify-between no-wrap">
                    <span class="md-mail__from" :class="mail.unread ? 'md-label-large--emphasized' : ''">
                      {{ mail.from }}
                    </span>
                    <span class="md-label-medium md-mail__time">{{ mail.time }}</span>
                  </div>

                  <div
                    class="md-mail__subject md-body-medium"
                    :class="mail.unread ? 'md-body-medium--emphasized' : ''"
                  >
                    {{ mail.subject }}
                  </div>

                  <!-- Two lines then ellipsis, as in the reference. -->
                  <div class="md-mail__preview md-body-small">{{ mail.preview }}</div>
                </q-item-section>
              </q-item>

              <div v-if="visibleMail.length === 0" class="md-mail__empty md-body-medium">
                Nothing matches “{{ query }}”.
              </div>
            </q-list>
          </div>
        </aside>

        <!--
          Region 3: the detail pane.

          On compact this REPLACES the list rather than sitting beside it --
          Material's show-and-hide strategy. One pane is the rule under 600dp,
          and a 360px list next to a reading column would leave neither usable.
        -->
        <section v-show="!isCompact || selected !== null" class="md-mail__detail" aria-label="Message">
          <template v-if="activeMail">
            <header class="md-mail__detail-head">
              <q-btn
                v-if="isCompact"
                flat
                dense
                round
                icon="arrow_back"
                aria-label="Back to list"
                class="q-mr-sm"
                @click="selected = null"
              />
              <div class="col">
                <h2 class="md-headline-small q-my-none">{{ activeMail.subject }}</h2>
                <div class="md-body-small md-mail__muted q-mt-xs">
                  {{ activeMail.from }} · {{ activeMail.time }}
                </div>
              </div>
              <q-space />
              <q-btn flat dense round icon="reply" aria-label="Reply" />
              <q-btn flat dense round icon="archive" aria-label="Archive" />
              <q-btn flat dense round icon="delete" aria-label="Delete" />
            </header>

            <q-separator class="md-mail__rule" />

            <article class="md-mail__body md-body-large md-measure">
              <p v-for="(para, i) in activeMail.body" :key="i">{{ para }}</p>
            </article>
          </template>

          <div v-else class="md-mail__placeholder">
            <q-icon name="drafts" size="48px" />
            <p class="md-title-medium q-mt-md q-mb-none">Select a message</p>
            <p class="md-body-medium md-mail__muted">Nothing is open yet.</p>
          </div>
        </section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

import MdThemePicker from '@/components/MdThemePicker.vue'
import { useBreakpoint } from '@/composables/useBreakpoint.js'
import { useDarkMode } from '@/composables/useDarkMode.js'

const FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 4 },
  { id: 'drafts', label: 'Drafts', icon: 'edit_note', count: 0 },
  { id: 'sent', label: 'Sent', icon: 'send', count: 0 },
  { id: 'junk', label: 'Junk', icon: 'report', count: 2 },
  { id: 'trash', label: 'Trash', icon: 'delete', count: 0 }
]

const MAIL = [
  {
    id: 1, from: 'William Smith', time: '09:34 AM', unread: true,
    subject: 'Meeting Tomorrow',
    preview: 'Hi team, just a reminder about our meeting tomorrow at 10 AM. Please come prepared with your project updates.',
    body: [
      'Hi team, just a reminder about our meeting tomorrow at 10 AM.',
      'Please come prepared with your project updates — we will go round the table and keep each one to five minutes so we finish on the hour.',
      'If you cannot make it, send your notes through beforehand and I will read them out.'
    ]
  },
  {
    id: 2, from: 'Alice Smith', time: 'Yesterday', unread: true,
    subject: 'Re: Project Update',
    preview: 'Thanks for the update. The progress looks great so far. Let us schedule a call to discuss the next steps.',
    body: [
      'Thanks for the update. The progress looks great so far.',
      'Let us schedule a call to discuss the next steps — I have a few questions about the timeline for the second milestone.'
    ]
  },
  {
    id: 3, from: 'Bob Johnson', time: '2 days ago', unread: false,
    subject: 'Weekend Plans',
    preview: 'Hey everyone! I am thinking of organising a team outing this weekend. Would you be interested in a hiking trip?',
    body: [
      'Hey everyone! I am thinking of organising a team outing this weekend.',
      'Would you be interested in a hiking trip or a beach day? Reply with a preference and I will book whichever wins.'
    ]
  },
  {
    id: 4, from: 'Emily Davis', time: '2 days ago', unread: true,
    subject: 'Re: Question about Budget',
    preview: 'I have reviewed the budget numbers you sent over. Can we set up a quick call to discuss some adjustments?',
    body: [
      'I have reviewed the budget numbers you sent over.',
      'Can we set up a quick call to discuss some potential adjustments? Nothing alarming, but two line items look optimistic.'
    ]
  },
  {
    id: 5, from: 'Michael Wilson', time: '1 week ago', unread: false,
    subject: 'Important Announcement',
    preview: 'Please join us for an all-hands meeting this Friday at 3 PM. We have some exciting news to share.',
    body: [
      'Please join us for an all-hands meeting this Friday at 3 PM.',
      'We have some exciting news to share about the direction of the company over the next year.'
    ]
  },
  {
    id: 6, from: 'Sarah Brown', time: '1 week ago', unread: true,
    subject: 'Re: Feedback on Proposal',
    preview: 'Thank you for sending over the proposal. I have reviewed it and have some thoughts to share with you.',
    body: [
      'Thank you for sending over the proposal. I have reviewed it and have some thoughts.',
      'Could we schedule a meeting to discuss my feedback in detail? Most of it is small, but one section needs a rethink.'
    ]
  },
  {
    id: 7, from: 'David Lee', time: '1 week ago', unread: false,
    subject: 'New Project Idea',
    preview: 'I have been brainstorming and came up with an interesting project concept worth discussing this week.',
    body: [
      'I have been brainstorming and came up with an interesting project concept.',
      'Do you have time this week to discuss its potential impact and feasibility?'
    ]
  },
  {
    id: 8, from: 'Olivia Wilson', time: '1 week ago', unread: false,
    subject: 'Vacation Plans',
    preview: 'Just a heads up that I will be taking a two-week vacation next month and will hand over beforehand.',
    body: [
      'Just a heads up that I will be taking a two-week vacation next month.',
      'I will make sure all my projects are up to date before I leave, and I will write a handover note for anything in flight.'
    ]
  }
]

export default defineComponent({
  name: 'MailLayout',

  components: { MdThemePicker },

  setup () {
    const { isCompact } = useBreakpoint()
    const { isDark, toggle } = useDarkMode()

    const railOpen = ref(false)
    const activeFolderId = ref('inbox')
    const unreadOnly = ref(false)
    const query = ref('')

    /*
     * Pre-select the newest message so the detail pane is not an empty
     * half-screen on load -- but only once the real breakpoint is known.
     *
     * useBreakpoint() deliberately reports 'compact' until mount so that server
     * and client render identically, which means isCompact is still true during
     * setup on a 1600px window. Reading it here gave every desktop visitor the
     * "Select a message" placeholder. The decision therefore belongs in
     * onMounted, where the width has actually been measured.
     *
     * Compact stays unselected: there the detail pane REPLACES the list, so
     * opening on a message would hide the inbox behind a reading view.
     */
    const selected = ref(null)

    onMounted(() => {
      if (isCompact.value === false) selected.value = MAIL[ 0 ].id
    })

    const visibleMail = computed(() => {
      const term = (query.value || '').trim().toLowerCase()
      return MAIL.filter(mail => {
        if (unreadOnly.value === true && mail.unread === false) return false
        if (term === '') return true
        return `${mail.from} ${mail.subject} ${mail.preview}`.toLowerCase().includes(term)
      })
    })

    return {
      isCompact,
      isDark,
      toggle,
      railOpen,
      folders: FOLDERS,
      activeFolderId,
      unreadOnly,
      query,
      selected,
      visibleMail,

      activeFolder: computed(() => FOLDERS.find(f => f.id === activeFolderId.value)),
      activeMail: computed(() => MAIL.find(m => m.id === selected.value) || null),

      selectFolder (id) {
        activeFolderId.value = id
        selected.value = null
        if (isCompact.value === true) railOpen.value = false
      }
    }
  }
})
</script>

<style scoped>
.md-mail__bar {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md-mail__toolbar {
  min-height: 64px;
  padding-inline: var(--md-layout-margin);
}

.md-mail__crumbs { color: var(--md-sys-color-on-surface-variant); }

.md-mail__rail { background: var(--md-sys-color-surface); }

/*
 * Padding belongs on the list, not the drawer: QDrawer renders its own content
 * wrapper, so padding set on .q-drawer never reaches the items. Same 12px as
 * the items' horizontal inset, so the rail is evenly inset on all four edges.
 */
.md-mail__folders {
  padding-block: var(--md-sys-space-150);
}

.md-mail__folder {
  justify-content: center;
  min-height: var(--md-sys-target-min);
  color: var(--md-sys-color-on-surface-variant);
}

/* Same state-layer treatment as the main rail: tint the pill, not the row. */
.md-mail__folder :deep(.q-focus-helper) { display: none; }

.md-mail__folder-icon {
  /*
   * QBadge[floating] is absolutely positioned against the nearest POSITIONED
   * ancestor. Without this the pill was static, so the badge escaped up to the
   * QItem and rendered detached from its icon, half outside the 96px rail.
   */
  position: relative;
  min-width: 56px;
  width: 56px;
  height: 32px;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--md-sys-shape-corner-full);
  transition: background-color var(--md-sys-motion-duration-default-effects) var(--md-sys-motion-spring-standard-default-effects);
}

.md-mail__folder:hover .md-mail__folder-icon {
  background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-mail__folder--active { color: var(--md-sys-color-on-secondary-container); }

.md-mail__folder--active .md-mail__folder-icon {
  background: var(--md-sys-color-secondary-container);
}

.md-mail__count {
  background: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
  /* Tucked onto the pill rather than Quasar's default corner, which sat it
     outside the rail edge. */
  top: -2px;
  right: 6px;
  padding: 1px 5px;
  font-size: 10px;
  line-height: 14px;
}

/*
 * The two panes. `height: 100%` is avoided here for the reason documented in
 * CardSocial: a percentage height inside a stretched flex parent is circular.
 * The page is sized by QLayout instead, and the panes inherit that via
 * min-height on the page itself.
 */
.md-mail {
  display: flex;
  gap: var(--md-layout-spacer);
  padding: var(--md-layout-margin);
  align-items: stretch;
}

.md-mail__list {
  display: flex;
  flex-direction: column;
  flex: 0 0 var(--md-layout-pane-fixed);
  min-width: 0;
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface-container-low);
  overflow: hidden;
}

/* Compact shows one pane at a time, so the list takes the full width. */
@media (max-width: 599.98px) {
  .md-mail { flex-direction: column; }
  .md-mail__list { flex: 1 1 auto; }
}

.md-mail__list-head {
  padding: var(--md-sys-space-200);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}

.md-mail__search :deep(.q-field__control) {
  border-radius: var(--md-sys-shape-corner-full);
}

.md-mail__scroll {
  flex: 1;
  min-height: 320px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.md-mail__item {
  display: block;
  padding: var(--md-sys-space-200);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  color: var(--md-sys-color-on-surface);
}

.md-mail__item--active {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-mail__from { font: inherit; }

.md-mail__time {
  flex: none;
  margin-inline-start: var(--md-sys-space-100);
  opacity: 0.74;
}

.md-mail__subject { margin-block-start: var(--md-sys-space-50); }

/*
 * Two lines then ellipsis. -webkit-line-clamp is the only cross-browser way to
 * clamp by LINE rather than by height, and it needs its display/orient pair to
 * take effect -- a max-height in ems would drift with the font.
 */
.md-mail__preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-block-start: var(--md-sys-space-50);
  opacity: 0.74;
}

.md-mail__empty,
.md-mail__placeholder {
  padding: var(--md-sys-space-600) var(--md-sys-space-200);
  text-align: center;
  color: var(--md-sys-color-on-surface-variant);
}

.md-mail__detail {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface-container-low);
}

.md-mail__detail-head {
  display: flex;
  align-items: center;
  gap: var(--md-sys-space-100);
  padding: var(--md-sys-space-300);
}

.md-mail__rule { background: var(--md-sys-color-outline-variant); }

.md-mail__body { padding: var(--md-sys-space-300); }

.md-mail__muted { color: var(--md-sys-color-on-surface-variant); }

.md-mail__placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
