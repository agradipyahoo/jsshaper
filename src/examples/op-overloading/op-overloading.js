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
    
    return Shaper.traverseTree(root, {
        pre: function(node, ref) {
            for(var op in ops) {
                var template = Shaper.parseExpression('$ ' + op + ' $');
                var func = ops[op];

                if(Shaper.match(template, node)) {
                    var call = Shaper.parseExpression(prefix + func + '($, $)');

                    Shaper.replace(call, node.children[0], node.children[1]);
                    Shaper.cloneComments(call, node);

                    return ref.set(call);
                }
            }       
        }
    });
});
