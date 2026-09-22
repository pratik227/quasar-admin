/*
 * The navigation tree, as data.
 *
 * This used to be ~250 lines of hand-written <q-item> inside MainLayout.vue,
 * which meant the same destination had to be restated for every form the
 * navigation takes. M3 asks for three of them -- a bottom bar on compact, a
 * collapsed rail from medium up, and an expanded rail at extra-large -- so the
 * markup duplication would have tripled. Describing the tree once and letting
 * each component render it is what makes the adaptive navigation tractable.
 *
 * SHAPE
 *   { label, icon, to }                a destination
 *   { label, icon, children: [...] }   a group; expandable in the expanded rail
 *   { header: '...' }                  a section label, expanded rail only
 *
 * `short` is an optional abbreviated label for the two surfaces that give a
 * destination a fixed, narrow column: the 96px collapsed rail and the bottom
 * navigation bar. Without it "Product Catalogues" wraps to three lines in the
 * rail and overflows the bar, which pushes the last destination behind a
 * scroll arrow. The full label is still used everywhere there is room.
 *
 * `primary: true` marks a destination as a top-level one. Material limits the
 * navigation bar to 3-5 destinations and the collapsed rail to roughly seven,
 * so those two surfaces render only the primary set; everything else is reached
 * through the expanded rail. Adding an eighth primary is not fatal, it just
 * makes the rail scroll.
 *
 * ICONS are Material Icons, deliberately. The Font Awesome build gate
 * (postcss.config.js) fails production builds on any icon missing from the
 * subset in src/assets/fonts, so every FA icon added here would also need
 * `npm run fonts:subset` re-run and four binaries re-committed. Material Icons
 * are never purged, and are the M3-native set anyway.
 *
 * PATHS are left at their existing mixed casing on purpose. They are the live
 * URLs of a deployed, indexed site (see the SEO commits in git log), and Vue
 * Router matches case-sensitively -- renaming /Dashboard2 to /dashboard2 would
 * silently 404 every inbound link.
 */

export const navigation = [
  { label: 'Dashboard', icon: 'dashboard', to: '/', primary: true },
  { label: 'CRM Dashboard', short: 'CRM', icon: 'insights', to: '/Dashboard2', primary: true },

  { header: 'Data' },
  { label: 'Tables', icon: 'table_chart', to: '/Tables', primary: true },
  { label: 'Charts', icon: 'insert_chart', to: '/Charts', primary: true },
  { label: 'TreeTable', icon: 'account_tree', to: '/TreeTable' },
  { label: 'Pagination', icon: 'format_list_numbered', to: '/Pagination' },

  { header: 'Commerce' },
  { label: 'Product Catalogues', short: 'Products', icon: 'storefront', to: '/Ecommerce', primary: true },
  { label: 'Checkout', icon: 'shopping_cart_checkout', to: '/Checkout' },

  { header: 'Communication' },
  /*
   * Mail renders its own layout (routes.js puts it outside MainLayout), so
   * navigating here replaces the whole shell rather than swapping a pane.
   */
  { label: 'Mail', icon: 'mail', to: '/Mail' },
  { label: 'Contact', icon: 'contacts', to: '/Contact' },
  { label: 'Directory', icon: 'badge', to: '/Directory' },
  { label: 'Calendar', icon: 'calendar_month', to: '/Calendar', primary: true },

  { header: 'Components' },
  { label: 'Cards', icon: 'style', to: '/Cards' },
  { label: 'Card Header', icon: 'crop_landscape', to: '/CardHeader' },
  { label: 'Footer', icon: 'web_asset', to: '/Footer' },

  { header: 'Pages' },
  {
    label: 'Authentication',
    icon: 'lock',
    children: [
      { label: 'Login', icon: 'login', to: '/Login-1' },
      { label: 'Sign Up', icon: 'person_add', to: '/Signup' },
      { label: 'Lock Screen', icon: 'lock_outline', to: '/Lock' },
      { label: 'Lock Screen 2', icon: 'lock_clock', to: '/Lock-2' }
    ]
  },
  {
    label: 'Maps',
    icon: 'map',
    children: [
      { label: 'Map', icon: 'map', to: '/Map' },
      { label: 'Map Marker', icon: 'location_on', to: '/MapMarker' },
      { label: 'Street View', icon: 'streetview', to: '/StreetView' }
    ]
  },
  { label: 'User Profile', icon: 'person', to: '/Profile' },
  { label: 'Pricing', icon: 'sell', to: '/Pricing' },
  { label: 'Maintenance', icon: 'engineering', to: '/Maintenance' },
  { label: 'About Us', icon: 'info', to: '/About' },

  {
    /*
     * A demo of nesting depth rather than real destinations -- these carry no
     * `to`, so they render as inert rows. Kept because the template advertises
     * multi-level menus.
     */
    label: 'Menu Levels',
    icon: 'layers',
    children: [
      { label: 'Level 1' },
      {
        label: 'Level 2',
        children: [
          { label: 'Level 2.1' },
          {
            label: 'Level 2.2',
            children: [
              { label: 'Level 2.2.1' },
              { label: 'Level 2.2.2' }
            ]
          }
        ]
      }
    ]
  }
]

/* Flat list of every destination, for the surfaces that can't show a tree. */
function collectPrimary (items) {
  return items.reduce((found, item) => {
    if (item.primary === true) found.push(item)
    if (Array.isArray(item.children) === true) found.push(...collectPrimary(item.children))
    return found
  }, [])
}

export const primaryDestinations = collectPrimary(navigation)
