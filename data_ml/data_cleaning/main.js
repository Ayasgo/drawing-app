const canvas = document.createElement('canvas');
const container = document.getElementById('container')
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;
imgsToRemove = []

function download_image(paths, name) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let shape = new Shape(paths);
    shape.draw(ctx);
    data = canvas.toDataURL('image/png');
    img = document.createElement('img');
    img.addEventListener('click', () => {
        if (!(name in imgsToRemove)) {
            imgsToRemove.push(name);
            this.classList.add("redimg");
        } else {
             imgsToRemove.push(name);
             this.classList.add("redimg");
        }
    })
    img.src = data;
    container.appendChild(img)
}
download_image(car['1'], )





