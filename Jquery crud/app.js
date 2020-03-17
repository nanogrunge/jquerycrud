//jquery initialization
$(document).ready(function(){
//users array
users =[
    {id: 1,name:'Liam',lastname:'Gallagher',email:'lg@yahoo.com'},
    {id: 2,name:'Noel',lastname:'Gallagher',email:'noelg@yahoo.com'},
    {id: 3,name:'Gem',lastname:'Archer',email:'gebbearcher@gmail.com'},
    {id: 4,name:'Zackary',lastname:'Star',email:'zackary@gmail.com'},
 ]
 //user class
 class User {
     constructor(id,name,lastname,email){
             this.id=id;
             this.name=name;
             this.lastname=lastname;
             this.email=email;
     }
     
     
 }
 //class to handle UI
 class UI {
     static displayUsers(users){
         
         users.forEach((user)=> UI.addUserToList(user));
     }
     //methods
     static addUserToList(user){
         const table = $('#usersTbl'); 
         const row = document.createElement('tr');
 
         row.innerHTML = `
         <td>${user.name}</td>
         <td>${user.lastname}</td>
         <td>${user.email}</td>
         <button class="delete red btn-small">delete</button>
         <button class="edit green btn-small">edit</button>
         `;
         $('#usersTbl').append(row);
         
     }
 }
 // Event: Display Books
 document.addEventListener('DOMContentLoaded', UI.displayUsers(users));
 //functions
 addUser =(user)=> {
     let usuario ={id:users.length+1,name:user.name,lastname:user.lastname,email:user.email};
     new User(usuario);
     users.push(usuario);
 }
 //---------------------------------------------------
 //Function to add user
 submis = document.getElementById('subm');
 submis.addEventListener('click', (e) =>{
     e.preventDefault();
     let nam = $('#name').val();
     let lastnam = $('#lastName').val();
     let email = $('#email').val();
     let usu = {name:nam,lastname:lastnam,email:email}
     if(nam === '' || lastnam === '' || email === '') {
         alert('Please fill in all fields', 'danger');
       } else {
     UI.addUserToList(usu);
     addUser(usu);
     $('#name').val('');
     $('#lastName').val('');
     $('#email').val('');
     }
 })
 //delete function
 deleteUser = (el) => {
     
     let emilio = el.previousElementSibling.innerHTML;
     const newu = users.filter(user => { 
         return user.email !== emilio;
     });
     users = newu;
     if(el.classList.contains("delete")){
         el.parentElement.remove();
     }
     indx = users.length;
     i=1;
     const newmap = users.map(user => user.id = i++);
 }
 //edit user
 editUser = (el) => {
     
     let emilio = $(el).prev().prev().text();
     let lastnam = $(el).prev().prev().prev().text();  
     let name = $(el).prev().prev().prev().prev().text();
     const pos = users.filter(user => (user.email === emilio));
     let position = (pos[0].id);
     user ={name,lastnam,emilio};
     if(el.classList.contains("edit")){
        $('#index').val(position); 
        $('#name').val(user.name); 
        $('#lastName').val(user.lastnam); 
        $('#email').val(user.emilio); 
        $('#subm').hide();
        $('#update').show();
        }   
    }
//--------------------------------------------------------------------------
    $('#usersTbl').on("click", (e)=>{
     deleteUser(e.target);
     editUser(e.target);
    });   
//--------------------------------------------------------------------------
 //update with jquery
 $('#update').on("click", (e)=> {
    e.preventDefault();
    let usr = {name:'',lastname:'',email:''};   
    usr.name = $('#name').val();    
    usr.lastname = $('#lastName').val();
    usr.email = $('#email').val();
    position = $('#index').val();
    ind = position -1;
    users[ind] = {id:position,name:usr.name,lastname:usr.lastname,email:usr.email};    
    $('#name').val('');    
    $('#lastName').val('');
    $('#email').val('');
    $('#subm').show();
    $('#update').hide();
    trow = $('tr')[position];
     nombre=$(trow).children('td')[0];
     $(nombre).text(usr.name);       
     apellido =$(trow).children('td')[1];
     $(apellido).text(usr.lastname);   
    email = $(trow).children('td')[2];
    $(email).text(usr.email);
 });
})