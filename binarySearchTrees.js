// A binary search tree points to a root node.

function BST(){
	this.root = null;

	// root 10
		 // right 20
		    // right 25

	this.rebal = function(){
		if(!this.root){
			return false;
		}
		if(this.root.right && !this.root.left && this.root.right.right){
			//rotate left
			this.root.right.left = this.root;
			this.root = this.root.right;
			this.root.left.right = null;
			return;
		}
				   // root 20
			// left 15
		// left 10
		if(this.root.left && !this.root.right && this.root.left.left){
			// rotate right
			this.root
		}
	}

	//When a user wants to find out if the tree is empty, we'll return either true (is empty) or false (not empty)
	this.isEmpty = function(){
		//if the root is null, the tree is empty and return true, it is empty
		if(this.root == null){
			return true;
		}
		//otherwise, return false, because the tree has a root.
		return false;
	}
	this.size = function(){
		if(this.root){
			return this.root.size();
		}
		return 0;
	}
	this.findvals = function(){
		if(!this.root){
			return 0;
		}
		return this.root.findvals();
	}
	this.isValid = function(){
		if(this.isEmpty()){
			return "Empty tree";
		}
		if(this.root.left && this.root.right){
			if(this.root.left.isValidLeft(this.root.val) && this.root.right.isValidRight(this.root.val)){
				return true;
			}
			else {
				return false;
			}
		}
		return "Gonna do this later";
	}

	//When a user wants to add a value to the tree, the user will provide the value to be added
	this.insert = function(val){
		//check if the tree is empty
		if(this.isEmpty()){
			// if the tree is empty, we'll have to make a root node, which will have the value that we want to insert
			this.root = new Node(val);
			//returning "this" makes it possible to chain BST methods
			return this;
		}
		// if the tree is not empty, we'll have to find out where it goes. We can just make the nodes handle this, so pass this job off to the root node.
		this.root.insert(val);
		// returning 'this' allows for method chaining
		return this;
	}

	//When a user wants to find the node that contains a certain value, we'll return the node that contains that value if it can be found
	this.contains = function(val){
		// check if the tree is empty
		if(this.isEmpty()){
			//if it's empty, it doesn't have the desired node, so return false
			return false;
		}
		// if the tree is not empty, we'll tell the nodes to find report back which one has the desired value (if it exists)
		return this.root.contains(val);
	}

	//When a user wants to find the minimum value, we'll return the node with the minimum value
	this.min = function(){
		if(this.isEmpty()){
			return "Empty tree"
		}
		return this.root.min();
	}
	//When a user wants to find the maximum value, we'll return the node with the maximum value
	this.max = function(){
		if(this.isEmpty()){
			return "Empty tree"
		}
		return this.root.max();
	}

	//When a user wants to find out the height of the tree, we'll return the length of the longest branch.
	this.height = function(){
		if(this.isEmpty()){
			return 0
		}
		return 1 + this.root.height();
	}

	//When a user wants to find out if the tree is balanced, we'll return true or false
	this.isBalanced = function(){
		if(this.isEmpty()){
			return "Empty tree"
		}
		//We'll just use the existing height function, but we'll pass in a parameter so that it knows it's not doing the regular height function
		if(this.root.height("balancing") == "unbalanced"){
			// if it comes back with "unbalanced", we'll know we're unbalanced and can return false
			return false;
		}
		// if it doesn't come back with "unbalanced", it would come back with a number, so we're balanced and can return true
		return true;
	}

	// When a user wants to remove a node with a given value, we'll return the updated tree so that method chaining can be possible. If the user passes in a value that does not exist within the tree, we'll return an error message
	this.remove = function(val){
		if(this.isEmpty()){
			return "Empty tree"
		}
		// what if the user wants to remove our tree's root?
		if(this.root.val == val){
			// the root does not have a parent, so we'll need to make one for it. It doesn't matter what value it has or whether the root will be to the left or right, we just need it to pose as a parent. Here, we'll make a dummy node with no value. But it's still a node.
			var parentnode = new Node();
			parentnode.left = this.root;
			// now we'll call the remove function on the root, and pass in parentnode as the parent

			this.root.remove(val, parentnode);

			// after this function runs, we'll have some other node as the parentnode's left child. Whatever it is, it's our new root.

			this.root = parentnode.left;


		}
		else {
			// if the user does not want to remove the tree's root, then we'll just call the remove function on the root
			if (typeof this.root.remove(val) == "string") {
				// there is a chance that the user passed in an invalid value, so here we'll check if we got an error message back, and then just return that message
				return this.root.remove(val);
			}
		}
		// If we can get through to here without returning an error message, then returning 'this' allows us to chain methods. The remove function just manipulates our tree, so when we return 'this' after calling the remove function on the node, we'll be returning our updated tree.
		return this;

	}

	// When a user wants to see all the values in the BST from min to max, we'll return an array that contains all the values from minimum to maximum
	this.traverse = function(){
		if(this.isEmpty()){
			return "Empty tree"
		}
		// pass this on to the root node's traverse method
		return this.root.traverse();
	}

	// This is a starter for when the user wants to rebalance the tree. In this case, we'll be able to handle a few cases:
	// 1. If we find a node that has a height of 2 on the right and 0 on the left
	// 		1a. If we find node -> right -> right (and that's it, no other children nodes anywhere)
	//			This case would require a rotateLeft
	// 		1b. If we find node -> right -> left
	// 			This case would require a rotateRightLeft
	// 2. If we find a node that has a height of 2 on the left and 0 on the right
	// 		2a. If we find node -> left -> left
	//			This case would require a rotateRight
	// 		2b. If we find node -> left -> right
	//			This case would require a rotateLeftRight
	// This won't fix all unbalanced issues, but it's a start!
	this.rebalance = function(){
		if(this.isEmpty()){
			return "No tree";
		}
		//We'll start by finding a node that satisfies one of the four cases we can handle. Once we know which case we have, we'll know which rotation to do. Make the nodes do all this.
		this.root.rebalance();
		//returning "this" allows us to chain methods
		return this;
	}

}

