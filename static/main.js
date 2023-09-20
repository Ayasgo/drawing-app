const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 500;
let shape = new Shape();
const   undo = document.getElementById("undo"),
        save = document.getElementById("save"),
        reset = document.getElementById("reset");

animate();
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shape.update(canvas, undo, reset, save);
    shape.draw(ctx);
    requestAnimationFrame(animate);
};


function animate2(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shape.update(canvas, undo, reset, save);
    shape.draw(ctx);
    requestAnimationFrame(animate);
};
