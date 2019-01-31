import nanoid from 'nanoid'
import render from './renderFunction'

const Notifications = {
  name: 'Notifications',

  data: { notifs: [] },

  methods: {
    add ({ message, color, timeout = 3000 }) {
      const notif = {
        message,
        timeout,
        staticClass: color ? `notification is-${color}` : 'notification',
        __uid: nanoid(10)
      }

      const close = () => { this.remove(notif) }

      notif.closeBtn = close

      notif.__timeout = setTimeout(
        () => { close() },
        notif.timeout + 1000
      )

      this.notifs.push(notif)

      return close
    },

    remove (notif) {
      if (notif.__timeout) { clearTimeout(notif.__timeout) }

      const index = this.notifs.indexOf(notif)

      if (index !== -1) {
        const el = this.$refs[`notif_${notif.__uid}`]

        if (el) {
          const { width, height } = window.getComputedStyle(el)

          el.style.left = `${el.offsetLeft}px`
          el.style.width = width
          el.style.height = height
        }

        this.notifs.splice(index, 1)
      }
    }
  },

  render
}

export default Notifications
