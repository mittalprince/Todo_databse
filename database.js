/**
 * Created by PRINCE MITTAL on 16-07-2017.
 */

const sequelize = require('sequelize');

const db = new sequelize ({
    host:"localhost",
    username:"prince",
    password:"hello",
    database:"todo",
    dialect:"mysql"
})
db.authenticate().then(()=>{
    console.log("Connection established Successfully");
})
    .catch(()=>{
        console.error("Unable to connect to database:",err)
    });

const locals = db.define("local",{
    id:{
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    task: sequelize.DataTypes.STRING,
    done: {type:sequelize.DataTypes.BOOLEAN,
        defaultValue:false},
    position: sequelize.DataTypes.INTEGER

})
db.sync({alter:true}).then(function(){
    console.log("Database is Ready")
})
function addtodo(task){
    return locals.create({
        task:task
    })
}

function gettodo(){
    return locals.findAll({
        order: db.col('position')
    })
}

function maketododone (dataid){
    locals.update({
        done:sequelize.literal('not done')
    },{where:
        {position:dataid}}
    )
}

function removedone(){
    locals.update({
        position:sequelize.literal('position-1'),
        id: sequelize.literal('id-1')
    },{where:{
        done:true
    }
    })
    locals.destroy(
        {where:
            {done:true}
        })

}

function deletetodo(dataid){
    locals.destroy({
        where:{
            position: dataid
        }
    });
    locals.update({
        position : sequelize.literal('position-1'),
        id: sequelize.literal('id-1')
    },{where:
        {position:
            {$gt :dataid}
        }
    })
}

function moveup(dataid){
    locals.update({
        position:0
    },{where:{
        position:Number(Number(dataid)-1)
    }})
    locals.update({
        position:Number(Number(dataid)-1)
    },{where :
        {position:Number(dataid)}})
    locals.update({
        position:Number(dataid)
    },{where:
        {position:Number(0)}})
}

function movedown(dataid){
    locals.update({
        position:0
    },{where:
        {position:Number(Number(dataid)+1)}
    })
    locals.update({
        position:(Number(dataid)+1)
    },{where:
        {position:Number(dataid)}
    })
    locals.update({
        position:(Number(dataid))
    },{where:{
        position:0
    }})
}

function provideposition(){
    db.query('UPDATE locals SET position=id WHERE position is NULL')
}

module.exports ={
    addtodo, gettodo, maketododone, deletetodo, moveup, movedown, provideposition, removedone
};
