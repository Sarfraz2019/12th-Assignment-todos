var list = document.getElementById("list")

firebase.database().ref('todos').on('child_added',function(data){
 
// create text node
var li = document.createElement("li");
   var inputText = document.createTextNode(data.val().value)
   li.appendChild(inputText)
  list.appendChild(li);

    


   


    // create delete button 
 var delBtn = document.createElement("button")
 delBtn.setAttribute('class', 'remove');
 delBtn.setAttribute('id', data.val().key);

 
   var delText = document.createTextNode('')
 delBtn.appendChild(delText)
 var icon1 = '<i class="fas fa-minus-circle"></i>'
 delBtn.innerHTML = icon1


// create edit button
var editBtn = document.createElement("button")
editBtn.setAttribute('class', 'edit');
editBtn.setAttribute('id', data.val().key);


var editText = document.createTextNode('')
editBtn.appendChild(editText)
var icon = '<i class="far fa-edit"></i>'
editBtn.innerHTML = icon
// editBtn.appendChild(editText)






  // append button to li
    li.appendChild(delBtn)
    li.appendChild(editBtn)

    delBtn.setAttribute("onclick","deleteItem(this)")
    editBtn.setAttribute("onclick","editItem(this)")
   
    
})








function addTodo(){

   
    var todoItem = document.getElementById("toDo")
 if (todoItem.value === '') {
      alert("You must write something!");
    }  

else{
   var database = firebase.database().ref('todos');
var key = database.push().key;
var todo = {
   value : todoItem.value,
   key: key
}

database.child(key).set(todo)

}

    todoItem.value = ""
}













 //  we can write any other character for parameter except e ..#i.e  a,b,c ...x,y,z
function deleteItem(e){

  firebase.database().ref('todos').child(e.id).remove()
   e.parentNode.remove()
}




function editItem(e){
 
   var val = e.parentNode.firstChild.nodeValue;
   var editValue = prompt("Enter edit Value",val)
   var editTodo = {
      value: editValue,
      key: e.id
   }
  firebase.database().ref('todos').child(e.id).set(editTodo)
   e.parentNode.firstChild.nodeValue= editValue
}






function dltAll(){
   firebase.database().ref('todos').remove()
   list.innerHTML = ""
}