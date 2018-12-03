// Day 1: Structure of BST, why they're awesome, Add, contains, isEmpty
// Day 2: Min, Max, Size
// Day 3:  height, isBalanced
// Day 4: remove
// Day 5: traverse

var BST = function(){
	this.root = null;
}
var Node = function(val){
	this.val = val;
	this.left = null;
	this.right = null;
}
BST.prototype.min = function(){
	return this.root.min();
}

BST.prototype.size = function(){
	if(!this.root){
		return 0;
	}
	// return this.root.size()+1;
	return this.root.size();
}
Node.prototype.size = function(number){
		// if(!this.left && !this.right){
		//  	return 0;
		// }
		// else if(!this.left && this.right){
		// 	return this.right.size() + 1;
		// }
		// else if(!this.right && this.left){
		// 	return this.left.size() + 1;
		// }
		// else {
		// 	return this.left.size() + this.right.size() + 2;
		// }
		var count = 1;
		if(!this.left && !this.right){
			return 1;
		}
		if(this.left){
			count += this.left.size();
		}
		if(this.right){
			count += this.right.size();
		}
		return count;
}


BST.prototype.minAndMax = function(){
	var maxcurrent = this.root;
	var mincurrent = this.root;
	while (maxcurrent.right){
		maxcurrent = maxcurrent.right;

	}
	while(mincurrent.left){
		mincurrent = mincurrent.left;
	}
	return {"min": mincurrent.val, "max": maxcurrent.val};


}
// in-order
BST.prototype.traverse = function(){
	if(this.root == null){
		return "No tree";
	}
	return this.root.traverse()
}
// in-order
Node.prototype.traverse = function(array){
	if (array === undefined){
		array = [];
	}
	if(this.left){
		this.left.traverse(array);
	}
	// console.log(this.val);
	array.push(this.val);
	if(this.right){
		this.right.traverse(array);
	}
	return array;
}

// pre-order: parent nodes downward. List parent node, then left child and children of left child, then right child and its children

BST.prototype.preOrder = function(){
	if(this.root == null){
		return "No tree";
	}
	return this.root.preOrder();
}
Node.prototype.preOrder = function(arr = []){
	arr.push(this.val)
	if(this.left){
		this.left.preOrder(arr);
	}
	if(this.right){
		this.right.preOrder(arr)
	}
	return arr;
}

// post-order: child nodes are listed before the parent
BST.prototype.postOrder = function(){
	if(this.root == null){
		return "No tree";
	}
	return this.root.postOrder();
}

Node.prototype.postOrder = function(arr = []){
	if(this.left){
		this.left.postOrder(arr);
	}
	if(this.right){
		this.right.postOrder(arr);
	}
	arr.push(this.val);
	return arr;

}

Node.prototype.min = function(){
	if(this.left){
	return this.left.min();
	}
	if(this.left == null){
		console.log("MINIMUM FUNCTION", this.val);
		return this;
	}

}
Node.prototype.max = function(){
	if(this.right){
		return this.right.max();
	}
	if(this.right == null){
		console.log(this.val);
		return this;
	}
}

BST.prototype.isEmpty = function(){
	if(this.root==null){
		return true;
	}
	else {
		return false;
	}
}

BST.prototype.contains = function(val){
	if(this.isEmpty()){
		return false;
	}
	else {
		var current = this.root;
		while(current != null && current.val != val){
			if(val<current.val){
				current = current.left;
			}
			else{
				current = current.right;
			}

		}
		if(current != null){
			return true;
		}
		else {
			return false;
		}
	}
}

BST.prototype.containsNode = function(val){
	if(this.isEmpty()){
		return false;
	}
	else {
		return this.root.contains(val);
	}
}

Node.prototype.contains = function(val){
	if (this.val == val){
		return true;
	}
	else if (this.val > val && this.left){
		
		return this.left.contains(val);
	}
	else if (this.val < val && this.right){
		return this.right.contains(val);
	}
	return false;
}

