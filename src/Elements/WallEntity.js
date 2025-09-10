import BaseEntity from "./BaseEntity.js";
import wall from "../assets/stoneCenter.png"

export default class WallEntity extends BaseEntity {
    constructor(r,c) {
        super(r,c, false);
        this.type = "WallEntity";
        this.sprite = wall;
    }

}