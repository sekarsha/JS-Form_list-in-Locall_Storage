document.addEventListener("DOMContentLoaded",function(){

let form=document.getElementById("forminput");
let name=document.getElementById("name");
let age=document.getElementById("age");
let email=document.getElementById("email");
let genter=document.getElementById("genter")
let list=document.getElementById("list");



let e_form=document.getElementById("eformmain");
let e_name=document.getElementById("ename");
let e_age=document.getElementById("eage");
let e_email=document.getElementById("eemail");
let e_genter=document.getElementById("egenter");
let edit_form=document.getElementById("edit_form")
let eindex=document.getElementById("eindex");

//-----form values send to Locall storage----------------->

form.addEventListener("submit",function(e){
    e.preventDefault();
  let fname=name.value.trim();
  let fage=age.value.trim();
  let femail=email.value.trim();
  let fgenter=genter.value;

  if(fname !=="" && !isNaN(fage) && femail !=="" && fgenter !==""){

    let user={

        name:fname,
        age:fage,
        email:femail,
        genter:fgenter};

        Useradd_to_locall_storage(user);
        backendlocalstore();

       }

   

   else{

    alert("Please Fill the Data")
}

});


edit_form.addEventListener("submit",function(e){
    e.preventDefault();
  
  let edit_name=e_name.value.trim();
  console.log(edit_name);
  let edit_age=e_age.value.trim();
  let edit_email=e_email.value.trim();
  console.log(edit_email);
  let edit_genter=e_genter.value;
  let index=eindex.value;

  if(edit_name !=="" && !isNaN(edit_age) && edit_email !=="" && edit_genter !==""){

    let storedata=JSON.parse(localStorage.getItem("myData")) || [];

        storedata[index].name=edit_name,
        storedata[index].age=edit_age,
        storedata[index].email=edit_email,
        storedata[index].genter=edit_genter;
        localStorage.setItem("myData",JSON.stringify(storedata));
        edit_form.reset();
        e_form.style.display="none";
        backendlocalstore();
       
  }
   

   else{

    alert("Please Fill the Data")
}

});






function Useradd_to_locall_storage(user){

   
    let storedata=JSON.parse(localStorage.getItem("myData")) || [];
    storedata.push(user);
    localStorage.setItem("myData",JSON.stringify(storedata));
}

backendlocalstore();


//--------Edit button Opeen  start------------------------------------------->
function edit_data(){

  let index=this.dataset.index;
  let storedata=JSON.parse(localStorage.getItem("myData")) || [];
  let data=storedata[index];
  e_name.value=data.name;
  e_age.value=data.age;
  e_email.value=data.email;
  e_genter.value=data.genter;
  eindex.value=index;
  e_form.style.display="block";

}

///-------------Edit buuton  close ---- start------------------>
function close_data(){

    e_form.style.display="none";

}

//////---------DELETE DATA FROM LOCAL STORAGE ----------------->

function delete_data(){


    if(confirm("ARE YOU SURE CONFIRM")){
      
        let index=this.dataset.index;
        let storedata=JSON.parse(localStorage.getItem("myData")) || [];

        storedata.splice(index,1);
        localStorage.setItem("myData",JSON.stringify(storedata));
        backendlocalstore();
     
    }

}


backendlocalstore();

function backendlocalstore(){
    let storedata=JSON.parse(localStorage.getItem("myData")) || [];
    list.innerHTML="";
    storedata.forEach((data,index) => {
     
        let tr_row=document.createElement("tr");
        list.appendChild(tr_row);
        tr_row.innerHTML=`
                    
           <td>${data.name}</td>
           <td>${data.age}</td>
           <td>${data.email}</td>
           <td>${data.genter}</td>
           <td> <button class="ebtn btn btn-outline-dark " data-index=${index}>Edit</button> </td>
           <td> <button class="edelete btn btn-outline-dark" data-index=${index}>Delete</button> </td>
        
        `
    });
   
//--------Edit button Opeen  start------------------------------------------->
    let edit_button=document.querySelectorAll(".ebtn");

    edit_button.forEach((btn)=>{


        btn.addEventListener("click",edit_data)
    });


///-------------Edit buuton  close ---- start------------------>
    let close_button=document.querySelectorAll(".close")

   
   close_button.forEach((btn)=>{

    btn.addEventListener("click",close_data)

   })
  
//////---------DELETE DATA FROM LOCAL STORAGE ----------------->
   let del_button=document.querySelectorAll(".edelete");

   del_button.forEach((btn)=>{


    btn.addEventListener("click",delete_data)

   });








}










})