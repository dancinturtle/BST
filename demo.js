function BST(){
    this.root = null;
}
function BTNode(val){
    this.val = val;
    this.left = null;
    this.right = null;
}

BST.prototype.add = function(val){
    if(!this.root){
        this.root = new BTNode(val);
    }
    else {
        this.root.add(val);
    }
    return this;
}
BTNode.prototype.add = function(val){
    if(this.val < val){
        if(this.right){
            this.right.add(val);
        }
        else {
            this.right = new BTNode(val);
        }
    }
    else {
        if(this.left){

            this.left.add(val);
        }
        else {
            this.left = new BTNode(val);
        }
    }
}
var mybst = new BST();
mybst.add(3).add(5).add(7).add(2);
console.log(mybst);