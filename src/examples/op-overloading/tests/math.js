var isNumber = function() {
    // borrowed from RightJS
    return typeof(val) === 'number';
};

function Point(x, y) {
    this.init(x, y);
}
Point.prototype = {
    init: function(x, y) {
        this.x = x? x: 0;
        this.y = y? y: 0;
    },
    add: function(other) {
        return this._opTemplate(other, function(a, b) {return a + b});
    },
    sub: function(other) {
        return this._opTemplate(other, function(a, b) {return a - b});
    },
    mul: function(other) {
        return this._opTemplate(other, function(a, b) {return a * b});
    },
    div: function(other) {
        return this._opTemplate(other, function(a, b) {return a / b});
    },
    floor: function() {
        return this._opTemplate(null, function(a) {return Math.floor(a)});
    },
    round: function() {
        return this._opTemplate(null, function(a) {return Math.round(a)});
    },
    _opTemplate: function(other, op) {
        if(isNumber(other)) {
            return new Point(op(this.x, other), op(this.y, other));
        }

        if(other == null) {
            return new Point(op(this.x), op(this.y));
        }

        return new Point(op(this.x, other.x), op(this.y, other.y));
    },
    toDist: function() {
        return Math.sqrt(this.toDistSquared());
    },
    toDistSquared: function() {
        return this.x * this.x + this.y * this.y;
    },
    toAngle: function() {
        // returns vec as angle (clockwise) in rad [0, 2*PI] starting from (1, 0)
        var ret = Math.atan2(this.y, this.x);

        ret += ret < 0? 2 * Math.PI: 0;

        ret = Math.min(Math.PI * 2, ret);

        return ret - Math.PI / 2;
    },
    normalize: function() {
        return this.div(this.toDist());
    },
    invert: function() {
        return new Point(-this.x, -this.y);
    },
    toString: function() {
        return 'x: ' + this.x + ', y: ' + this.y;
    }
};

var ops = function() {
    var ret = {};
    var customTypes = [Point];
    var defaults = {
        add: function(a, b) {return a + b;},
        sub: function(a, b) {return a - b;},
        div: function(a, b) {return a / b;},
        mul: function(a, b) {return a * b;}
    };
    
    var addOp = function(op, func) {
        ret[op] = function(a, b) {
            for(var i = 0; i < customTypes.length; i++) {
                var type = customTypes[i];
                
                if(a instanceof type) {
                    return a[op](b);
                }
            }
            
            return func(a, b);
        };
    };
    
    for(var op in defaults) {
        var func = defaults[op];
        
        addOp(op, func);
    }
    
    return ret;
}();
