function Point2D() { 
    this.x = 3;
    this.y = 4;
}

let pt = new Point2D();
pt.x = 1;
pt.y = 2;
console.log(pt);

console.log(typeof(pt));
console.log(pt.constructor.name);

process.exit();