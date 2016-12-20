/***************************************************************************
 * shaderback.js
 * Shader-generated backgrounds for the web
 * http://www.flypig.co.uk/shaderback
 * 
 * David Llewellyn-Jones <david@flypig.co.uk>
 * Version 0.03
 * 29th March 2015
 * 
 * Copyright (c) 2015 David Llewellyn-Jones
 * Released under the MIT license
 * 
***************************************************************************/

/***************************************************************************
 * To use, just add the following uncommented code to your HTML header
 * 
 *   <script type="text/javascript" src="shaderback.js"></script>
 *   <script type="text/javascript">
 *   window.onload = shaderback.loadURL("shader.txt"));
 *   </script>
 * 
 * Where shader.txt is the URL of your fragment shader
 * 
 * You can also use loaddiv and loadtext rather than loadURL if your shader
 * code is contained inside a script element or text variable respectively.
 * 
***************************************************************************/

var shaderback = (function () {
  "use strict";

  var canvas;
  var gl;
  var shaderProgram;
  var squareVertexPositionBuffer;
  var squareVertexTextureCoordBuffer;
  var pixelScale = 2.0;
  var running = false;
  var debug = false;

  var vsCode = "\n"
    + "  precision highp float;\n"
    + "\n"
    + "  attribute vec3 aVertexPosition;\n"
    + "  attribute vec2 aTextureCoord;\n"
    + "\n"
    + "  uniform vec3 iResolution;\n"
    + "  varying vec2 fragCoord;\n"
    + "\n"
    + "  void main(void) {\n"
    + "    fragCoord = aTextureCoord * iResolution.xy;\n"
    + "    gl_Position = vec4(aVertexPosition, 1.0);\n"
    + "  }\n"
    + "\n";
  var fsCode;

  var vsShadertoyHead = "\n"
    + "  precision highp float;\n"
    + "\n"
    + "  varying vec2 fragCoord;\n"
    + "  uniform vec3 iResolution;\n"
    + "  uniform float iGlobalTime;\n"
    + "  const vec2 iMouse = vec2(0.0, 0.0);\n"
    + "\n"
    + "  void mainImage (out vec4 fragColor, in vec2 fragCoord);\n"
    + "\n"
    + "  void main () {\n"
    + "  	 mainImage(gl_FragColor, fragCoord);\n"
    + "  	 gl_FragColor.a = 1.0;\n"
    + "  }\n"
    + "\n";

  function resize() {
    var width = canvas.clientWidth / pixelScale;
    var height = canvas.clientHeight / pixelScale;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.height = window.innerHeight + "px";
    }
  }

  function ready() {
    var success = true;
    var div = document.createElement('div');
    div.innerHTML = '<canvas class="shaderback" id="shaderback" width="500px" height="500px" style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: -1;"></canvas>';
    var elements = div.childNodes[0];
    document.getElementsByTagName('body')[0].appendChild(elements);
    canvas = document.getElementById("shaderback");
    
    if (!canvas) {
      success = false;
      if (debug) {
        alert("Canvas creation failed");
      }
    }
    
    return success;
  }

  function initGL(canvas) {
    var success = true;
    try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (ignore) {
      if (debug) {
        alert("No WebGL context");
      }
      success = false;
    }

    return success;
  }

  // Type should be either gl.FRAGMENT_SHADER or gl.VERTEX_SHADER
  function compileShader(str, type) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      if (debug) {
        alert(gl.getShaderInfoLog(shader));
      }
      shader = null;
    }

    return shader;
  }

  function initShaders() {
    var success = true;
    var fragmentShader = compileShader(fsCode, gl.FRAGMENT_SHADER);
    var vertexShader = compileShader(vsCode, gl.VERTEX_SHADER);

    if (fragmentShader) {
      shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
    }

    if (fragmentShader && gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
      gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

      shaderProgram.iGlobalTime = gl.getUniformLocation(shaderProgram, "iGlobalTime");
      shaderProgram.iResolution = gl.getUniformLocation(shaderProgram, "iResolution");
    }
    else {
      if (debug) {
        alert("Could not initialise shaders");
      }
      success = false;
    }
    
    return success;
  }

  function initBuffers() {
    var success = true;
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    var vertices = [
      1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
      1.0, -1.0,  0.0,
      -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;

    squareVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
    var textureCoords = [
      1.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      0.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    squareVertexTextureCoordBuffer.itemSize = 2;
    squareVertexTextureCoordBuffer.numItems = 4;
    
    return success;
  }

  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  function drawScene() {
    var timeNow = new Date().valueOf() / 1000.0;
    requestAnimFrame(drawScene);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform1f(shaderProgram.iGlobalTime, timeNow % 18000);

    gl.uniform3f(shaderProgram.iResolution, canvas.clientWidth, canvas.clientHeight, 1.0);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, squareVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
  }

  function initEvents() {
    window.addEventListener('resize', function(event) {
      resize();
    });
    
    return true;
  }

  function start() {
    if (!running) {
      running = ready();
      resize();
      if (running) running = initGL(canvas);
      if (running) running = initShaders();
      if (running) running = initBuffers();
      if (running) running = initEvents();
      if (running) drawScene();
    }
    else {
      running = initShaders();
    }
  }

  function getShaderScript(id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
      return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
      if (k.nodeType === 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }
    return str;
  }
  
  function setDebug(active) {
    debug = active;
  }

  function loadURL(url) {
    if (url) {
      var client = new XMLHttpRequest();
      client.open('GET', url);
      client.overrideMimeType("text/plain; charset=x-user-defined");
      client.onloadend = function () {
        fsCode = client.responseText;
        start();
      };
      client.send();
    }
  }

  function loaddiv(id) {
    fsCode = getShaderScript(id);
    start();
  }

  function loadtext(text) {
    fsCode = text;
    start();
  }

  function loadshadertoy(shaderID) {
    if (shaderID) {
      var client = new XMLHttpRequest();
      client.open('GET', "https://www.shadertoy.com/api/v1/shaders/" + shaderID + "?key=rdHKwN");
      client.onloadend = function () {
      	var obj = JSON.parse (client.responseText);
      	if (obj.Shader) {
          fsCode = vsShadertoyHead + obj.Shader.renderpass[0].code;
          start();
        }
        else if (debug) {
          alert ("Shadertoy error: " + (obj.Error ? obj.Error : "Unknown response"));
        }
      };
      client.send();
    }
  }

  return {
    loadURL : loadURL,
    loaddiv : loaddiv,
    loadtext : loadtext,
    loadshadertoy : loadshadertoy,
    setDebug : setDebug
  };
}());
