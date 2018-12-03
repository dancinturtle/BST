// make a BST
function BST(){
  this.root = null;
}
// make a node
function Node(val){
  this.val = val;
  this.right = null;
  this.left = null;
}

// isEmpty
BST.prototype.isEmpty = function(){
  if(this.root){
    return false;
  }
  return true;
}

// traverse
BST.prototype.traverse = function(){
  if(this.root){

    this.root.traverse();
  }
  else {
    console.log("There is no root");
    return false;
  }
  // return arr.join(", ");
}

Node.prototype.traverse = function(){
  if(this.left){
    this.left.traverse();
  }
  console.log(this.val);
  if(this.right){
    this.right.traverse();
  }
}

// add a node
BST.prototype.add = function(val){
  if(this.root){
    this.root.add(val);
  }
  else {
    this.root = new Node(val);
  }
  return this;
}
Node.prototype.add = function(val){
  // find out if we should go left or right
  if(this.val <= val){
    if(this.right){
      this.right.add(val);
    }
    else {
      this.right = new Node(val);
    }
  }
  else {
    if(this.left){
      this.left.add(val);
    }
    else {
      this.left = new Node(val);
    }
  }
  return this;
}

// contains

BST.prototype.contains = function(val){
  if(this.root){
    return this.root.contains(val);
  }
  return "Empty BST";
}
Node.prototype.contains = function(val){
  if(val == this.val){
    return this;
  }
  if(val < this.val){
    if(this.left){
      return(this.left.contains(val))
    }
    return "Not found"
  }
  if(val > this.val){
    if(this.right){
      return(this.right.contains(val));
    }
    return "Not found"
  }
}

// min
BST.prototype.min = function(){
  if(this.root){
    return this.root.min();
  }
  return "Empty BST";
}
Node.prototype.min = function(){
  if(this.left){
    return this.left.min();
  }
  return this.val;
}

// max
BST.prototype.max = function(){
  if(this.root){
    return this.root.max();
  }
  return "Empty BST";
}
Node.prototype.max = function(){
  if(this.right){
    return this.right.max();
  }
  return this.val;
}

//height
BST.prototype.height = function(){
  if(this.root){
    return 1 + this.root.height();
  }
  return "Empty BST";
}
Node.prototype.height = function(){
  var left = 0;
  var right = 0;
  if(this.left){
    left = 1 + this.left.height();
  }
  if(this.right){
    right = 1 + this.right.height();
  }
  return Math.max(left, right);

}

// remove
BST.prototype.remove = function(val){
  if(!this.root){
    return "Empty BST";
  }
  if(this.root.val == val){
    var pseudoparent = new Node("pseudo");
    console.log("root issues, pseudoparent val", pseudoparent.val)
    pseudoparent.left = this.root;
    this.root = this.root.remove(val, pseudoparent);
    return;
  }
  if(val < this.root.val){
    if(this.root.left){
      return this.root.left.remove(val, this.root);
    }
  }
  if(val > this.root.val){
    if(this.root.right){
      return this.root.right.remove(val, this.root);
    }
  }
}
Node.prototype.remove = function(val, parent){
  if(val<this.val){
    if(this.left){
      return this.left.remove(val, this);
    }
    else {
      return "Not found";
    }
  }
  if(val > this.val){
    if(this.right){
      return this.right.remove(val, this);
    }
    else {
      return "Not found";
    }
  }
  if(val == this.val){
    if(!this.right && !this.left){
      if(parent.left == this){
        parent.left = null;
        if(parent.val == "pseudo"){
            return parent.left;
        }
        return;
      }
      if(parent.right == this){
        parent.right = null;
        return;
      }
    }
    if(this.right && !this.left){
      if(parent.left == this){
        parent.left = this.right;
        this.right = null;
        if(parent.val == "pseduo"){
          return parent.left;
        }
        return;
      }
      if(parent.right == this){
        parent.right = this.right;
        this.right = null;
        return;
      }
    }
    if(this.left && !this.right){
      if(parent.left == this){
        parent.left = this.left;
        this.left = null;
        if(parent.val == "pseudo"){
          return parent.left;
        }
        return;
      }
      if(parent.right == this){
        parent.right = this.left;
        this.left = null;
        return;
      }
    }
    // two children
    if(this.left && this.right){
      console.log("Two children!", this.right.val, this.left.val, parent.val);
      // find the min to the right;
      var subparent = this.right;
      var current = this.right;
      while(current.left){
        subparent = current;
        current = current.left;
      }
      subparent.left = null;
      if(current.right){
        subparent.left = current.right;
      }
      current.right = this.right;
      current.left = this.left;
      if(parent.left == this){
        parent.left = current;
        if(parent.val == "pseudo"){
          console.log("pseudo parent")
          return parent.left;
        }
      }
      if(parent.right == this){
        parent.right = current;
      }
    }
  }
}

BST.prototype.isBalanced = function(){
  if(!this.root){
    return "No root";
  }
  if(this.root.isBalanced() === false){
    return false;
  }
  return true;
}

Node.prototype.isBalanced = function(){
  var left = 0;
  var right = 0;
  if(this.left){
    if(this.left.isBalanced() === false){
      return false;
    }
    left = 1 + this.left.isBalanced();
  }
  if(this.right){
    if(this.right.isBalanced() === false){
      return false;
    }
    right = 1 + this.right.isBalanced();
  }
  if(Math.abs(left-right)>1){
    console.log("max achieved")
    return false;
  }
  return(Math.max(left, right));
}

var myBST = new BST();
var yourBST = new BST();
yourBST.add(5).add(4).add(6).add(8).add(20)

// console.log(myBST.isEmpty());
myBST.add(20).add(10).add(5).add(15).add(30).add(24).add(22).add(21).add(23).add(27).add(25).add(29).add(26).add(35).add(32).add(40);
myBST.traverse();
// console.log(myBST);
// console.log(myBST.isEmpty());
// console.log(myBST.contains(22));
// console.log(myBST.traverse());
//
// // console.log(myBST.height());
// console.log("removing 20", myBST.remove(20));
// console.log(myBST.traverse());
// console.log(myBST.root.val);
// console.log("myBST balanced?", myBST.isBalanced());
// console.log("yourBST balanced?", yourBST.isBalanced());
