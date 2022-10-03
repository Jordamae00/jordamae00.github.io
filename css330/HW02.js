var canvas;
var gl;
var positions;
var numTimesToSubdivide = 0;
var bufferId;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    points=[
        vec2(0.0,0.75),
        vec2(0.25,0.75),
        vec2(0.30,0.75),
    ]
    
    var vertices = [
        -0.5,-0.2,0.0,
        -0.9,-0.2,0.0,
    ]

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3,6), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

        document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};

function line(a, b)
{
    positions.push(a,b);
}

function divLine(a, b, count)
    {


    if (count == 0) {
           
            line(a, b)
    }
    else {
        var sqrt3d2 = 0.87;
        var pos1 = mix(a,b,0.33);
        var pos2 = mix(a,b,0.67);
    
        var len = pos2[0] - pos1[0];
        var top = vec2(pos1[0]+len/2,len*sqrt3d2);
       
        --count;
       
        divLine(a,pos1,count);
        positions.push(top)
        divLine(pos2,b,count);
        

    }
}

function render()
{
    var vertex =[vec2(-1.0,0.0),vec2(1.0,0.0)];
    positions=[];
    divLine(vertex[0],vertex[1],numTimesToSubdivide);
    

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINE_STRIP, 0, positions.length );
    positions=[];
   
}

