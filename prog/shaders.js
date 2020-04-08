var VSHADER =
 'attribute vec4 a_Position;\n' +
 'attribute vec4 a_Color;\n' +
 'varying vec4 v_Color;\n' +  
 'attribute float a_PointSize;\n' +
 'uniform mat4 u_ViewMatrix;\n' +   
 'uniform mat4 u_ModelMatrix;\n' +
'uniform bool u_Clicked;\n' + // Mouse is pressed
 'uniform mat4 u_ProjMatrix;\n' + 
 'void main() {\n' +
 'v_Color = a_Color;\n' +
 ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' + // Coordinates
 ' gl_PointSize =  a_PointSize;\n' + // Set the point size
  '  if (u_Clicked) {\n' + //  Draw in red if mouse is pressed
  '    v_Color = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '  } else {\n' +
  '    v_Color = a_Color;\n' +
  '  }\n' +
 '}\n';


var FSHADER =  
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +  // uniform変数
  'void main() {\n' +
  ' gl_FragColor = v_Color;\n' + // Set the color
'}\n';


var VSHADER6_NORMAL =
 'attribute vec4 a_Position;\n' +
 'attribute vec4 a_Color;\n' +
 'attribute vec4 a_Normal;\n' +
 'varying vec4 v_Color;\n' + 
  'varying vec4 v_Normal;\n' + 
 'attribute float a_PointSize;\n' +
 'uniform mat4 u_ViewMatrix;\n' +   
 'uniform mat4 u_ModelMatrix;\n' +
 'uniform mat4 u_ProjMatrix;\n' + 
 'void main() {\n' +
 'v_Color = a_Color;\n' +
 ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' + // Coordinates
 ' gl_PointSize = a_PointSize;\n' + // Set the point size
 ' v_Normal = a_Normal;\n' +
 '}\n';

var FSHADER6_NORMAL =  
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +  // uniform変数
  'varying vec4 v_Normal;\n' +
  'void main() {\n' +
  ' gl_FragColor = v_Normal;\n' + // Set the color
'}\n';


var VSHADER6_LIGHT =
 'attribute vec4 a_Position;\n' +
 'attribute vec4 a_Color;\n' +
 'attribute vec4 a_Normal;\n' +
 'varying vec4 v_Color;\n' + 
 'varying vec3 v_Normal;\n' +
 'varying vec3 v_Position;\n' +
 'attribute float a_PointSize;\n' +
 'uniform mat4 u_ViewMatrix;\n' +   
 'uniform mat4 u_ModelMatrix;\n' +
 'uniform mat4 u_ProjMatrix;\n' +
 'uniform mat4 u_NormalMatrix;\n' + 
 
 'void main() {\n' +
 'v_Color = a_Color;\n' +
 ' gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' + // Coordinates
 ' gl_PointSize =  a_PointSize;\n' + // Set the point size
 ' v_Position = vec3(u_ModelMatrix *    a_Position);\n' +
 ' v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
 ' v_Color = a_Color;\n' + 
 '}\n';

var FSHADER6_LIGHT =  
  'precision mediump float;\n' +
  'uniform vec3 u_LightDirection;\n' +  // Position of the light source
  'uniform vec3 u_LightAmbColor;\n' +     // Light color
  'uniform vec3 u_LightDifColor;\n' +   // Ambient light color
  'uniform vec3 u_LightSpeColor;\n' +   // Ambient light color
  
  'varying vec4 v_Color;\n' +  // uniform変数
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'uniform vec3 u_eyePosition;\n' + 
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 V = normalize(v_Position - u_eyePosition);\n' +
     // Calculate the light direction and make its length 1.
  '  vec3 lightDirection = normalize(u_LightDirection);\n' + 
  '  vec3 reflectVec = reflect(-lightDirection, normal);\n' +
     // The dot product of the light direction and the orientation of a surface (the normal)
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  float specAngle = max(dot(reflectVec, V), 0.0);\n' + 
  '  vec3 specular = u_LightSpeColor * v_Color.rgb * pow(specAngle, 64.0);\n' +
  '  vec3 diffuse = u_LightDifColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_LightAmbColor * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n' +
'}\n';

/*


var PHONG_SHADER_F = 
    'precision mediump float;\n' +
  // Diffuse light
 'uniform float u_DiffuseCoefficient;\n' +
 
 // Specular light
 'uniform float u_SpecularCoefficient;\n' +
 'uniform float u_SpecularExponent;\n' + 
    
 // Vertex data 
 'varying vec3 v_Normal;\n' +
 'varying vec3 v_Position;\n' +
 'varying vec4 v_Color;\n' + 

 'void main() {\n' +
    // caluclate ambient component
 '  float ambient = u_AmbientCoefficient;\n' +
    
    // caluclate diffuse component
 '  float diffuse = u_DiffuseCoefficient * max(dot(v_Normal, u_LightDirection), 0.0);\n' + 
 
    // calculate specular component
 '  vec3 eyeVector = normalize(u_ViewPosition - vec3(v_Position));\n' + 
    
 '  vec3 bisector = normalize(eyeVector + u_LightDirection);\n' +
    
 '  float specular = u_SpecularCoefficient * pow(max(dot(v_Normal, bisector), 0.0), u_SpecularExp);\n' + 
    
 '  gl_FragColor = v_Color * (ambient + diffuse + specular);\n' + 
 '}\n';
*/