BST.prototype.insert = function(val){
	if(this.isEmpty()){
		// console.log("it's empty");
		this.root = new Node(val);
	}
	else {
		var current = this.root;
		var inserted = false;
		while(inserted == false){
			if(val<current.val){
				// console.log("val is less than current");
				if(current.left != null){
					current = current.left;
				}
				else {
					var newNode = new Node(val);
					current.left = new Node(val);
					inserted = true;
				}
			}
			else if(val>current.val){
				// console.log("val is greater than current");
				if(current.right != null){
					current = current.right;
				}
				else {
					current.right = new Node(val);
					inserted = true;
				}
			}
			else if (val == current.val){
				var newNode = new Node(val);
				newNode.right = current.right;
				current.right = newNode;
				inserted = true;
			}
		}
	}
	return this;
}
// Node.prototype.remove = function(parent){
// 	//check if there are no children
// 	console.log("parameters", this.val, parent.val, parent.left, parent.right);
// 	if(this.left == null && this.right == null){
// 		console.log("no children");
// 		if(this.val < parent.val){
// 			console.log("left should be null");
// 			parent.left = null;
// 			return;
// 		}
// 		if(this.val > parent.val){
// 			console.log("right should be null");
// 			parent.right = null;
// 			return;
// 		}
// 	}
// 	//done with the case if there are no children
// 	//check if there is only one child to the right
// 	if(this.left == null && this.right){
// 		//check if this node is the left or the right child
// 		if(parent.left == this){
// 			parent.left = this.right;
// 			return;
// 		}
// 		if(parent.right == this){
// 			parent.right = this.right;
// 			return;
// 		}
// 	}
// 	//check if there is a child to the left
// 	if(this.right == null && this.left){
// 		if(parent.left == this){
// 			parent.left = this.left;
// 			return;
// 		}
// 		if(parent.right == this){
// 			parent.right = this.left;
// 			return;
// 		}
// 	}
// 	//done with the case if there is one child
// 	//check if there are two children
// 	if(this.left && this.right){
// 		console.log("TWO CHILDREN", this.left, this.right);
// 		var right_min = this.right.min();
// 		console.log("TWO CHILDREN RIGHT MIN", right_min);
// 		right_min.left = this.left;
// 		console.log("TWO CHILDREN RIGHT MIN LEFT", right_min.left.val);
// 		right_min.right = this.right;
// 		console.log("TWO CHILDREN RIGHT MIN RIGHT", right_min.right.val);
// 		if(parent.left == this){
// 			console.log("To the left!");
// 			parent.left = right_min;
// 			while(this != null)
// 		}
// 		else {
// 			console.log("To the right!");
// 			parent.right = right_min;
// 			this.right.min.remove(this);
// 			return;
// 		}
// 		// // if(parent.left == this){
// 		// 	parent.left = right_min;
// 		// 	return;
// 		// }else {
// 		// 	parent.right = right_min;
// 		// 	return;
// 		// }
//
// 	}
//
//
Node.prototype.remove = function(data, parentNode){
	//at the current node, parent is the node that we are currently at
	if(data < this.val){
		if(this.left != null){
			//if the value to remove is less than the value of the current node, we call this function recursively on left node
			this.left.remove(data, this);
		}
	}
	else if (data > this.val){
		if(this.right != null){
			//if the value is greater than the current node, we call this function recursively on the right
			this.right.remove(data, this);
		}//continue until we reach the node with the value we want to delete.
	}
	else {
	//two children
		if(this.left != null && this.right != null){
		//find the minimum value of the right branch, transfer the minimum value to current node.
		this.val = this.right.min().val;
		//delete the minimum node that we just duplicated, has at most one child
		this.right.remove(this.val, this);
		//if there aren't two children
	}
	else if(parentNode.left == this){//if we're to the left of the parent
		if(this.left != null) {// if there is a left child
			var tempNode = this.left;
		}
		else {//there is no left child, but there is a right child
			var tempNode = this.right;
		}
		parentNode.left = tempNode
	}
	else if(parentNode.right == this){ //if we're to the right of the parent
		if(this.left != null){
				var tempNode = this.left;
			}
			else {
				var tempNode = this.right;
			}
			parentNode.right = tempNode;
	}
}
}
BST.prototype.remove = function(valToRemove){
	if(this.root != null){
		if(this.root.val == valToRemove){
			var tempNode = new Node();
			tempNode.left = this.root;
			this.root.remove(valToRemove, tempNode);
			this.root = tempNode.left;
		}
		else {
			this.root.remove(valToRemove);
		}
	}
}