// A node is created when a user passes in a value that they want the node to contain. It can keep track of two nodes, a left node and a right node. Its left node must have a value less than its own value. Its right node's value can be either greater than or equal to its own value.

function Node(val){
	this.val = val;
	this.left = null;
	this.right = null;
	this.findvals = function(){
		var left = 0;
		var right = 0;
		if(this.left){
			left = this.left.findvals();
		}
		if(this.right){
			right = this.right.findvals();
		}
		return 1 + left + right;
	}
	this.size = function(){
		if(!this.left && !this.right){
			return 1;
		}
		else if(!this.left){
			return 1 + this.right.size();
		}
		else if(!this.right){
			return 1 + this.left.size();
		}
		else{
			return 1 + this.right.size() + this.left.size();
		}
	}
	this.isValidLeft = function(maxval){
		if(this.val > maxval){
			return false;
		}
		if(this.left){
			if(this.left.val < this.val && this.left.val < maxval){
				this.left.isValidLeft(maxval);
			}
			else {
				return false;
			}
		}
		if(this.right){
			if(this.right.val > this.val && this.right.val < maxval){
				this.right.isValidLeft(maxval);
			}
			else {
				return false;
			}
		}
		return true;
	}
	this.isValidRight = function(minval){
		if(this.val < minval){
			return false;
		}
		if(this.left){
			if(this.left.val < this.val && this.left.val >= minval){
				this.left.isValidRight(minval);
			}
			else {
				return false;
			}
		}
		if(this.right){
			if(this.right.val >= this.val && this.right.val >= minval){
				this.right.isValidRight(minval);
			}
			else {
				return false;
			}
		}
		return true;
	}
	//when someone calls on the bst to insert a value, the bst passes this job on to the nodes
	this.insert = function(val){
		//check if the value to insert is less than the current node's value
		if(val < this.val){
			//if the value to insert is less than this node's value, check if it has a node to the left
			if(this.left){
				// if there is a left node, pass the job off to it
				this.left.insert(val);
			}
			else {
				//if there is no left, then we found out where we should put our new node.
				this.left = new Node(val);
			}
		}
		//if te value is not less than the current node's value, then it is either greater than or equal to it, which means it belongs to the right
		else {
			if(this.right){
				// if there is a node to the right, pass the job on to it
				this.right.insert(val);
			}
			else {
				// if there isn't a node to the right, we found out where to put our new node.
				this.right = new Node(val);
			}
		}
	}

	//When someone calls on the bst to find a node with a certain value, the bst passes this job on to the nodes
	this.contains = function(val){
		// if the node has the desired value, return back itself
		if(this.val == val){
			return this;
		}
		// we'll have to check if the desired value is less than this node's value
		if (val < this.val){
			//and then we'll have to check if the node has a left
			if(this.left){
				//if we have a left, pass the job on to it
				return this.left.contains(val);
			}
		}
		// if the desired value is greater than this node's value
		else {
			if (this.right){
				//if we have a right, we'll pass the job on to it
				return this.right.contains(val);
			}
		}
		//if nothing else returned, we failed to find the desired value
		return false;
	}

	//When someone calls on the bst to find the node with the minimum value, the bst passes this job on to the nodes
	this.min = function(){
		if(this.left){
			// if there's something to the left, just pass the job on to the left
			return this.left.min();
		}
		// if there's nothing to the left, we found the minimum value. pass this node back.
		return this;

	}
	//When someone calls on the bst to find the node with the maximum value, the bst passes this job on to the nodes
	this.max = function(){
		if(this.right){
			// if there's something to the right, just pass the job on to the right
			return this.right.max();
		}
		// if there's nothing to the right, we found the maximum value. Pass this node back.
		return this;
	}
	//We're using the height function for two different purposes: To either return the height of the longest branch of the tree, or to determine whether the tree is balanced.
	// For a tree to be balanced, each node must be balanced, meaning that the height on the left and right cannot differ by more than 1.
	//When someone calls on the bst to find the height, the bst calls on the root node's height function without passing an argument
	//When someone calls on the bst to find out if it's balanced or not, the bst passes this job on to its root's height function with an argument
	this.height = function(bal){
		// we'll keep count of the lefts and rights, starting the count off at 0
		var left = 0;
		var right = 0;
		// when there's a left node
		if(this.left){
			// TO FIND THE HEIGHT:
			if(bal === undefined){
				// if there's something to the left, this ups our left count to 1, plus whatever height that left node has
				left = 1 + this.left.height();
			}
			// TO FIND OUT IF IT'S BALANCED:
			else {
				//we'll try running the height function with "balancing" as an argument on the left. If it returns "unbalanced", we know that there was an unbalanced node somewhere, so the whole tree is unbalanced. We won't care about the height anymore, just return "unbalanced".
				if(this.left.height("balancing") == "unbalanced") {
					return "unbalanced";
				}
				// if we don't get false back, we got the height back. So we'll make our left count 1 plus whatever height was just returned.
				left = 1 + this.left.height("balancing");
			}
		}
		// when there's a right node
		if(this.right){
			// TO FIND THE HEIGHT:

			if(bal === undefined){
				// if there's a node to the right, this ups our right count to 1, plus whatever height that right one has
				right = 1 + this.right.height();
			}

			// TO FIND OUT IF IT'S BALANCED:

			else {
				//we'll try running the height function with "balancing" as an argument on the right. If it returns "unbalanced," we know that there was an unbalanced node somewhere, so the whole tree is unbalanced. We won't care about the height anymore, just return "unbalanced".
				if(this.right.height("balancing")=="unbalanced"){
					return "unbalanced";
				}
				// if we don't get false back, we got the height back. So we'll make our right count 1 plus whatever height was just returned.
				right = 1 + this.right.height("balancing");
			}

		}
		// at the end, we'll need to return the height, which is the max between left and right

		// TO FIND THE HEIGHT:
		if(bal === undefined){
			// we're only interested in the max height, so return whichever is bigger, left or right
			return Math.max(left, right);
		}
		// TO FIND OUT IF IT'S BALANCED:
		else {

			// before we know what we want to return, we'll check if our difference between left and right is bigger than 1
			if(Math.abs(left-right) > 1){
				// if the difference is bigger than 1, we're unbalanced. Return "unbalanced"
				return "unbalanced"
			}
			else {
				// if the difference is 0 or 1, we're balanced, and can return our max height.
				return Math.max(left, right)
			}
		}
	}
	// The bst passes the remove function off to the nodes. The node will either manipulate its pointers as to remove the desired node or return an error message if the user's desired value cannot be found.
	this.remove = function(val, parent){
		// start off by checking if the node's value is less than the value desired.
		if(this.val < val){
			//check to make sure we are able to continue
			if(this.right){

			 // We need to try again on the right node. Send this node in as the parent.
			 if(typeof this.right.remove(val, this) === "string"){
			 	// If it comes back with an error message, then we'll need to return that the value was not found.
			 	return "Value not found."
			 }
			}
			else {
				// if there is no right node, that means the user passed in a value that does not exist in our tree
				return "Value not found."
			}

		}
		else if(this.val > val){
			//check to make sure we are able to continue
			if(this.left){
				// We need to try again on the leftt node. Send this node in as the parent.
				if(typeof this.left.remove(val, this) === "string"){
					// If it comes back with an error message, then we'll need to return that the value was not found.
					return "Value not found."
				}
			}
			else {
				// if there is no right node, that means the user passed in a value that does not exist in our tree
				return "Value not found."
			}
		}
		else {
			//this block is for when this node's value is neither less than nor greater than the value we're looking for. Meaning that THIS IS THE NODE WE'RE LOOKING FOR!
			//We need to find out a couple things about this node
			// 1. Does it have children? If so, how many? Left? Right? Left and right?
			// 2. This node is a child itself. Is it a left child or right child?

			// LET'S START WITH WHEN THE NODE HAS NO CHILDREN
			if(!this.left && !this.right){
				// find out if we're a left child or right child
				if(parent.left == this){
					// we'll set the parent's left to null
					parent.left = null;
				}
				else if(parent.right == this){
					// we'll set the parent's right to null
					parent.right = null;
				}
				// we can just return because we're all done, no need to run through the rest of the function
				return
			}
			// ONE CHILD
			// WHAT IF THE NODE HAS A LEFT CHILD AND NO RIGHT CHILD?
			else if (this.left && !this.right){
				// we'll still need to find out if we're a left child or right child
				if(parent.left == this){
					// we'll tell our parent that we'll no longer be the left child. Instead, we'll tell the parent that it's new left child will be our left child.
					parent.left = this.left;
				}
				else if(parent.right == this){
					// same for if we're the right child, our parent's new right child will be our left child
					parent.right = this.left;
				}
				//and now we're done! return, we don't need to run through the rest of the function
				return
			}
			// WHAT IF THE NODE HAS A RIGHT CHILD AND NO LEFT CHILD???
			else if (this.right && !this.left){
				//we'll see if we're the left child or right child
				if(parent.left == this){
					//we'll tell our parent that it's new left child will be our right child
					parent.left = this.right;
				}
				else if(parent.right == this){
					//same for if we're the right child, our parent's new right child will be our right child
					parent.right = this.right;
				}
				//and now we're done! return, we don't need to run through the rest of the function
				return
			}
			// TWO CHILDREN, WHAT IF WE HAVE TWO CHILDREN??
			else if(this.left && this.right){
				// we'll don't want to lose any children, so the node will stay in place, we just need to change its value to be bigger than anything found to its left, and smaller than anything found to its right. Meaning one option is to find the minimum value found to the right of this node and change its value to that value. We'll use the right child's min function to do this.
				var temp = this.right.min();
				//reassign this node's value to temp's value
				this.val = temp.val
				// so now this node's val has been changed, but keep in mind, we now have two nodes in our tree that have the value found by our min function (in other words, the temp.val). So now we call remove again in order to remove the value currently found in this node, but limiting ourself to the subtree that's found to the right of our current node, passing in this node as the parent.
				this.right.remove(this.val, this);
				// since we are looking for the minimum value fouund in this subtree, we know for sure that the desired node does not have a left child. It will finish up either with one of the "one child" cases or the "no children" case.
			}
		}
	}
	// The bst passes the traverse function off to the nodes. The nodes return an array with the values arranged in order.
	this.traverse = function(arr){
		// we want to return an array with all the values from minimum to maximum, so if we don't have that array yet, let's start it off as an empty array
		if(arr === undefined){
			arr = [];
		}
		if (this.left){
			// if the node has a left node, we want to keep traveling down until we find the smallest value, passing our array along with it
			this.left.traverse(arr);
		}
		// once the node gets something returned to it by the node that it called upon, it can continue to this step, where it will push its value into the array
		arr.push(this.val);
		// once the node gets here, it will need to check if it has anything to the right
		if(this.right){
			// the right node will now do its traverse. Its traverse method will first check everything to the left. The node is stuck here until something gets returned back to it by the node that it calls in.
			this.right.traverse(arr);
		}
		// Once the node finally gets here, it will return the array to whichever node called it, allowing that node to proceed through the function. The root node, of course, will return back to the tree, and the tree will return back to the user.
		return arr;
	}
	// The bst passes off the rebalance function to the nodes. The nodes will check whether they meet on of our four conditions that we can handle, then manipulate their pointers to be balanced.
	this.rebalance = function(){
		//Check for the first situation, node -> right -> right
		if(this.right && this.right.right && !this.left && !this.right.left){
			// in this case, we know we'll need to do a rotateLeft

			this.rotateLeft();
			// we're done here, no need to continue on with the rest of the function, so return
			return
		}
		// Check for the second situation, node -> right -> left
		else if(this.right && this.right.left && !this.left && !this.right.right){

			this.rotateRightLeft();
			// we're done here
			return
		}
		// Check for the third situation, node -> left -> left
		else if(this.left && this.left.left && !this.right && !this.left.right){

			this.rotateRight();
			return
		}
		// Check for the fourth situation, node -> left -> right
		else if (this.left && this.left.right && !this.right && !this.left.left){

			this.rotateLeftRight();
			return;
		}
		// if none of the above cases were dealt with, then we'll continue down the tree
		if(this.left){
			this.left.rebalance();
		}
		if(this.right){
			this.right.rebalance();
		}


	}
	// this function is only called when we have node -> right -> right
	this.rotateLeft = function(){
		// First, we'll make the node's right child its left child as well.
		this.left = this.right;
		// Second, we'll reassing the node's right to be its right's right
		this.right = this.right.right;
		// At this point, this node has a left child and a right child. But its left child also still has a right child, and we need to get rid of that to avoid circles in our BST.
		this.left.right = null;
		// Now we just need to fix the values. We moved this node's original right child to now be the left child, so these values should switch places.
		var temp = this.val;
		this.val = this.left.val;
		this.left.val = temp;
		//and now we're all done!
		return;

	}
	// this function is only called when we have node->left->left
	this.rotateRight = function(){
		//First, we'll make the node's left child its right child as well
		this.right = this.left;
		//Second, we'll reassign the node's node's left child to be its left's left
		this.left = this.left.left;
		//At this point, this node has a left child and a right child. But its right child also still has a left child, and we need to get rid of that to avoid circles in our BST.
		this.right.left = null;
		// Now we just need to fix the values. We moved this node's original left child to now be the right child, so these values should switch places.
		var temp = this.val;
		this.val = this.right.val;
		this.right.val = temp;
		return;
	}
	// this function is only called when we have node -> right -> left
	this.rotateRightLeft = function(){
		//first thing we'll do is swap the values of the middle and last nodes.
		var temp = this.right.val;
		this.right.val = this.right.left.val;
		this.right.left.val = temp;
		// now we'll swing the last node over to be to the right of the middle node
		this.right.right = this.right.left;
		// get rid of the pointer that still makes the last node the middle node's left child
		this.right.left = null;
		// so at this point we just have node -> right -> right and the values are all in order. So we want to do a rotate left!
		this.rotateLeft();
		return;
	}
	// this function is only called when we have node -> left -> right
	this.rotateLeftRight = function(){
		// first we'll swap the values of the middle and last nodes.
		var temp = this.left.val;
		this.left.val = this.left.right.val;
		this.left.right.val = temp;
		//second, we swing the last node over to be to the left of the middle node
		this.left.left = this.left.right;
		//get rid of the pointer that still makes the last node the middle node's right child
		this.left.right = null;
		// now we're in familiar territory, we just have a node -> left -> left, wth all the values in order. Do a rotate right!
		this.rotateRight();
		return;
	}

}

var myBST = new BST();
myBST.insert(50).insert(30).insert(60).insert(61).insert(33)
console.log("got my bst vals", myBST.findvals());

// .insert(40).insert(60).insert(70).insert(80);

var sizeBST = new BST();
sizeBST.insert(6).insert(3).insert(4).insert(8).insert(9).insert(12).insert(2).insert(15).insert(1);

console.log("balancing", sizeBST.isBalanced());
console.log("should be balanced", myBST.isBalanced())
var yourBST = new BST();
yourBST.root = new Node(50);
yourBST.root.left = new Node(25);
yourBST.root.right = new Node(55);
yourBST.root.right.left = new Node(35);
// console.log(yourBST.isValid());
console.log(sizeBST.size());
console.log(yourBST.traverse())

function foo() {
	for (var i = 0; i < arguments.length; i++) {
	  console.log(arguments[i]);
	}
  }
