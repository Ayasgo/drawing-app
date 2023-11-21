class Shape{
    constructor(color= 'black'){
        this.color = color;
        this.paths = [];
        this.addingPoints = false;
    };

    update(canvas, undo, reset, save){
        this.#addCanvasEventListeners(canvas);
        this.#addButtonsEventListeners(undo, reset, save);
    }

    draw(ctx){
        if(! this.paths) return;

        ctx.styleStroke = this.color;
        this.paths.forEach(path=>{
            ctx.beginPath();
            ctx.moveTo(...path[0]);
            path.slice(1).forEach(point=>{
                ctx.lineTo(...point);
            })
            ctx.stroke();
        })  
    };

    #addCanvasEventListeners(canvas){
        let {x, y} = canvas.getBoundingClientRect();
        canvas.onmousedown=ev=>{
            this.addingPoints = true;
            let path = [];
            path.push([ev.x-x, ev.y-y])
            this.paths.push(path);
        };
        canvas.onmousemove=ev=>{
            if(this.addingPoints){
                this.paths[this.paths.length-1].push(
                    [ev.x-x, ev.y-y]
                );
            } 
        };
        document.onmouseup=ev=>{
            this.addingPoints=false;
        };
    };

    #addButtonsEventListeners(undo, reset, save){
        undo.onclick=()=>{
            if(this.paths) this.paths.pop();
        };
        reset.onclick=()=>{
            this.paths = [];
        };
        save.onclick=()=>{
            let data = {
                'paths': this.paths
            };
            $.ajax({
                'url': '/',
                'method': 'post',
                'dataType': 'json',
                'contentType': 'application/json',
                'data': JSON.stringify(data),
                'success': function(){
                    console.log('success');
                },
                'error': function(xhr, status, error){
                    console.log('error', error);
                }
            });
        };
    };
};