BST.prototype.height = function(){

	if(this.root == null){
		return 0;
	}
	else {
		return 1 + this.root.height()
	}
}
BST.prototype.isBalanced = function(){
	if(this.root == null){
		return "No BST";
	}
	else {
		// return this.root.isBalanced();
		return this.root.height(true)
	}
}
BST.prototype.cbal = function(){
	if(!this.root){
		return true;
	}
	return this.root.cbal();
}
Node.prototype.cbal = function(){
	if(this.left && this.right){
		if(Math.abs(this.left.height() - this.right.height() > 1)){
			return false;
		}
		if(this.left.cbal() && this.right.cbal()){
			return true;
		}
		return false;
	}
	else if (this.left){
		if(this.left.height() > 1){
			return false;
		}
	}
	else if(this.right){
		if(this.right.height() > 1){
			return false;
		}
	}
	return true;
}

Node.prototype.isBalanced = function(){
	var left = 0;
	var right = 0;
	if(this.left){
		var leftresult = this.left.isBalanced();
		if(typeof leftresult==="number"){
			left = 1 + leftresult;
		}
		else {
			return leftresult;
		}
	}
	if(this.right){
		var rightresult = this.right.isBalanced();
		if(typeof rightresult==="number"){
			right = 1 + rightresult;
		}
		else {
			return rightresult;
		}

	}
	if(Math.abs(left - right) > 1){
		return false;
	}
	return Math.max(left, right)
}

Node.prototype.height = function(balancing){
	var left = 0;
	var right = 0;
	if(this.left){
		
		left = 1;
		if(balancing === undefined){
			console.log("not balancing")
			left += this.left.height();
		}
		else {
			let lresult = this.left.height(true)
			if(lresult.where){
				return lresult;
			}
			left += lresult;
		}
		
	}
	if(this.right){
		right = 1;
		if(balancing === undefined){
			console.log("not balancing")
			right += this.right.height();
		}
		else {
			let rresult = this.left.height(true)
			if (rresult.where){
				return rresult;
			}
			right += rresult;
		}
		
	}
	if(balancing === undefined){
		console.log("not balancing")
		return Math.max(left, right);
	}
	else {
		if (Math.abs(left - right) > 1){
			console.log("not balanced")
			return {"balanced": false, "where": this.val};
		}
		console.log(Math.max(left, right))
		return Math.max(left, right);
	}

}
// BST.prototype.remove = function(val){
//
// 	if(this.root == null){
// 		return false;
// 	}
// 	if(this.contains(val)==false){
// 		console.log("it doesn't exist");
// 		return false;
// 	}
//
// 	var current = this.root;
// 	//first think about if we're removing a node with no children
// 	while(current.left != null || current.right != null){
// 		//check if val is a child of current
// 		if(val<current.val){
// 			if(current.left.val == val){
// 				current.left.remove(current);
// 				break;
// 			}
// 			current = current.left;
// 		}
// 		if(val>current.val){
// 			if(current.right.val == val){
// 				current.right.remove(current);
// 				break;
// 			}
// 			current = current.right;
// 		}
// 	}
//
// 	return this;
// }
//
// var newBST = new BST();
// newBST.insert(20);
// console.log("just a root", newBST);
// newBST.insert(15);
// console.log("15 and 21", newBST);
// newBST.insert(10);
// newBST.insert(5);
// newBST.insert(7);
// newBST.insert(12);
// newBST.insert(11);
// newBST.insert(17);
// newBST.insert(16);
// newBST.insert(18);
// newBST.insert(30);
// newBST.insert(25);
// newBST.insert(35);
// newBST.insert(32);
// newBST.insert(40);
// newBST.insert(-3);
//
// console.log("traverse", newBST.root.traverse());
// console.log("original height", newBST.height(newBST.root));
// console.log("node height", newBST.height());
// console.log("balancing", newBST.isBalanced());
// console.log(newBST.min());

