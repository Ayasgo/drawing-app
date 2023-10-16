const canvas = document.createElement('canvas');
const container = document.getElementById('container')
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 400;
imgsToRemove = []

function create_image(paths, name) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let shape = new Shape(paths);
    shape.draw(ctx);
    data = canvas.toDataURL('image/png');
    img = document.createElement('img');
    img.id = name;
    img.addEventListener('click', (evt) => {
        if (!imgsToRemove.includes(evt.target.id)) {
            imgsToRemove.push(name);
            evt.target.classList.add("redimg");
        } else {
             imgsToRemove = imgsToRemove.filter(item => item!=name)
             evt.target.classList.remove("redimg");
        }
        console.log(imgsToRemove);
    })
    img.src = data;
    container.appendChild(img)
}

classList = tree
for (i of Object.keys(classList)) {
  create_image(classList[i], i);
}
