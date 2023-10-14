const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;

function download_image(description, paths) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let shape = new Shape(paths);
    shape.draw(ctx);
    data = canvas.toDataURL('image/png');
    a = document.createElement('a');
    a.href = data;
    a.download = description + '.png';
    a.click()
}





