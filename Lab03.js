"use strict";
var gl;
var points;
init();
function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('web12');
    if( !gl ) { alert("WebGl isn't availible"); }

    points=[vec2(0.0,0.0),
        vec2(-0.95,-0.95),
        vec2(0.95,-0.95)
    ];
    points.push(vec2(0,0.95));

    gl.viewport(0,0,canvas.Width, canvas.height);
    gl.clearcolor(1.0,1.0,1.0,1.0);
    var program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation( program, "aposition");
    gl.vertexAttribPointer( positionLoc, 2 , gl.FLOAT, false, 0 , 0);
    gl.enableVertexAttribArray( positionLoc);

    render();
};
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT);
    gl.drawArrays( gl.POINTS, 0 , points.length);
}