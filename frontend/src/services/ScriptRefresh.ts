export default class ScriptRefresh<T> {
  i: number = 0
  dirty: boolean = false

  isOkToPull: () => boolean
  pull: () => Promise<T>
  commit: (data: T) => void
  timeout: number | undefined
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
  }

  private getTimeout() {
    const i = this.i

    return (
      (function() {
        if (i <= 200) return 3 // 3 second wait for first 10 min
        return 3 + (i - 200) ** 2 // then exponential backoff
      })() * 1000
    )
  }

  private refresh() {
    this.timeout = setTimeout(async () => {
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
    }, this.getTimeout())
  }

  terminate() {
    console.log('terminating')
    this.terminated = true
    if (this.timeout) clearTimeout(this.timeout)
  }
}
