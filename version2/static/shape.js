class Shape {
  constructor(color = "black") {
    this.color = color;
    this.paths = [];
    this.colors = [];
    this.addingPoints = false;
  }

  update(canvas, undo, reset, save) {
    this.#addCanvasEventListeners(canvas);
    this.#addButtonsEventListeners(undo, reset);
  }

  draw(ctx, {linkedPaths = true, coloredPaths = false, pointedPaths = false, r = 1.5}) {
    if (!this.paths) return;

    while (this.colors.length != this.paths.length) {
      if (this.paths.length > this.colors.length) {
        this.colors.push(getRandomColor());
      } else if (this.paths.length < this.colors.length) {
        this.colors.pop();
      }
    }

    if (linkedPaths) {
      this.paths.forEach((path, index) => {
        ctx.strokeStyle = coloredPaths ? this.colors[index] : this.color;
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        path.slice(1).forEach((point) => {
          ctx.lineTo(...point);
        });
        ctx.stroke();
      });
    }
    if (pointedPaths) {
      this.paths.forEach((path, index) => {
        ctx.fillStyle = coloredPaths ? this.colors[index] : this.color;
        path.forEach((point) => {
          ctx.beginPath();
          ctx.arc(...point, r, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    }
  }

  #addCanvasEventListeners(canvas) {
    let { x, y } = canvas.getBoundingClientRect();
    canvas.onmousedown = (ev) => {
      this.addingPoints = true;
      let path = [];
      path.push([ev.x - x, ev.y - y]);
      this.paths.push(path);
    };
    canvas.onmousemove = (ev) => {
      if (this.addingPoints) {
        this.paths[this.paths.length - 1].push([ev.x - x, ev.y - y]);
        textResponse.innerText = "";
      }
    };
    document.onmouseup = (ev) => {
      this.addingPoints = false;
    };
  }

  #addButtonsEventListeners(undo, reset) {
    undo.onclick = () => {
      if (this.paths) {
        this.paths.pop();
      }
      textResponse.innerText = "";
    };
    reset.onclick = () => {
      this.paths = [];
      textResponse.innerText = "";
    };
  }
}
