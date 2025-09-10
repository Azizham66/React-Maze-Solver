export default class BaseEntity {
    constructor(r,c, isPassable = false) {
        this.r = r;
        this.c = c;
        this.isPassable = isPassable;
    }
}