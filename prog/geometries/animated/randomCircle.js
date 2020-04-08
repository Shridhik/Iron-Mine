/**
 * Specifies a circle which moves randomly.
 *
 * @author "Your Name"
 * @this {RandomCircle}
 */
class RandomCircle extends Circle {
  /**
   * Constructor for RandomCircle.
   *
   * @constructor
   * @param {Number} radius The radius of the random circle being constructed
   * @param {Integer} segements The number of segments composing the circle
   * @param {Number} centerX The x-position of the circle being constructed
   * @param {Number} centerY The y-position of the circle being constructed
   * @returns {RandomCircle} RandomCircle object created
   */
  constructor(radius, segments, centerX, centerY) {
    
    super(radius, segments, centerX, centerY);
	this.radius = radius;
	this.centerX = centerX;
	this.centerY = centerY;
	this.randomX = ((Math.random()*2)-1);
	if (this.randomX < 0)
	{
		this.randomX + 5*this.radius;
	}
	else
	{
		this.randomX - 5*this.radius;
	}
	this.randomY = ((Math.random()*2)-1);
	if (this.randomY < 0)
	{
		this.randomY + 5*this.radius;
	}
	else
	{
		this.randomY - 5*this.radius;
	}
	
	this.x = 0;
	this.y = 0;

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, a circle is going
    // to need a variable to keep track of the direction the circle is moving.
  }

  /**
   * Updates random circle's animation. Changes modelMatrix into a translation
   * matrix translating into a random direction.
   */
  updateAnimation() {
    
    var tempMatrix = new Matrix4();
    
    tempMatrix.setTranslate(this.x, this.y, 0);
    
    super.modelMatrix = tempMatrix;
    
    if (Math.abs(this.centerX - this.randomX) < 0.01)
    {
		this.randomX = ((Math.random()*2)-1);
		if (this.randomX < 0)
		{
			this.randomX + 5*this.radius;
		}
		else
		{
			this.randomX - 5*this.radius;
		}
	}
	
    else if (this.randomX < this.centerX)
    {
		this.x -= 0.01;
		this.centerX -= 0.01;
    }
    else
    {
		this.x += 0.01;
		this.centerX += 0.01;
	}
	
	if (Math.abs(this.centerY - this.randomY) < 0.01)
	{
		this.randomY = ((Math.random()*2)-1);
		if (this.randomY < 0)
		{
			this.randomY + 5*this.radius;
		}
		else
		{
			this.randomY - 5*this.radius;
		}
	}
	else if (this.randomY < this.centerY)
    {
		this.y -= 0.01;
		this.centerY -= 0.01;
    }
    else 
    {
		this.y += 0.01;
		this.centerY += 0.01;
	}

    // Recomendations: Refer to README.txt for more detalied recommendations
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }

}
