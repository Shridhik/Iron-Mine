/**
 * A tilted cube that has a checkerboard texture applied to it. A subclass of
 * TiltedCube. ***REPRESENTS ALL CUBES WITH SAME TEXTURE STYLE ON EACH FACE
 *
 * @author Nishith Modi
 * @this {CheckerCube}
 */
class CheckerCube extends TiltedCube {
  /**
   * Constructor for CheckerCube
   *
   * @constructor
   * @returns {CheckerCube}
   */
  constructor(size, centerX, centerY) {
	super(size, centerX, centerY);
    this.generateUVCoordinates();

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    
    for (var i = 0; i < 6; i++)
    {
		this.vertices[i*6].uv.push(1.0, 1.0);
		this.vertices[i*6 + 1].uv.push(1.0, 0.0);
		this.vertices[i*6 + 2].uv.push(0.0, 0.0);
		this.vertices[i*6 + 3].uv.push(0.0, 0.0);
		this.vertices[i*6 + 4].uv.push(0.0, 1.0);
		this.vertices[i*6 + 5].uv.push(1.0, 1.0);
	}
    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders CheckerCube.
   */
  render() {
    useShader(gl, textureShader);
    
    send2DTextureToGLSL(this.texture, 0, "u_Sampler");
    sendTextureBufferToGLSL(this.vertices, 2, "a_TextureCoord");
    sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
	sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
	tellGLSLToDrawCurrentBuffer(this.vertices.length); 
    

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value.
  }
}
