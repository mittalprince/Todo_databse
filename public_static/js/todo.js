/**
 * Created by PRINCE MITTAL on 16-07-2017.
 */

let list ;
$(function(){
    let newtodo = $('#newtodo')
    let addtodo = $('#addtodo')
    let deltodo = $('#deltodo')
     list = $('#list')
    refreshtodos();
    addtodo.click(function(){
        if(newtodo.val()!=="") {
            $.post('/', {task: newtodo.val()}, function (data) {
                if (data.success) {
                    console.log("post req works");
                    refreshtodos();
                }
            })
        }
        this.value='';
    })
    deltodo.click(removedone)
})

function removedone(){
    $.post('/removedone',(data)=>{
        if(data.success){
            console.log("remove done works")
            refreshtodos()
        }
    })
}
function moveup(event){
    let id= parseInt(event.target.parentNode.getAttribute('data-id'))
    console.log("moveup todo: " + id);
    $.post('/moveup',{dataid:id},(data)=>{
        if(data.success){
            console.log('move up done')
            refreshtodos()
        }
    })
}
function movedown(event){
    let id = parseInt(event.target.parentNode.getAttribute('data-id'))
    console.log('move down todo: '+ id)
    $.post('/movedown',{dataid:id},(data)=>{
        if(data.success){
            console.log('move down works')
            refreshtodos()
        }
    })
}
function deletetodo(event){
    let id =parseInt(event.target.parentNode.getAttribute('data-id'))
    console.log('delete todo: '+ id)
    $.post('/deletetodo',{dataid:id},(data)=>{
        if(data.success){
            console.log('delete works')
            refreshtodos()
        }
    })
}
function maketododone(event){
    let id = parseInt(event.target.parentNode.getAttribute('data-id'))
    console.log(id);
    $.post('/maketododone',{dataid:id},(data)=>{
        if(data.success){
            console.log('make todo donwe works')
            refreshtodos();
            location.reload();
        }
    })
}
function refreshtodos(){
    list.empty()
    $.get('/todos',(data)=>{
        console.log('get req works')
        console.log(data.position)
        for(todo in data){
            list.append(createlistelement(todo,data[todo]))
        }
    })
}
function createlistelement(index,item){
    let todolist = $(`<li class="list-group-item" data-id="${Number(index)+1}"></li>`)
    let checkbox = $(`<input type="checkbox" class="col-1">`).attr('checked',item.done).click(maketododone)
    let span = $(`<span class="col-8 lead">${item.task}</span>`)
    if(item.done){
        span.css('text-decoration','line-through')
        todolist.css('background-color','#edca84')
    }
    todolist.append(checkbox)
    todolist.append(span)
    todolist.append($(`<i class="fa fa-chevron-up fa-2x col-1 btn-up"></i>`).click(moveup))
    todolist.append($(`<i class="fa fa-chevron-down col-1 fa-2x btn-down"></i>`).click(movedown))
    todolist.append($(`<i class="fa fa-remove fa-2x col-1 btn-del"></i>`).click(deletetodo))
    return todolist;
}