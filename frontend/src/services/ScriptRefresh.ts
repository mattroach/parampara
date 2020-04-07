import Timer from './Timer'

export default class ScriptRefresh<T> {
  i: number = 0
  dirty: boolean = false

  isOkToPull: () => boolean
  pull: () => Promise<T>
  commit: (data: T) => void
  timer: Timer | undefined
  terminated: boolean = false

  constructor(
    pull: () => Promise<T>,
    isOkToPull: () => boolean,
    commit: (data: T) => void
  ) {
    this.pull = pull
    this.isOkToPull = isOkToPull
    this.commit = commit
  }

  startRefresh() {
    this.refresh()
  }

  scriptUpdated() {
    this.resetBackoff()
    this.dirty = true
  }

  private resetBackoff() {
    this.i = 0

    // Must reschedule the timer if it's not scheduled to run any time soon
    // Perhaps we are in the exponential backoff zone and it won't run for hours otherwise
    if (this.timer && this.timer.isScheduled()) {
      // Not worth the computations unless it's at least 1s difference
      if (this.timer.getTimeLeftMs() > this.getTimeoutMs() + 1000) {
        console.log('rescheduling timer')
        this.timer.reschedule(this.getTimeoutMs())
      }
    }
  }

  private getTimeoutMs() {
    const i = this.i

    return (
      (function() {
        if (i <= 200) return 3 // 3 second wait for first 10 min
        return 3 + (i - 200) ** 2 // then exponential backoff
      })() * 1000
    )
  }

  private refresh() {
    this.timer = new Timer(async () => {
      if (this.isOkToPull()) {
        this.dirty = false
        const data: T = await this.pull()
        if (this.dirty) {
          console.log('Pull refresh was dirty, ignoring results!')
        } else {
          this.commit(data)
          this.i++
        }
      } else {
        console.log('Not ok to pull!')
      }

      if (!this.terminated) this.refresh()
    }, this.getTimeoutMs())
  }

  terminate() {
    console.log('terminating')
    this.terminated = true
    if (this.timer) this.timer.clear()
  }
}
