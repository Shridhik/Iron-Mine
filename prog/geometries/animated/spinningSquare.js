/**
 * Specifies a square which spins realtive to its center.
 *
 * @author "Your Name"
 * @this {SpinningSquare}
 */
class SpinningSquare extends Square {
  /**
   * Constructor for SpinningSquare.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   * @returns {SpinningSquare} SpinningSquare object created
   */
  constructor(size, centerX, centerY) {
    
    super(size, centerX, centerY);
	this.centerX = centerX;
	this.centerY = centerY;
	this.currentAngle = 0.0;

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a square is going
    // to need a variable to keep track of its centerX and centerY position.
  }

  /**
   * Updates the animation for spinning square. Rotates the square by spinAngle
   * relative to its center.
   */
  updateAnimation() {
    
    var tempMatrix = new Matrix4();
	var tempMatrix2 = new Matrix4();
	
	tempMatrix2.setTranslate(this.centerX, this.centerY, 0);
	tempMatrix = tempMatrix.multiply(tempMatrix2);
	
	
	tempMatrix2.setRotate(this.currentAngle, 0, 0, 1);
	tempMatrix = tempMatrix.multiply(tempMatrix2);
	
	tempMatrix2.setTranslate(-this.centerX, -this.centerY, 0);
	tempMatrix = tempMatrix.multiply(tempMatrix2);
	
	super.modelMatrix = tempMatrix; 
	
    this.currentAngle = (this.currentAngle + 2.0) % 360;

    // Recomendations: Do not simply apply a rotation matrix. Doing so will
    // cause your square to spin in a circle on screen.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
