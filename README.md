# Vue-Notifications

**vue-notifications** is an opninionated and unconfigurable plugin to pop up notifications

## Usage
You can use `vue-notifications` directly in the browser without any build setup.

You can simply register the plugin:

```javascript
import VueNotifications from '@malows/vue-notifications'

Vue.use(VueNotifications)
```

## How to use

Just calling the method from your instance

```javascript
this.$notify({ message, color })
```
