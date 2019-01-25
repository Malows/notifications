function renderNotification (h) {
  return function ({ message, __uid, staticClass, closeBtn }) {
    return h(
      'div',
      { ref: `notif_${__uid}`, key: __uid, staticClass },
      [
        h('button', { staticClass: 'delete', on: { click: closeBtn } }),
        message
      ]
    )
  }
}

function renderNotificationsList (h) {
  return h(
    'transition-group',
    {
      key: 'bottom',
      staticClass: `notifications__list`,
      tag: 'div',
      props: { mode: 'out-in' }
    },
    this.notifs.map(renderNotification(h))
  )
}

export default renderNotificationsList
