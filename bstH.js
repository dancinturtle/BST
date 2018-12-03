(function(){
    BST = function() {
        this.root = null;
        this.length = 0;
        this.empty = true;
    }
    Node = function(val, parent) {
        this.value = val;
        this.left = null;
        this.right = null;
        if (parent !== undefined) {
            this.parent = parent;
        } else {
            this.parent = null;
        }
    }
    BST.prototype.isEmpty = function() {
        if (!this.head) {
            return true;
        }
        return false;
    }
    BST.prototype.insert = function(val) {
        if (this.empty) {
            this.root = new Node(val);
        } else {
            this.root.add(val);
        }
        this.length++;
        if (this.empty) {
            this.empty = false;
        }
        return this;
    }
    BST.prototype.find = function(val) {
        if (this.empty) {
            return false;
        } else {
            return this.root.isVal(val);
        }
    }
    BST.prototype.removeMin = function(node, parent, direction) {
        if (!node.left) {
            parent[direction] = node.right;
            return node;
        } else if (node.left.left) {
            return this.removeMin(node.left, node, 'left');
        } else if (!node.left.left) {
            parent[direction] =  node.left;
            return node;
        }
    }
    BST.prototype.toArray = function() {
        var arr = [];
        if (this.root) {
            this.root.appendToArr(arr);
        }
        return arr;
    }
    
    BST.prototype.reBalance = function(arr) {
        if (arr.length == 0) {
            this.root = null;
        } else if (arr.length == 1) {
            this.root = new Node(arr[0]);
        } else if (arr.length > 1) {
            // console.log('-- Arr Length > 1');
            var middle = Math.floor(arr.length/2),
                left = arr.slice(0,middle),
                right = arr.slice(middle+1, arr.length),
                leftMid = Math.floor(left.length/2),
                rightMid = Math.floor(right.length/2);
            this.root = new Node(arr[middle]);

            this.root.left = new Node(left[leftMid]);
            this.root.right = new Node(right[rightMid]);

            this.root.left.reBal(left);
            this.root.right.reBal(right);
        }
        return this;
    }
    BST.prototype.isBal = function() {
        if (this.root) {
            return this.root.isBal();
        }
    }
    BST.prototype.numChild = function(node) {
        if (node.left && node.right) {
            return 2;
        } else if ((node.left && !node.right) || (!node.left && node.right)) {
            return 1;
        } else {
            return 0;
        }
    }
    
    BST.prototype.remove = function(val, curr, parent) {
    };
    Node.prototype.isBal = function () {
        // if (Math.abs(this.left.height - this.right.height) > 1) {
        //     return false;
        // } else {
        //     var left;
        //     var right;
        //     if (left) {
        //         left = left.isBal()
        //     } else {
        //         right = right.isBal();
        //     }
        //     if (both left and right) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    };
    BST.prototype.height = function () {
        if (!this.root) { return 0; }
        else {
            return 1 + this.root.height();
        }
    };
    Node.prototype.height = function () {
        var left  = 0,
            right = 0;

        if (this.left) {
            left = 1;
            left += this.left.height();
        }
        if (this.right) {
            right = 1;
            right += this.right.height();
        }

        return Math.max(left, right);
    };



    Node.prototype.reBal = function(arr) {
        // console.log('>>> ReBal')
        if (arr.length > 1) {
            var middle = Math.floor(arr.length/2),
                left = arr.slice(0,middle),
                right = arr.slice(middle+1, arr.length)
                leftMid = Math.floor(left.length/2),
                rightMid = Math.floor(right.length/2);
            if (left[leftMid]) {
                this.left = new Node(left[leftMid], this);
            }
            if (right[rightMid]) {
                this.right = new Node(right[rightMid], this);
            }

            if (left[leftMid]) {
                this.left.reBal(left);
            }
            if (right[rightMid]) {
                this.right.reBal(right);
            }
        } else {
            // console.log('<><><><><>Else:',arr[0]);
            if (arr[0]!==undefined && arr[0] < this.value) {
                // console.log(arr[0]);
                this.left = new Node(arr[0], this);
            } else if(arr[0]!==undefined && arr[0] > this.value){
                // console.log(arr[0]);
                this.right = new Node(arr[0], this);
            }
        }
    }
    Node.prototype.add = function(val) {
        // console.log('CURRENT VAL:',this.value)
        if (val < this.value) {
            if (!this.left) {
                // console.log('Current:',this.value,'Left:',val);
                this.left = new Node(val, this);
            } else {
                // console.log('Current:',this.value,'Left:','add');
                this.left.add(val, this);
            }
        } else {
            if (!this.right) {
                // console.log('Current:',this.value,'Right:',val);
                this.right = new Node(val, this);
            } else {
                // console.log('Current:',this.value,'Right:','add');
                this.right.add(val, this);
            }
        }
    }
    Node.prototype.appendToArr = function(arr) {
        if (this.left) {
            this.left.appendToArr(arr);
        }
        arr.push(this.value);
        if (this.right) {
            this.right.appendToArr(arr);
        }
    }
    Node.prototype.isVal = function(val) {
        if (!this) {
            return false;
        } else if (this.value == val) {
            return this;
        } else if (this.value > val && this.left) {
            return this.left.isVal(val);
        } else if (this.value < val && this.right) {
            return this.right.isVal(val);
        }
        return false;
     }
})()

bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(13);
bst.insert(16);
bst.insert(3);
bst.insert(18);
bst.insert(17);
bst.insert(2);
// bst.remove(10);
// bst.remove(2);
console.log(bst.height());


// for (var i = 0; i < 500000; i++) {
//     BST.insert(Math.floor(Math.random()*100));
// }
// console.log(BST);
// console.log('----------------------------------------\n');
// console.log(BST.toArray());
// console.log('FIND:',BST.find(5));
// console.log('----------------------------------------\n');
// console.log(BST.toArray());
// console.log('Head:',BST.root.value);
// var start = Date.now();
// BST.reBalance(BST.toArray());
// var end = Date.now();
// console.log('_-_-_-_-_-_-_ReBal-Time_-_-_-_-_-_-_',end-start);
// document.getElementById('header').innerHTML = end-start;
// console.log(BST.toArray());
// console.log('Head:',BST.root.value);


// var bst = new BST();
// bst.insert(10);
// console.log(bst.root);
// console.log(bst.toArray());
