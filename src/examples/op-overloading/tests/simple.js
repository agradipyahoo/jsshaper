var opOverTest = function() {
    var a = new Point(4, 6);
    var b = new Point(2, 9);
    
    return {
        add: a + b,
        sub: a - b,
        div: a / b,
        mul: a * b,
        combo: a + (b - a) * a / b
    };
};
