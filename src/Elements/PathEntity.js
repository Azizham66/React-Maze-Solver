import BaseEntity from "./BaseEntity.js";
import pathSprite from "../assets/grassCenter.png"

export default class PathEntity extends BaseEntity{
    constructor(r,c) {
        super(r,c, true);
        this.type = 'PathEntity';
        this.sprite = pathSprite;
    }

}