BST.prototype.removal=function(val){
	if(!this.root){
		return "No tree."
	}
	if(this.root.val == val){
		// come back to removing the root
		console.log("Removing the root!")
		var pseudoparent = new Node();
		pseudoparent.left = this.root;
		var toreturn = this.root.removal(val, pseudoparent)
		this.root = pseudoparent.left;
		pseudoparent.left = null;
		return toreturn;
	}
	else {
		return this.root.removal(val);
	}

}

Node.prototype.removal = function(val, parent){
	
	if(this.val > val){
		if(this.left){
			return this.left.removal(val, this);
		}
		return "Value does not exist";
	}
	else if(this.val < val){
		if(this.right){
			return this.right.removal(val, this);
		}
		return "Value does not exist";
	}
	else {
		switch(this.relationships(parent)){
			case "LRL":
				let rightmin = this.right.minAndParent()
				if(rightmin.parent){
					rightmin.parent.left = rightmin.min.right;
					rightmin.min.right = this.right;
				}
				rightmin.min.left = this.left;
				parent.left = rightmin.min;	
				this.left = null;
				this.right = null;
				return this;
			case "LRR":
				let sidemin = this.right.minAndParent();
				if(sidemin.parent){
					sidemin.parent.left = sidemin.min.right;
					sidemin.min.right = this.right;
				}
				sidemin.min.left = this.left;
				parent.right = sidemin.min;
				this.left = null;
				this.right = null;
				return this;
			case "LL":
				parent.left = this.left;
				this.left = null;
				return this;
			case "LR":
				parent.right = this.left;
				this.left = null;
				return this;
			case "RL":
				parent.left = this.right;
				this.right = null;
				return this;
			case "RR":
				parent.right = this.right;
				this.right = null;
				return this;
			case "NL":
				parent.left = null;
				return this;
			case "NR":
				parent.right = null;
				return this;
			default:
				console.log("What went wrong with children inventory?")
		}
	}
	
}

Node.prototype.minAndParent = function(parent){
	if(this.left){
		return this.left.minAndParent(this);
	}
	if(parent){
		return {min: this, parent: parent}
	}
	return {min: this}
}
Node.prototype.relationships = function(parent){
	if(this.left && this.right){
		if(parent.left == this){
			return "LRL"; // a left child with two children
		}
		return "LRR"; // a right child with two children
		
	}
	if(this.left){
		if(parent.left == this){
			return "LL"; // a left child with a left child
		}
		return "LR"; // a right child with a left child
	}
	if(this.right){
		if(parent.left == this){
			return "RL"; // a left child with a right child
		}
		return "RR"; // a right child with a right child
	}
	if(parent.left == this){
		return "NL"; // a left child with no children
	}
	return "NR"; // a right child with no children
}



var sizeBST = new BST();

var myBST = new BST();
myBST.insert(50).insert(30).insert(60).insert(61)

sizeBST.insert(6).insert(3).insert(4).insert(8).insert(9).insert(12).insert(11).insert(2).insert(15).insert(1);   
					 // 6
			 // 3               // 8      
		//2  	  // 4                  //9
	//1										   //12
										    //11    //15

console.log("traverse", sizeBST.traverse())
console.log("preorder", sizeBST.preOrder())
console.log("postorder", sizeBST.postOrder())
// console.log(sizeBST.removal(3));

// console.log(sizeBST.removal(6));
// console.log(sizeBST.root.val);



// console.log("traverse", sizeBST.traverse())



// console.log("MINIMUM");
// newBST.root.min();
// console.log("MAXIMUM");
// newBST.root.max();
// console.log("4 to 41", newBST);


var user = "1";
switch(user) {
	case "1": console.log("one");
	default: console.log("default")
}

function Person(name){
	var counter = 0;
	var talk = function(){
		console.log("private funciton")
	}
	this.name = name;
	this.talking = function(){
		talk();
		counter ++;
		console.log("The counter ", counter)
	}
}
var counters = 0;
Person.prototype.speak = function(){
	console.log(this.__proto__);
	console.log("Speaking", counters)
}
// Person.prototype.talk = function(){
// 	console.log("Hello from prototype")
// }

// var gary = new Person("Gary")
// gary.talking();
// gary.talking();
// gary.speak();
// gary.speak();

// var gary2 = new Person("Gary2")
// gary2.talking();


