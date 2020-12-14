
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let accNumStart = 21671030449
let id =1
// Add New Customer
const addCustomer = function(id , name1, balance){
   id = id+customers.length
    accNum = accNumStart + customers.length
      customer ={ id ,
         name1,
          balance,
         accNum}
   }
   document.querySelector('#customer-add').addEventListener('submit',function(e){
       e.preventDefault()
    name1 = e.target.elements.name.value
       balance = e.target.elements.balance.value
       addCustomer(id ,name1, balance)
       customers.push(customer)
       localStorage.setItem('customers',JSON.stringify(customers))
       alert('Customer Successfully added')
       showCustomer()
 e.target.reset()
   })

   // display All Customers in a Table
    const showCustomer= function(){
    var table = document.getElementById('table')
    rowCount = document.querySelectorAll('tr')
    if(rowCount.length==1){
     customers.forEach((element,i) => {
var tr= document.createElement('tr')
const heads = ['id', 'name1','accNum','balance']
heads.forEach((head) => {
    var td= document.createElement('td')
  td.textContent=element[head]
tr.appendChild(td)

});
x = tr.insertCell(-1); //insert cell at the end of tr
const btndel = document.createElement('button')
const btnWithDraw = document.createElement('button')
const btnAddBalance = document.createElement('button')
var btn1 = document.createTextNode('Delete')
var btn2 = document.createTextNode('WithDraw Balance')
var btn3 = document.createTextNode('Add Balance')
btndel.classList='btn btn-danger';
btnWithDraw.classList='btn btn-info';
btnAddBalance.classList='btn btn-info';
btndel.appendChild(btn1)
btnWithDraw.appendChild(btn2)
btnAddBalance.appendChild(btn3)
x.appendChild(btnWithDraw )
x.appendChild(btnAddBalance )
x.appendChild(btndel)
//x.innerHTML=(btndel.outerHTML +"  " + btnWithDraw.outerHTML +" "+ btnAddBalance.outerHTML)
table.appendChild(tr)
deleteCustomer(btndel,i)
withDraw(btnWithDraw ,i)
addBalance(btnAddBalance ,i )

});
}
    }
// Delete Customer
 deleteCustomer = function(btn,i){
   btn.addEventListener('click', function(e){
      customers.splice(i,1)
      localStorage.setItem('customers',JSON.stringify(customers))
 showCustomer()

  })
}
//add balance
addBalance =function (btn,i ){
   btn.addEventListener('click', function(e){
      value = parseFloat(prompt('enter Value'))
      customers[i].balance = +customers[i].balance + +value
      localStorage.setItem('customers',JSON.stringify(customers))
  showCustomer()
})
}
  //withdraw balance
  withDraw =function (btn,i ){
   btn.addEventListener('click', function(e){
      value = parseFloat(prompt('enter withDraw Value'))
      if(customers[i].balance>value)
      customers[i].balance = customers[i].balance - value
      else alert('invalid value')
      localStorage.setItem('customers',JSON.stringify(customers))
  showCustomer()
})
}

 //search by accNum
 document.querySelector("#searchinput").addEventListener('keyup',function(e){
 let filter = e.target.value;
 //let table = getElementById('table');
 let tr = table.getElementsByTagName('tr');
 for (var i=0 ; i <tr.length ;i++){
   let td=tr[i].getElementsByTagName('td')[2]
   if(td){
     let txtValue=td.textContent || td.innerHTML ;
    if (txtValue.indexOf(filter)>-1){
      tr[i].style.display ="";
   }else{
      tr[i].style.display="none"
   }
   }
 }

 })

showCustomer()