<template>
  <q-page class="md-page">
    <div class="md-about">

      <!-- Hero -->
      <q-card flat class="md-about__hero">
        <q-card-section class="md-about__hero-body">
          <div class="md-label-large md-about__eyebrow">About us</div>
          <h1 class="md-headline-large md-headline-large--emphasized q-my-sm">
            Quasar Admin Templates
          </h1>
          <p class="md-body-large md-measure q-mb-none">
            A trusted Quasar template builder. We make premium, pre-built admin
            templates for Vue&nbsp;3 — and offer consulting to take a project
            from first conversation through to deployment.
          </p>

          <div class="row q-gutter-sm q-mt-lg">
            <q-btn
              unelevated
              no-caps
              class="md-about__cta"
              type="a"
              :href="org"
              target="_blank"
              rel="noopener"
              icon="collections_bookmark"
              label="Browse our templates"
            />
            <q-btn
              outline
              no-caps
              class="md-about__cta md-about__cta--ghost"
              type="a"
              :href="`mailto:${email}`"
              icon="mail"
              label="Get in touch"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- Headline numbers -->
      <div class="row q-col-gutter-md">
        <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-4 md-about__cell">
          <q-card flat class="md-about__stat">
            <q-card-section>
              <div class="md-display-small md-display-small--emphasized">{{ stat.value }}</div>
              <div class="md-body-medium md-about__muted q-mt-xs">{{ stat.label }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Template showcase -->
      <section>
        <h2 class="md-title-large md-title-large--emphasized q-mb-md">Our premium templates</h2>

        <div class="row q-col-gutter-md">
          <div
            v-for="product in products"
            :key="product.name"
            class="col-12 col-md-4 md-about__cell"
          >
            <q-card flat class="md-about__card">
              <q-card-section>
                <div class="row items-start no-wrap q-gutter-sm">
                  <div class="md-about__mark">
                    <q-icon :name="product.icon" size="22px" />
                  </div>
                  <div class="col">
                    <div class="md-title-medium md-title-medium--emphasized">{{ product.name }}</div>
                    <!-- The count is the social proof, so it reads as a figure
                         rather than being buried in the sentence. -->
                    <div class="md-about__count md-label-medium md-label-medium--emphasized q-mt-xs">
                      <q-icon name="people" size="14px" />
                      {{ product.customers }} happy customers
                    </div>
                  </div>
                </div>

                <p class="md-body-medium md-about__muted q-mt-md q-mb-none">
                  {{ product.blurb }}
                </p>
              </q-card-section>

              <q-card-actions class="q-px-md q-pb-md">
                <q-btn
                  flat
                  dense
                  no-caps
                  type="a"
                  :href="product.demo"
                  target="_blank"
                  rel="noopener"
                  icon-right="open_in_new"
                  label="View demo"
                  class="md-about__link"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Why choose us -->
      <section>
        <h2 class="md-title-large md-title-large--emphasized q-mb-md">Why choose us</h2>

        <div class="row q-col-gutter-md">
          <div
            v-for="reason in reasons"
            :key="reason.title"
            class="col-12 col-sm-6 md-about__cell"
          >
            <q-card flat bordered class="md-about__reason">
              <q-card-section class="row no-wrap q-gutter-md">
                <q-icon :name="reason.icon" size="24px" class="md-about__reason-icon" />
                <div class="col">
                  <div class="md-title-small md-title-small--emphasized">{{ reason.title }}</div>
                  <p class="md-body-medium md-about__muted q-mt-xs q-mb-none">{{ reason.body }}</p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <q-card flat class="md-about__contact">
        <q-card-section class="row items-center no-wrap q-gutter-md">
          <q-icon name="waving_hand" size="32px" class="md-about__contact-icon" />
          <div class="col">
            <div class="md-title-medium md-title-medium--emphasized">
              Looking to build something extraordinary?
            </div>
            <p class="md-body-medium q-mt-xs q-mb-none">
              Tell us about the project and we will help bring it to life.
            </p>
          </div>
          <q-btn
            unelevated
            no-caps
            class="md-about__cta md-about__cta--on-contact"
            type="a"
            :href="`mailto:${email}`"
            :label="email"
          />
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

const PRODUCTS = [
  {
    name: 'Quasar Prime',
    icon: 'auto_awesome',
    customers: 81,
    blurb: 'A modern, sleek admin template known for its robust functionality and user-friendly interface.',
    demo: 'https://quasar-prime-admin-template.netlify.app/analytics'
  },
  {
    name: 'Quasar Admin Premium',
    icon: 'dashboard_customize',
    customers: 16,
    blurb: 'A powerful and highly customizable admin dashboard template, also available for TypeScript.',
    demo: 'https://quasar-admin-premium.netlify.app/'
  },
  {
    name: 'Quasar Minimalist',
    icon: 'crop_square',
    customers: 12,
    blurb: 'A clean, minimalist dashboard for anyone who wants simplicity without giving up features.',
    demo: 'https://quasar-minimalist-design.netlify.app/'
  }
]

export default defineComponent({
  name: 'AboutPage',

  setup () {
    return {
      email: 'pratikpatelpp802@gmail.com',
      org: 'https://github.com/Quasar-Admin-Templates',
      products: PRODUCTS,

      /* Derived, not typed twice -- the total cannot drift from the cards. */
      stats: [
        { value: PRODUCTS.reduce((n, p) => n + p.customers, 0) + '+', label: 'Happy customers' },
        { value: PRODUCTS.length, label: 'Premium templates' },
        { value: 'End-to-end', label: 'Consulting & delivery' }
      ],

      reasons: [
        {
          icon: 'verified',
          title: 'Trusted by developers and businesses',
          body: 'We have delivered numerous projects, helping teams build custom applications on our templates.'
        },
        {
          icon: 'rocket_launch',
          title: 'End-to-end solutions',
          body: 'Comprehensive software development, from the first consultation through to full deployment.'
        },
        {
          icon: 'tune',
          title: 'Customizable templates',
          body: 'Everything is built to be tweaked, so a template becomes your product rather than a constraint.'
        },
        {
          icon: 'support_agent',
          title: 'Expert consulting',
          body: 'More than a template provider — we help make sure the thing you ship is built properly.'
        }
      ]
    }
  }
})
</script>

<style scoped>
.md-page { padding: var(--md-layout-margin); }

.md-about {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-space-400);
}

