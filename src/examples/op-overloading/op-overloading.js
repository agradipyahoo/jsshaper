"use strict"; "use restrict";

var Shaper = Shaper || require("shaper.js") || Shaper;

Shaper("op-overloading", function(root) {
    var prefix = 'ops.';
    var ops = {
        '+': 'add',
        '-': 'sub',
        '/': 'div',
        '*': 'mul'
    };
    // cache expressions here
    // Note that "call" may not be cached since it is mutable.
    var exprs = function() {
        var ret = [];
        
        for(var op in ops) {
            var func = ops[op];
            
            ret.push({
                from: Shaper.parseExpression('$ ' + op + ' $'),
                func: func
            });
        }
        
        return ret;
    }();
    
    return Shaper.traverseTree(root, {
        pre: function(node, ref) {
            for(var i = 0; i < exprs.length; i++) {
                var expr = exprs[i];
                
                if(Shaper.match(expr.from, node)) {
                    var callExpr = prefix + expr.func + '($, $)';
                    var call = Shaper.parseExpression(callExpr);

                    Shaper.replace(call, node.children[0], node.children[1]);
                    Shaper.cloneComments(call, node);

                    return ref.set(call);
                }
            }       
        }
    });
});