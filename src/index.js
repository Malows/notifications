import Vue from 'vue'
import Notifications from './notifications'
// import './style.scss'

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
