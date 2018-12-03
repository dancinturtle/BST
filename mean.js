function BST(){
    this.root = null;
}
function Node(val){
    this.value = val;
    this.left = null;
    this.right= null;
}
BST.prototype.insert = function(val){
    if(!this.root){
        this.root = new Node(val);
        return this;
    }
    var runner = this.root;
    while(runner){
        if(val < runner.value){
            if(runner.left){
                runner = runner.left;
            }
            else {
                runner.left = new Node(val);
                return this;
            }
        }
        else {
            if(runner.right){
                runner = runner.right;
            }
            else {
                runner.right = new Node(val);
                return this;
            }
        }
    }
}
BST.prototype.insert2 = function(val){
    if(!this.root){
        this.root = new Node(val);
        return this;
    }
    this.root.insert(val);
    return this;
}
Node.prototype.insert = function(val){
    if(val < this.value){
        if(this.left){
            this.left.insert(val);
        }
        else {
            this.left = new Node(val);
        }
    }
    else {
        if(this.right){
            this.right.insert(val);
        }
        else {
            this.right = new Node(val);
        }
    }
}
// var first = new BST();
// first.insert(30).insert(50).insert(40).insert(10);
// console.log(first.root);

var second = new BST();
second.insert2(40).insert2(20).insert2(25).insert2(50);
console.log(second);
