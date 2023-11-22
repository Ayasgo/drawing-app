const canvas = document.getElementById("myCanvas");
const options = {
                  simple: document.getElementById('simple'),
                  colordPaths : document.getElementById('colordPaths'),
                  points : document.getElementById('points')
                };
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 500;
let shape = new Shape();
const textResponse = document.getElementById("response"),
  undo = document.getElementById("undo"),
  save = document.getElementById("save"),
  reset = document.getElementById("reset"),
  predict = document.getElementById("predict");

animate();
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shape.update(canvas, undo, reset, save);
  shape.draw(ctx);
  requestAnimationFrame(animate);
}

function loadButtonsEventListeners(save, predict) {
  save.onclick = () => {
    let data = {
      paths: shape.paths,
    };
    $.ajax({
      url: "/",
      method: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        console.log("success");
      },
      error: function (xhr, status, error) {
        console.log("error", error);
      },
    });
  };
  predict.onclick = () => {
    let data = {
      paths: shape.paths,
    };
    $.ajax({
      url: "/predict",
      method: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        console.log("success", response.class);
        textResponse.innerText = response.class;
      },
      error: function (xhr, status, error) {
        console.log("error", error);
      },
    });
  };
}

uncheckedOptions = ()=>{
  for( const option in options){
   options[option].parentNode.classList.add('unchecked');
  }
}

function optionsEventListeners(){
  for( const option in options) {
    opt = options[option];    
    opt.addEventListener('change', function(){
      uncheckedOptions();
      this.parentNode.classList.remove('unchecked');
      console.log(11)
    });
  }
}
loadButtonsEventListeners(save, predict);
optionsEventListeners()