/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  constructor(radius, segments, centerX, centerY) {
	super();
	this.generateCircleVertices(radius, segments, centerX, centerY);

    // Recommendations: Remember that Circle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Circle.
   *
   * @private
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  generateCircleVertices(radius, segments, centerX, centerY) {
    
    var angle = (2*Math.PI)/segments;

	var vertex1 = new Vertex();
	vertex1.points.push(centerX, centerY, 0);
	if (rainbow)
		vertex1.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex1.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex1);
	
	var vertex2 = new Vertex();
	vertex2.points.push(centerX+Math.cos(0)*radius, centerY+Math.sin(0)*radius, 0);
	if (rainbow)
		vertex2.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex2.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex2);
	
    for (var i = angle; i < 2*Math.PI; i += angle)
	{
		
		var vertex3 = new Vertex();
		vertex3.points.push(centerX+Math.cos(i)*radius, centerY+Math.sin(i)*radius, 0);
		if (rainbow)
			vertex3.color.push(Math.random(), Math.random(), Math.random(), 1.0);
		else
			vertex3.color.push(red.value, green.value, blue.value, 1.0);
		this.vertices.push(vertex3);
		
		var vertex4 = new Vertex();
		vertex4.points.push(centerX, centerY, 0);
		if (rainbow)
			vertex4.color.push(Math.random(), Math.random(), Math.random(), 1.0);
		else
			vertex4.color.push(red.value, green.value, blue.value, 1.0);
		this.vertices.push(vertex4);
		
		var vertex5 = new Vertex();
		vertex5.points.push(centerX+Math.cos(i)*radius, centerY+Math.sin(i)*radius, 0);
		if (rainbow)
			vertex5.color.push(Math.random(), Math.random(), Math.random(), 1.0);
		else
			vertex5.color.push(red.value, green.value, blue.value, 1.0);
		this.vertices.push(vertex5);
		
	}
	
	var vertex6 = new Vertex();
	vertex6.points.push(centerX+Math.cos(2*Math.PI)*radius, centerY+Math.sin(2*Math.PI)*radius, 0);
	if (rainbow)
		vertex6.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex6.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex6);

    // Recommendations: Might want to call this within your Circle constructor.
    // Keeps your code clean :)
  }
}
