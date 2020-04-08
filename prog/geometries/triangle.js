/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    
    super();
	this.generateTriangleVertices(size, centerX, centerY);

    // Recommendations: Remember that Triangle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices(size, centerX, centerY) {
    
    var vertex1 = new Vertex();
	vertex1.points.push(centerX, centerY+size, 0);
	if (rainbow)
		vertex1.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex1.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex1);
	
	var vertex2 = new Vertex();
	vertex2.points.push(centerX-size, centerY-size, 0);
	if (rainbow)
		vertex2.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex2.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex2);
	
	var vertex3 = new Vertex();
	vertex3.points.push(centerX+size, centerY-size, 0);
	if (rainbow)
		vertex3.color.push(Math.random(), Math.random(), Math.random(), 1.0);
	else
		vertex3.color.push(red.value, green.value, blue.value, 1.0);
	this.vertices.push(vertex3);

    // Recommendations: Might want to call this within your Triangle constructor.
    // Keeps your code clean :)
  }
}
