/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */
class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */
  constructor(size, centerX, centerY, texturePath) {
    super(size, centerX, centerY);
    this.texturePath = texturePath;
    this.generateUVCoordinates();
    

    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    
    /*for (var i = 0; i < 6; i++)
    {
		this.vertices[i*6].uv.push(1.0, 1.0);
		this.vertices[i*6 + 1].uv.push(1.0, 0.0);
		this.vertices[i*6 + 2].uv.push(0.0, 0.0);
		this.vertices[i*6 + 3].uv.push(0.0, 0.0);
		this.vertices[i*6 + 4].uv.push(0.0, 1.0);
		this.vertices[i*6 + 5].uv.push(1.0, 1.0);
	}*/
   
   // normal face
   this.vertices[0].uv.push(1.0, 1.0);
   this.vertices[1].uv.push(1.0, 0.0);
   this.vertices[2].uv.push(0.0, 0.0);
   this.vertices[3].uv.push(0.0, 0.0);
   this.vertices[4].uv.push(0.0, 1.0);
   this.vertices[5].uv.push(1.0, 1.0);
   
   // repeat twice side by side
   this.vertices[6].uv.push(2.0, 1.0);
   this.vertices[7].uv.push(2.0, 0.0);
   this.vertices[8].uv.push(0.0, 0.0);
   this.vertices[9].uv.push(0.0, 0.0);
   this.vertices[10].uv.push(0.0, 1.0);
   this.vertices[11].uv.push(2.0, 1.0);
   
    // upside down
   this.vertices[12].uv.push(0.0, 0.0);
   this.vertices[13].uv.push(0.0, 1.0);
   this.vertices[14].uv.push(1.0, 1.0);
   this.vertices[15].uv.push(1.0, 1.0);
   this.vertices[16].uv.push(1.0, 0.0);
   this.vertices[17].uv.push(0.0, 0.0);
   
   // top half
   this.vertices[18].uv.push(1.0, 1.0);
   this.vertices[19].uv.push(1.0, 0.5);
   this.vertices[20].uv.push(0.0, 0.5);
   this.vertices[21].uv.push(0.0, 0.5);
   this.vertices[22].uv.push(0.0, 1.0);
   this.vertices[23].uv.push(1.0, 1.0);
   
   // bottom half
   this.vertices[24].uv.push(1.0, 0.5);
   this.vertices[25].uv.push(1.0, 0.0);
   this.vertices[26].uv.push(0.0, 0.0);
   this.vertices[27].uv.push(0.0, 0.0);
   this.vertices[28].uv.push(0.0, 0.5);
   this.vertices[29].uv.push(1.0, 0.5);
   
   // 3x3
   this.vertices[30].uv.push(3.0, 3.0);
   this.vertices[31].uv.push(3.0, 0.0);
   this.vertices[32].uv.push(0.0, 0.0);
   this.vertices[33].uv.push(0.0, 0.0);
   this.vertices[34].uv.push(0.0, 3.0);
   this.vertices[35].uv.push(3.0, 3.0);
   
   
   
   /*this.vertices.uv = [
    
    // Front
    1.0,  1.0,
    1.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    1.0, 1.0,
    // Back
    2.0,  1.0,
    2.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    2.0, 1.0,
    // Top
    1.0,  1.0,
    1.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    1.0, 1.0,
    // Bottom
    1.0,  1.0,
    1.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    1.0, 1.0,
    // Right
    1.0,  1.0,
    1.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    1.0, 1.0,
    // Left
    1.0,  1.0,
    1.0,  0.0,
    0.0,  0.0,
    0.0,  0.0,
    0.0,  1.0,
    1.0, 1.0,
  ];
*/
    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders MultiTextureCube.
   */
  render() {
	useShader(gl, textureShader);
    
    send2DTextureToGLSL(this.texture, 0, "u_Sampler");
    sendTextureBufferToGLSL(this.vertices, 2, "a_TextureCoord");
    sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
	sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
	tellGLSLToDrawCurrentBuffer(this.vertices.length); 
    
	//create2DTexture('./external/textures/checkerboard.png', gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT, function(texture) {
     // send2DTextureToGLSL(texture, 0, 'u_Sampler')
   // });
    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value. Might want to use
  //}

}
}
