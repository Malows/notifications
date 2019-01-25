import Vue from 'vue'
import nanoid from 'nanoid'
import './style.scss'

import render from './renderFunction'

export const Notifications = {
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

function init () {
  const node = document.createElement('div')
  node.setAttribute('id', 'notifications')
  document.body.appendChild(node)

  this.__vm = new Vue(Notifications)
  this.__vm.$mount(node)
}

export default {
  create (opts) {
    return this.__vm.add(opts)
  },

  install (vueInstance) {
    init.call(this, vueInstance)
    vueInstance.prototype.$notify = this.create.bind(this)
  }
}
