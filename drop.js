function Drop(x,y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;

this.show = function() {
    noStroke();
    fill(150, 0, 255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
}

this.evaporate = function() {
    this.toDelete = true;
}

this.hits = function(invader) {
    var d = dist(this.x, this.y, invader.x, invader.y)
    if (d < this.r + invader.r) {
        return true;
    } else {
        return false;
    }

}

this.move = function() {
    this.y = this.y-5;
}

}