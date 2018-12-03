# no duplicates allowed
class BST:
    def __init__(self):
        self.root = None
    def isValid(self):
        if self.root == None:
            return False
        result = self.root.isValid()
        if result == False:
            return result
        return True
    def find(self, val):
        if self.root == None:
            return None
        runner = self.root
        while runner != None:
            if runner.val == val:
                return runner
            if val > runner.val:
                runner = runner.right
            else:
                runner = runner.left
        return None
    def insert(self, val):
        if self.root == None:
            self.root = Node(val)
            return self
        runner = self.root
        while True:
            if val > runner.val:
                if runner.right != None:
                    runner = runner.right
                else:
                    runner.right = Node(val)
                    return self 
            elif val < runner.val:
                if runner.left != None:
                    runner = runner.left
                else:
                    runner.left = Node(val)
                    return self
            else:
                raise ValueError("This value already exists in this BST")
    def traverseInOrder(self):
        if self.root == None:
            return None
        return self.root.traverseInOrder()
    def remove(self, val):
        if self.root == None:
            return None
        removeRoot = False
        if self.root.val == val:
            removeRoot = True
        fakeParent = Node(0)
        fakeParent.right = self.root
        removedNode = self.root.remove(val, fakeParent)
        if removedNode == None:
            print(f"Node with value {val} not found")
        else:
            print("removed this node", removedNode.val)
        if removeRoot == True:
            self.root = fakeParent.right
        return removedNode
    def height(self):
        if self.root == None:
            return 0
        return self.root.height()

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
    def isValid(self, lb=None, rb=None):
        # check left
        if self.left != None:
            if (self.left.val < self.val and rb == None) or (self.left.val < self.val and self.left.val > rb):
                left = self.left.isValid(self.val, rb)
                if left == False:
                    return left
            else:
                return False
        if self.right != None:
            if (self.right.val > self.val and lb == None) or (self.right.val > self.val and self.right.val < lb):
                right = self.right.isValid(lb, self.val)
                if right == False:
                    return right
            else:
                return False
        return True
            
        


    def height(self):
        if self.left == None and self.right == None:
            return 1
        left = 0
        right = 0
        if self.left != None:
            left = self.left.height()
        if self.right != None:
            right = self.right.height()
        if left > right:
            return left + 1
        return right + 1 
    def traverseInOrder(self, result = ""):
        if self.left != None:
            result = self.left.traverseInOrder(result)
        if result != "":
            result += ", "
        result += str(self.val)
        if self.right != None:
            result = self.right.traverseInOrder(result)
        return result
    def remove(self, val, parent):
        if val > self.val:
            if self.right != None:
                return self.right.remove(val, self)
            else:
                return None
        elif val < self.val:
            if self.left != None:
                return self.left.remove(val, self)
            else:
                return None
        elif self.val == val:
            if self.right == None and self.left == None:
                if parent.left == self:
                    parent.left = None
                else:
                    parent.right = None
                return self
            elif self.left == None:
                if parent.left == self:
                    parent.left = self.right
                else:
                    parent.right = self.right
                self.right = None
                return self
            elif self.right == None:
                if parent.left == self:
                    parent.left = self.left
                else:
                    parent.right = self.left
                self.left = None
                return self
            else:
                runner = self.right
                while runner.left != None:
                    runner = runner.left
                removedNode = self.remove(runner.val, parent)
                if parent.left == self:
                    parent.left = removedNode
                else:
                    parent.right = removedNode
                removedNode.left = self.left
                removedNode.right = self.right
                self.left = None
                self.right = None
                return self




a = BST()
one = Node(30)
two = Node(20)
three = Node(50)
four = Node(10)
five = Node(25)
six = Node(22)
seven = Node(31)
a.root = one
one.left = two
one.right = three
two.left = four
two.right = five
five.left = six
five.right = seven
print(a.isValid())



