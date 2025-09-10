import TopEntity from "./TopEntity.js";
import stand from "../assets/player/p_stand.png";
import walk1 from "../assets/player/p_walk01.png";
import walk2 from "../assets/player/p_walk02.png";
import walk3 from "../assets/player/p_walk03.png";

class Animation {
    constructor(frames, speed = 200) {
        this.frames = frames;
        this.speed = speed;
        this.frameIndex = 0;
        this.lastTime = 0;
    }

    getFrame(time) {
        if (time - this.lastTime > this.speed) {
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.lastTime = time;
        }
        return this.frames[this.frameIndex];
    }
}

export default class PlayerEntity extends TopEntity {
    constructor(r,c) {
        super(r,c);
        this.type = "PlayerEntity"
        this.animations = {
            idle: new Animation([stand]),
            walk: new Animation([walk1, walk2, walk3], 150),
        };
        this.sprites = {
            stand,
            walk1,
            walk2,
            walk3,
        }
        this.currentState = "idle";

    }

    getSprite(time) {
        return this.animations[this.currentState].getFrame(time);
    }

    setState(state) {
        if (this.animations[state]) {
            this.currentState = state;
        }
    }
}