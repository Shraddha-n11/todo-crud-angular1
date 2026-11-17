import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Itodo} from 'src/app/model/todo'
import { UuidService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoName')
  todoItemRef!:ElementRef

  todosArr: Array<Itodo>=[
    {
      todoId:"123",
      todoItem:"HTML"
    },

    {
      todoId:"124",
      todoItem:"CSS"
    },

    {
      todoId:"125",
      todoItem:"JS"
    },

    {
      todoId:"126",
      todoItem:"MongoDB"
    },

    {
      todoId:"127",
      todoItem:"JAVA"
    }
  ]

  isInEditMode:boolean=false

  updateId: string | null = null;

  constructor(private _uuidService:UuidService) { }

  ngOnInit(): void {
  }

  onAddTodo(){
    let todo:Itodo={
      todoItem:this.todoItemRef.nativeElement.value,
      todoId:this._uuidService.getUuid()
    }
    this.todosArr.push(todo)
    this._uuidService.snackbar('todo created successfully!!')
    console.log(todo)
    this.todoItemRef.nativeElement.value='';
  }

//Edit

onEditTodo(todo:Itodo){
  let editObj = this.todosArr.find(e=> e.todoId === todo.todoId);
  this.todoItemRef.nativeElement.value= editObj!.todoItem;
  this.isInEditMode = true;
  this.updateId= todo.todoId;
}

//Update 

onUpdateTodo(){
  const index1 = this.todosArr.findIndex(
    eve => eve.todoId ===this.updateId
  );
  let updatedValue= this.todoItemRef.nativeElement.value
  this.todosArr[index1].todoItem=updatedValue;
  this._uuidService.snackbar('todo updated successfully!!')
  this.isInEditMode=false;
  this.updateId =null;
  this.todoItemRef.nativeElement.value='';

}

//Reset
onReset(){
  this.todoItemRef.nativeElement.value='';
  this.isInEditMode=false;
  this.updateId=null;
}

//Delete
onDeleteTodo(id:string){
  let getConfirmation=confirm('Are you sure you want to delete this todo item with id ${id}?');
  if(getConfirmation){
  let todoIndex=this.todosArr.findIndex(
    ele => ele.todoId === id
  )
  this.todosArr.splice(todoIndex, 1);
  this._uuidService.snackbar('Todo deleted successfully')
}
}

}
