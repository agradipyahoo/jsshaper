var opOverTest = function() {
    var a = new Point(4, 6);
    var b = new Point(2, 9);
    
    return {
        add: ops.add(a, b),
        sub: ops.sub(a, b),
        div: ops.div(a, b),
        mul: ops.mul(a, b),
        combo: ops.add(a, ops.div(ops.mul((ops.sub(b, a)), a), b))
    };
};