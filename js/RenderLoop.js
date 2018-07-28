export default class RenderLoop {
    constructor(cb, fps) {
        this.currentFps = 0;
        this.isActive = false;
        this.msLastFrame = performance.now();

        this.run = () => {
            let currentTime = performance.now();
            cb((currentTime - this.msLastFrame)/1000);
            this.msLastFrame = currentTime;
            if (this.isActive) window.requestAnimationFrame(this.run);
        }
    }

    start() {
        this.msLastFrame = performance.now();
        this.isActive = true;
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop() {
        this.isActive = false;
        return this;
    }
}