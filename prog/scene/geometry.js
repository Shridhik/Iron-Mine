/**
 * Specifies a geometric object.
 *
 * @author Nishith Modi
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.viewMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.modelMatrix = new Matrix4();
    this.shader = null; // shading program you will be using to shade this geometry
    this.texture = null; 
    this.light = 2.3;
    this.flag = false;
    this.x = 0;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    
    var normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(this.modelMatrix);
    normalMatrix.transpose();
      
    if (useNormalShader)
    {
        useShader(gl, normalShader);
    }
    else
    {
        useShader(gl, lightShader);
    }    
    
    sendUniformMatToGLSL(normalMatrix, "u_NormalMatrix");
    sendVertexBufferToGLSL(this.vertices, 3, "a_Position");
    sendColorBufferToGLSL(this.vertices, 4, "a_Color");
    sendNormalBufferToGLSL(this.vertices, 3, "a_Normal");
	sendUniformMatToGLSL(this.modelMatrix, "u_ModelMatrix");
	tellGLSLToDrawCurrentBuffer(this.vertices.length);
/*
    if(this.flag == true){
      if(this.light < -2.3){
        this.flag = false;
      }
      else{
        this.light = this.light - 0.1;
      }
    }

    if(this.flag == false){
      if(this.light > 2.3){
        this.flag = true;
      }
      else{
        this.light = this.light + 0.1;   
      }
    }*/     
      this.x+=0.1;
    
      
    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}
