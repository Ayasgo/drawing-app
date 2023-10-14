const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;

function download_image(description, paths) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let shape = new Shape(paths);
    shape.draw(ctx);
    data = canvas.toDataURL('image/png');
    a = document.createElement('a');
    a.src = data;
    a.download = description + '.png';
}



