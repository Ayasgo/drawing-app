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

  draw(ctx, coloredPaths = false, pointedPaths = true) {
    if (!this.paths) return;

    while (this.colors.length != this.paths.length) {
      if (this.paths.length > this.colors.length) {
        this.colors.push(getRandomColor())
      } else if (this.paths.length < this.colors.length) {
        this.colors.pop();
      }

    }
    if (coloredPaths) {
      this.paths.forEach((path, index) => {
        ctx.strokeStyle = this.colors[index];
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        path.slice(1).forEach((point) => {
          ctx.lineTo(...point);
        });
        ctx.stroke();
      });
    } else if (pointedPaths) {
      ctx.strokeStyle = this.color;
      this.paths.forEach((path) => {
        ctx.beginPath();
        path.forEach((point) => {
          ctx.arc(...point, 1, 0, 2 * Math.PI);
        });
        ctx.stroke();
      });
    } else {
      ctx.strokeStyle = this.color;
      this.paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(...path[0]);
        path.slice(1).forEach((point) => {
          ctx.lineTo(...point);
        });
        ctx.stroke();
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
        };
      textResponse.innerText = "";
    };
    reset.onclick = () => {
      this.paths = [];
      textResponse.innerText = "";
    };
  }
}
