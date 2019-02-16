import store from 'store'
import _ from 'lodash'

export default class StorageArray extends Array {
    constructor(key) {
        super()
        this.key = key
        let existing = store.get(this.key, [])
        _.each(existing, e => {
            this.push(e)
        })
    }

    push(item) {
        super(item)
        store.set(this.key)
    }

    delete(item) {
        let index = this.indexOf(item)
        this.splice(index, 1)
        store.set(this.key, this)
    }
}