/* Quasar's gutter rows pull themselves up to cancel their columns' top
   padding; inside a flex column that eats the gap. See Dashboard.vue. */
.md-about > .row[class*="q-col-gutter"],
.md-about section > .row[class*="q-col-gutter"] {
  margin-top: 0;
  row-gap: var(--md-sys-space-200);
}

.md-about > .row[class*="q-col-gutter"] > *,
.md-about section > .row[class*="q-col-gutter"] > * {
  padding-top: 0;
}

/* Equal heights without percentage heights -- see CardSocial.vue. */
.md-about__cell { display: flex; }
.md-about__cell > .q-card { flex: 1; }

.md-about__hero {
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-about__hero-body { padding: var(--md-sys-space-500); }

.md-about__eyebrow {
  text-transform: uppercase;
  opacity: 0.74;
}

.md-about__cta {
  border-radius: var(--md-sys-shape-corner-full);
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  min-block-size: var(--md-sys-target-min);
}

/* On the filled hero the solid button would fight its container, so the
   secondary action borrows the container's own ink instead. */
.md-about__cta--ghost {
  background: transparent;
  color: inherit;
}

.md-about__stat,
.md-about__card,
.md-about__reason {
  border-radius: var(--md-sys-shape-corner-large);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

.md-about__muted { color: var(--md-sys-color-on-surface-variant); }

.md-about__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 40px;
  height: 40px;
  /* Optical roundness: 16px outer corner less 16px padding leaves 8. */
  border-radius: var(--md-sys-shape-corner-small);
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-about__count {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-space-50);
  color: var(--md-sys-color-primary);
}

.md-about__link { color: var(--md-sys-color-primary); }

.md-about__reason-icon { color: var(--md-sys-color-primary); }

.md-about__contact {
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-about__contact-icon { flex: none; }

.md-about__cta--on-contact {
  background: var(--md-sys-color-tertiary);
  color: var(--md-sys-color-on-tertiary);
}

@media (max-width: 599.98px) {
  .md-about__hero-body { padding: var(--md-sys-space-300); }
  .md-about__contact :deep(.q-card__section) { flex-wrap: wrap; }
}
</style>
