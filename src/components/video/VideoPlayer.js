export default class VideoPlayer {
  constructor(canvas, ctx, media, ratio, drawCallback) {
    this.canvas = canvas
    this.ctx = ctx
    this.media = media
    this.ratio = ratio
    this.drawCallback = drawCallback
    this.playListener = () => this.drawVideo()
    media.addEventListener('play', this.playListener, false)
  }

  drawVideo = force => {
    const { media, ctx, ratio } = this
    const { width } = this.canvas
    const height = this.canvas.width / ratio

    ctx.drawImage(media, 0, 0, width, height)

    if (!media.paused && !media.ended && !force) {
      setTimeout(this.drawVideo, 1000 / 24)
    }
    if (!force && this.drawCallback) this.drawCallback()
  }

  onPlayPauseHandler = () => {
    if (this.media.paused) {
      this.media.play()
    } else this.media.pause()
  }

  destroy = () => {
    this.media.removeEventListener('play', this.playListener, false)
    if (!this.media.paused) this.media.pause()
    this.media.remove()
    delete this.media
  }
}
