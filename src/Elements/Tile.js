import PlayerEntity from "./PlayerEntity.js";
import GoalEntity from "./GoalEntity.js";
import PathEntity from "./PathEntity.js";
import TopEntity from "./TopEntity.js";
import BaseEntity from "./BaseEntity.js";

export default class Tile {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        this.top = null;
        this.base = null;
    }

    canPlace(entity) {
        if (entity instanceof TopEntity) {
            return this.base instanceof PathEntity && this.top === null;
        }
        if (entity instanceof BaseEntity) {
            return this.base === null;
        }
        return false;
    }


    place(tile) {
        if (this.canPlace(tile) && tile instanceof TopEntity) {
            this.top = tile;
        } else if (this.canPlace(tile) && tile instanceof BaseEntity) {
            this.base = tile;
        }
    }
}