function Player(_name, _color, _size){
    this.name = _name;
    this.color = _color;
    this.size = _size;
    this.shadowColor;
    this.isDead = false;
    this.lastPosition = {
        'x' : null,
        'y' :null,
    };
    this.points = [];
};