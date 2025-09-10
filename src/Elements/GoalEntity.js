import TopEntity from "./TopEntity.js";
import goalSprite from "../assets/flagRed.png"

export default class GoalEntity extends TopEntity {
    constructor(r,c) {
        super(r,c)
        this.type = "GoalEntity"
        this.sprite = goalSprite
    }
}