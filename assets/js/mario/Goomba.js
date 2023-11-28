import GameEnv from './GameEnv.js';
import Character from './Character.js';

const GoombaAnimation = {
    // Sprite properties
    scale: 1,
    width: 128,
    height: 110,
    i: { row: 12, frames: 15 }, // jump key
	j: { row: 3, frames: 7, idleFrame: { column: 7, frames: 0 } }, // Walk left key
    k: { }, // no action
	l: { row: 2, frames: 7, idleFrame: { column: 7, frames: 0 } }, // Walk right key
}

export class Goomba extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio){
        super(canvas, 
            image, 
            speedRatio,
            GoombaAnimation.width, 
            GoombaAnimation.height, 
            GoombaAnimation.scale
        );
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = GoombaAnimation.l;
        this.pressedDirections = {};
    }

    setAnimation(animation) {
        this.setFrameY(animation.row);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }i
    
    // check for matching animation
    isAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = !this.isIdle;
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle);
        if (result) {
                this.stashFrame = key;
        }
        return result;
    }

    // check for gravity based animation
    isGravityAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = (!this.isIdle && GameEnv.bottom <= this.y);
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle && GameEnv.bottom <= this.y);
        //var result = (this.frameY === key.row && !this.isIdle && GameEnv.bottom <= this.y);
        if (result) {
            return true;
        }
        if (GameEnv.bottom <= this.y) {
            this.setAnimation(this.stashFrame);
        }
        return false;
    }
    
    // Player perform a unique update
    update() {
        if (this.isAnimation(GoombaAnimation.j)) {
            this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation(GoombaAnimation.l)) {
            this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation(GoombaAnimation.i)) {
            this.y -= (GameEnv.bottom * .33);  // jump 33% higher than floor
        } 
        
        // Perform super update actions
        super.update();
    }
    collisionAction() {
        console.log("collision detected")
        this.destroy()
    }
}


// Can add specific initialization parameters for the player here
// In this case the player is following the default character initialization
export function initGoomba(canvas, image, gameSpeed, speedRatio){
    // Create the Player
    var goomba = new Goomba(canvas, image, gameSpeed, speedRatio);

    
    
    /* Player Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (GoombaAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const key = event.key;
            if (!(event.key in goomba.pressedDirections)){
                goomba.pressedDirections[event.key] = GoombaAnimation[key].row;
            }
            goomba.isIdle = false;
            goomba.setAnimation(GoombaAnimation[key]);
        }
    });

    document.addEventListener('keyup', function (event) {
        if (GoombaAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const key = event.key;
            if (event.key in goomba.pressedDirections){
                delete goomba.pressedDirections[event.key];
            }
            goomba.isIdle = true;
            goomba.setAnimation(GoombaAnimation[key]);
        }
    });

    // Player Object
    return goomba;
}

export default Goomba;