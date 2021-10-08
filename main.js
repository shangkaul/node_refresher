const url="http://localhost:8080"


function addForm()
{
    document.getElementById("addForm").style.display="inline-block";
    document.getElementById("addMore").style.display="none";
}

function formHandler()
{
    console.log("Form Submit Called")

    var form=document.getElementById("addForm");
    var body={
        "name":form.name.value,
        "desig":form.desig.value,
        "dept":form.dept.value
    };
    
    fetch(url+"/add",{method:"POST",
                      headers:{'Content-Type':"application/json"},
                      body:JSON.stringify(body)})
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("User pushed to DB!")
            window.location.reload();
        })
        .catch(err=>{
            console.log(err);
        });

    
    document.getElementById("addForm").style.display="none";
    document.getElementById("addMore").style.display="inline-block";

}

function popUser(id){
    console.log("User deleted!"+id);
    var form=document.getElementById("addForm");
    var body={
        "id":id
    };
    console.log(JSON.stringify(body));
    
    fetch(url+"/del",{method:"POST",
                      headers:{'Content-Type':"application/json"},
                      body:JSON.stringify(body)})
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("User Deleted!")
            window.location.reload();
        })
        .catch(err=>{
            console.log(err);
        });

}

function fetchAll()
{
    fetch(url+"/all",{method:"GET",headers:{'Content-Type':'application/json'}})
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        var arr=data['data'];
        arr.forEach((user,i)=>{
            
          var row=document.createElement("tr");

          var td1=document.createElement("td");
          var id=document.createTextNode(user.id);
          td1.appendChild(id);

          
          var td2=document.createElement("td");
          var name=document.createTextNode(user.name);
          td2.appendChild(name);

          var td3=document.createElement("td");
          var desig=document.createTextNode(user.desig);
          td3.appendChild(desig);


          var td4=document.createElement("td");
          var dept=document.createTextNode(user.dept);
          td4.appendChild(dept);

          var td5=document.createElement("td");
          var btn=document.createElement("button");
          btnTxt=document.createTextNode("Delete");
          btn.appendChild(btnTxt);
          btn.classList.add("btn");
          btn.onclick = function() { popUser(user.id) };
          td5.appendChild(btn);

          row.appendChild(td1);
          row.appendChild(td2);
          row.appendChild(td3);
          row.appendChild(td4);
          row.appendChild(td5);

          
          var node=document.getElementById("userTable");
          node.appendChild(row);

        });
    })
    .catch(err=>{
        console.log(err);
    });


}


fetchAll();
