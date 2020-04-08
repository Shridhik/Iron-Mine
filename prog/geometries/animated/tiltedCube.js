/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY) {
    super();
    this.currentAngle = 0.0;
    this.size = size;
	this.centerX = centerX;
	this.centerY = centerY;
	
    this.vertices = this.generateCubeVerticesWithNormals();

    this.modelMatrix.translate(this.centerX, 0.0, this.centerY);
     this.modelMatrix.scale(1, this.size, 1);
    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

    generateCubeVerticesWithNormals() {

		function vecs_of_flat_arr(arr, n) {
			let ret = [];
			for (let i = 0; i < arr.length / n; i++) {
				let vec = [];
				for (let j = 0; j < n; j++) {
					vec.push(arr[i * n + j]);
				}
				ret.push(vec);
			}
			return ret;
		}

		let cube_vertices = [
			-1, -1, -1,  // Left side
			-1, -1, 1,
			-1, 1, 1,
			-1, 1, -1,

			-1, -1, 1,  // Front side
			1, -1, 1,
			1, 1, 1,
			-1, 1, 1,

			1, -1, 1,  // Right side
			1, -1, -1,
			1, 1, -1,
			1, 1, 1,

			1, -1, -1,  // Back side
			-1, -1, -1,
			-1, 1, -1,
			1, 1, -1,

			1, 1, 1,  // Top side
			1, 1, -1,
			-1, 1, -1,
			-1, 1, 1,

			1, -1, 1,  // Bottom side
			-1, -1, 1,
			-1, -1, -1,
			1, -1, -1
		];

		let cube_normals = [
			-1, 0, 0,  // Left side
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			0, 0, 1,  // Front side
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			1, 0, 0,  // Right side
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			0, 0, -1,  // Back side
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			0, 1, 0,  // Top side
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			0, -1, 0,  // Bottom side
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		];

		cube_vertices = vecs_of_flat_arr(cube_vertices, 3);
		cube_normals = vecs_of_flat_arr(cube_normals, 3);

		let cube_trig_vertices = [];
		let cube_trig_normals = [];

		// loop to create vertices of triangles to draw
		for (let i = 0; i < cube_vertices.length / 4; i++) {
			cube_trig_vertices[6 * i + 0] = cube_vertices[4 * i + 0];
			cube_trig_vertices[6 * i + 1] = cube_vertices[4 * i + 1];
			cube_trig_vertices[6 * i + 2] = cube_vertices[4 * i + 2];
			cube_trig_vertices[6 * i + 3] = cube_vertices[4 * i + 0];
			cube_trig_vertices[6 * i + 4] = cube_vertices[4 * i + 2];
			cube_trig_vertices[6 * i + 5] = cube_vertices[4 * i + 3];
		}
		cube_vertices = cube_trig_vertices;

		// same loop for normals
		for (let i = 0; i < cube_normals.length / 4; i++) {
			cube_trig_normals[6 * i + 0] = cube_normals[4 * i + 0];
			cube_trig_normals[6 * i + 1] = cube_normals[4 * i + 1];
			cube_trig_normals[6 * i + 2] = cube_normals[4 * i + 2];
			cube_trig_normals[6 * i + 3] = cube_normals[4 * i + 0];
			cube_trig_normals[6 * i + 4] = cube_normals[4 * i + 2];
			cube_trig_normals[6 * i + 5] = cube_normals[4 * i + 3];
		}
		cube_normals = cube_trig_normals;
        

		let ret = [];
		//every 3 points I create a vertex and I do a vertices.push 
		for (var i = 0; i < cube_vertices.length; i++) {
			var v = new Vertex();
			let p = cube_vertices[i];
			let n = cube_normals[i];
			v.points = [p[0] * 0.05, p[1] * 0.05, p[2] * 0.05];
			v.color = [red, green, blue, 1.0];
			v.normal = new Vector3([n[0], n[1], n[2]]);
			ret.push(v);
		}

		return ret;
		// Recommendations: Might want to generate your cube vertices so that their
		// x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
		// the cube to your liking better in the future.
	}
    
  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices() {
      
      function vecs_of_flat_arr(arr, n) {
			let ret = [];
			for (let i = 0; i < arr.length / n; i++) {
				let vec = [];
				for (let j = 0; j < n; j++) {
					vec.push(arr[i*n + j]);
				}
				ret.push(vec);
			}
			return ret;
		}
	
		let cube_vertices = [
			-1, -1, -1,  // Left side
			-1, -1,  1,
			-1,  1,  1,
			-1,  1, -1,
		
			-1, -1,  1,  // Front side
			 1, -1,  1,
			 1,  1,  1,
			-1,  1,  1,
		
			 1, -1,  1,  // Right side
			 1, -1, -1,
			 1,  1, -1,
			 1,  1,  1,
		
			 1, -1, -1,  // Back side
			-1, -1, -1,
			-1,  1, -1,
			 1,  1, -1,
		
			 1,  1,  1,  // Top side
			 1,  1, -1,
			-1,  1, -1,
			-1,  1,  1,
			
			 1, -1,  1,  // Bottom side
			-1, -1,  1,
			-1, -1, -1,
			 1, -1, -1
		];
		
		cube_vertices = vecs_of_flat_arr(cube_vertices, 3);
		
		let cube_trig_vertices = [];
	
		for (let i = 0; i < cube_vertices.length / 4; i++) {
				cube_trig_vertices[6*i + 0] = cube_vertices[4*i + 0];
			cube_trig_vertices[6*i + 1] = cube_vertices[4*i + 1];
			cube_trig_vertices[6*i + 2] = cube_vertices[4*i + 2];
			cube_trig_vertices[6*i + 3] = cube_vertices[4*i + 0];
			cube_trig_vertices[6*i + 4] = cube_vertices[4*i + 2];
			cube_trig_vertices[6*i + 5] = cube_vertices[4*i + 3];
		}
		cube_vertices = cube_trig_vertices;
		let ret = [];
		//every 3 points I create a vertex and I do a vertices.push 
		for(var i = 0; i < cube_vertices.length; i++) {
			var v = new Vertex();
			let p = cube_vertices[i];
			v.points = [p[0]*0.05, p[1]*0.05, p[2]*0.05];
			v.color =  [red, green, blue, 1.0];
			v.normal = new Vector3();
			ret.push(v);
	
		}
      
      return ret;
    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
 /* updateAnimation() {
    var tempMatrix = new Matrix4();
    var tempMatrix2 = new Matrix4();
    var tempMatrix3 = new Matrix4();
    var tempMatrix4 = new Matrix4();
    var tempMatrix5 = new Matrix4();
   
   
    tempMatrix4.setTranslate(this.centerX, this.centerY, this.centerX);
    tempMatrix = tempMatrix.multiply(tempMatrix4);
    
    tempMatrix3.setRotate(this.currentAngle, 0, 1, 0);
	tempMatrix = tempMatrix.multiply(tempMatrix3);
	
	tempMatrix2.setRotate(30, 1, 0, 0);
    tempMatrix = tempMatrix.multiply(tempMatrix2);
	
	tempMatrix5.setTranslate(-this.centerX, -this.centerY, -this.centerX);
    tempMatrix = tempMatrix.multiply(tempMatrix5);
	
	super.modelMatrix = tempMatrix;

	//this.currentAngle = (this.currentAngle + 2.0) % 360;

    // Recommendations: Do not simply apply a rotation matrix. Doing so will
    // cause your cube to spin in a circle around the axis you've chosen.
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }*/
}
