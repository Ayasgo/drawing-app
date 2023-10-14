class Shape{
    constructor(color= 'black', paths){
        this.color = color;
        this.paths = paths;
    };

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
};