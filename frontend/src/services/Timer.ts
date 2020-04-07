type Callback = () => void

export default class Timer {
  scheduled: boolean
  internalId: number
  startedDate: Date
  callback: Callback

  constructor(callback: Callback, delay: number) {
    this.startedDate = new Date()
    this.callback = callback
    this.internalId = this.schedule(callback, delay)
    this.scheduled = true
  }

  private schedule(callback: Callback, delay: number) {
    return setTimeout(this.runCallback.bind(this), delay)
  }
  private runCallback() {
    this.scheduled = false
    this.callback()
  }

  isScheduled() {
    return this.scheduled
  }

  reschedule(newDelay: number) {
    if (!this.scheduled) throw Error('Timer is not scheduled, cannot reschedule')
    this.clear()

    this.startedDate = new Date()
    this.internalId = this.schedule(this.callback, newDelay)
    this.scheduled = true
  }

  getTimeLeftMs(): number {
    return new Date().getTime() - this.startedDate.getTime()
  }

  clear() {
    clearTimeout(this.internalId)
    this.scheduled = false
  }
}
