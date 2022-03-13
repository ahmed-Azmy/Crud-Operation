/**********************Global variables*****************************/
const addBtn = document.getElementById('addBtn'),
      inputs = document.getElementById('inputs'),
      addProductBtn = document.getElementById('addProductBtn'),
      clearFormBtn = document.getElementById('clearForm'),
      CountOfProducts = document.getElementById('CountOfProducts'),
      WarningMessage = document.getElementById('WarningMessage'),
      WarningMessage1 = document.getElementById('WarningMessage1'),
      WarningMessage2 = document.getElementById('WarningMessage2'),
      WarningMessage3 = document.getElementById('WarningMessage3'),
      loginEmailInput = document.getElementById('loginEmailInput'),
      loginPasswordInput = document.getElementById('loginPasswordInput'),
      signUpNameInput = document.getElementById('signUpNameInput'),
      signUpEmailInput = document.getElementById('signUpEmailInput'),
      signUpPasswordInput = document.getElementById('signUpPasswordInput'),
      signUpBtn = document.getElementById('signUpBtn'),
      loginBtn = document.getElementById('loginBtn');

let productNameInput = document.getElementById('inputName'),
    productCategoryInput = document.getElementById('inputCategory'),
    productPriceInput = document.getElementById('inputPrice'),
    productDescriptionInput = document.getElementById('inputDescription'),
    productsContainer,
    usersContainer,
    userSessionContainer;

    //To Store Proudcts
    if(localStorage.getItem('MyData') == null){
      productsContainer = [];  
    }
    else{
      productsContainer =JSON.parse(localStorage.getItem('MyData')); 
      //to get number of product
      if(CountOfProducts){
        CountOfProducts.innerHTML = productsContainer.length;
      } 
      display(productsContainer);
    }

    //To Store Users
    if(localStorage.getItem('UserData') == null){
      usersContainer = [];  
    }
    else{
      usersContainer =JSON.parse(localStorage.getItem('UserData')); 
    }

    //To Store Session of user
    // let userSessionContainer;
    if(localStorage.getItem('sessionUserName') == null){
      userSessionContainer = [];  
    }
    else{
      userSessionContainer = localStorage.getItem('sessionUserName'); 
    }

/**==================Show Or Hide Inputs=================== */  
if(addBtn){
  addBtn.addEventListener('click' , ()=>{
    inputs.classList.toggle('hideInput');
})
}
/**======================Add Product====================== */
function addProduct(){
  if(validateProductName() && validateProductCategory() && validateProductPrice() &&validateProductDescription()){
     if(addProductBtn.innerHTML == 'add product'){
       let Products = {
         Pname:productNameInput.value,
         Pcategory:productCategoryInput.value,
         Pprice:productPriceInput.value,
         Pdescription:productDescriptionInput.value
       };
       productsContainer.push(Products);
       localStorage.setItem("MyData" , JSON.stringify(productsContainer));
       console.log(productsContainer);
       display(productsContainer);
       clearForm();
       CountOfProducts.innerHTML = productsContainer.length;
     }
     else{
       updateProduct();
       display(productsContainer);
     } 
  }
}
/** when btn click fire the function */
if(addProductBtn){
  addProductBtn.addEventListener('click' ,()=>{
    addProduct();
})
}
/**======================Clear Form====================== */
function clearForm(){
  productNameInput.value = "";
  productCategoryInput.value = "";
  productPriceInput.value = "";
  productDescriptionInput.value = "";
}
if(clearFormBtn){
clearFormBtn.addEventListener('click' , clearForm);
}
/**======================display Product====================== */
function display(productToDisplay){
    let date = new Date().toDateString();
    let Cartona = "";
    let blockNone = '';
  
    //if condition to solve bug when i update or delete product action take d-none by defult when i whant take d-block
    if(localStorage.getItem('sessionUserName') != null){
       blockNone = 'd-block';
    }
    else{
       blockNone = 'd-none';
    }

    for (let i = 0; i < productToDisplay.length; i++) {
        Cartona +=`
            <tr>          
              <td>${productToDisplay[i].Pname}</td>
              <td>${productToDisplay[i].Pcategory}</td>
              <td>${productToDisplay[i].Pprice}</td>
              <td>${date}</td>
              <td class="w-mine ${blockNone} actionBtns">
                <i class="fas fa-edit bg-warning py-2 px-2  px-md-3 rounded-start" onclick= 'retriveData(${i})'></i>
                <i class="fas fa-trash-alt bg-danger py-2 px-2  px-md-3 rounded-end" onclick= 'deleteProduct(${i})'></i>
              </td>  
            </tr>
            <tr>
              <td colspan="6" class="">Description: ${productToDisplay[i].Pdescription}</td>
            </tr>
        `;       
    }
    let tbodyContent=document.getElementById('tbodyContent');
    if(tbodyContent){
      tbodyContent.innerHTML = Cartona ;
    }  
}
/**======================Delete Product====================== */
function deleteProduct(index){
    productsContainer.splice(index , 1);
    display(productsContainer);
    localStorage.setItem("MyData" , JSON.stringify(productsContainer));
    if(CountOfProducts){
      CountOfProducts.innerHTML = productsContainer.length;
    }
}
/**======================update Product====================== */
let indexToUpdate;
function retriveData(index){
  indexToUpdate = index;
  productNameInput.value = productsContainer[index].Pname;
  productCategoryInput.value = productsContainer[index].Pcategory;
  productPriceInput.value = productsContainer[index].Pprice;
  productDescriptionInput.value = productsContainer[index].Pdescription;
  addProductBtn.innerHTML = "Update Product";
  inputs.classList.remove('hideInput');
  
}
function updateProduct(){
  productsContainer[indexToUpdate].Pname = productNameInput.value;
  productsContainer[indexToUpdate].Pcategory = productCategoryInput.value;
  productsContainer[indexToUpdate].Pprice = productPriceInput.value;
  productsContainer[indexToUpdate].Pdescription = productDescriptionInput.value;
  localStorage.setItem("MyData" , JSON.stringify(productsContainer));
  addProductBtn.innerHTML = "add product";
  clearForm();
}
/**======================search Product====================== */
let SearchInput = document.getElementById('SearchInput');

function Search(){
  let productSearch = [];
  for (let i = 0; i < productsContainer.length; i++) {
      if(productsContainer[i].Pname.toLowerCase().includes(SearchInput.value.toLowerCase())){
           productSearch.push(productsContainer[i]);
      }
  }
  display(productSearch);
  inputs.classList.add('hideInput');
}
//Call function when event don
if(SearchInput){
  SearchInput.addEventListener('keyup' , ()=>{
  Search();
})
}
/**======================Validate Product Name====================== */
function validateProductName(){
  let regex = /^[A-Z][ a-zA-Z0-9]{3,20}$/
  if(regex.test(productNameInput.value)){
    productNameInput.classList.remove('is-invalid');
    WarningMessage.style.display = "none";
    return true;
  }
  else{
    productNameInput.classList.add('is-invalid');
    WarningMessage.style.display = "block";
    return false;
  }
}
//Call function when event don
if(productNameInput){
  productNameInput.addEventListener('blur' , ()=>{
  validateProductName();
})
}
/**======================Validate Product Category====================== */
function validateProductCategory(){
  let regex = /^[A-Z][ a-zA-Z0-9]{3,20}$/
  if(regex.test(productCategoryInput.value)){
    productCategoryInput.classList.remove('is-invalid');
    WarningMessage1.style.display = "none";
    return true;
  }
  else{
    productCategoryInput.classList.add('is-invalid');
    WarningMessage1.style.display = "block";
    return false;
  }
}
//Call function when event don
if(productCategoryInput){
 productCategoryInput.addEventListener('blur' , ()=>{
  validateProductCategory();
})
}
/**======================Validate Product Price====================== */
function validateProductPrice(){
  let regex = /^[0-9]+$/
  if(regex.test(productPriceInput.value)){
    productPriceInput.classList.remove('is-invalid');
    WarningMessage2.style.display = "none";
    return true;
  }
  else{
    productPriceInput.classList.add('is-invalid');
    WarningMessage2.style.display = "block";
    return false;
  }
}
//Call function when event don
if(productPriceInput){
 productPriceInput.addEventListener('blur' , ()=>{
  validateProductPrice();
})
}
/**======================Validate Product Description====================== */
function validateProductDescription(){
  let regex = /^[A-Z][ a-zA-Z0-9,]{3,100}$/
  if(regex.test(productDescriptionInput.value)){
    productDescriptionInput.classList.remove('is-invalid');
    WarningMessage3.style.display = "none";
    return true;
  }
  else{
    productDescriptionInput.classList.add('is-invalid');
    WarningMessage3.style.display = "block";
    return false;
  }
}
//Call function when event don
if(productDescriptionInput){
  productDescriptionInput.addEventListener('blur' , ()=>{
  validateProductDescription();
})
}

/**===========================================Sign Up================================================= */
let aMessageOfSuccess = document.getElementById('aMessageOfSuccess')
function signUp(){
    if(validateSignUpNameInput() && validateSignUpEmailInput() && validateSignUpPasswordInput() && isExist() != false){
       let user = {
           Uname: signUpNameInput.value,
           Uemail: signUpEmailInput.value,
           Upassword: signUpPasswordInput.value
       };
       usersContainer.push(user);
       localStorage.setItem('UserData' , JSON.stringify(usersContainer)); 
       aMessageOfSuccess.classList.replace('d-none' , 'd-block');
       console.log(usersContainer);
    }
}
//Call function when event don
if(signUpBtn){
  signUpBtn.addEventListener('click' , signUp);
}
/**==========================Validate Sign Up=============================== */
//Validate Name
let signUpNameWarningMessage = document.getElementById('signUpNameWarningMessage');
function validateSignUpNameInput(){
  let regex = /^[a-zA-z]{3,30}$/;
  if(regex.test(signUpNameInput.value) && signUpNameInput.value != ""){
    signUpNameInput.classList.add('is-valid');
    signUpNameInput.classList.remove('is-invalid');
    signUpNameWarningMessage.classList.replace('d-block' , 'd-none');
    return true;
  }
  else{
    signUpNameInput.classList.add('is-invalid');
    signUpNameInput.classList.remove('is-valid');
    signUpNameWarningMessage.classList.replace('d-none' , 'd-block');
    return false;
  }
}
//Validate Email
let signUpEmailWarningMessage = document.getElementById('signUpEmailWarningMessage');
function validateSignUpEmailInput(){
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(regex.test(signUpEmailInput.value) && signUpEmailInput.value != ""){
    signUpEmailInput.classList.add('is-valid');
    signUpEmailInput.classList.remove('is-invalid');
    signUpEmailWarningMessage.classList.replace('d-block' , 'd-none');
    return true;
  }
  else{
    signUpEmailInput.classList.add('is-invalid');
    signUpEmailInput.classList.remove('is-valid');
    signUpEmailWarningMessage.classList.replace('d-none' , 'd-block');
    return false;
  }
}
//Validate Password
let signUpPasswordWarningMessage = document.getElementById('signUpPasswordWarningMessage');
function validateSignUpPasswordInput(){
  let regex = /^[a-zA-z0-9]{4,30}$/;
  if(regex.test(signUpPasswordInput.value) && signUpPasswordInput.value != ""){
    signUpPasswordInput.classList.add('is-valid');
    signUpPasswordInput.classList.remove('is-invalid');
    signUpPasswordWarningMessage.classList.replace('d-block' , 'd-none');
    return true;
  }
  else{
    signUpPasswordInput.classList.add('is-invalid');
    signUpPasswordInput.classList.remove('is-valid');
    signUpPasswordWarningMessage.classList.replace('d-none' , 'd-block');
    return false;
  }
}
//Check if this email is already Store usersContainer(localstore) or not
function isExist(){
   let signUpEmailIsAlreadySelected = document.getElementById('signUpEmailIsAlreadySelected');
   for (let i = 0; i < usersContainer.length; i++) {
      if(usersContainer[i].Uemail.toLowerCase() == signUpEmailInput.value.toLowerCase()){
        signUpEmailInput.classList.add('is-invalid');
        signUpEmailIsAlreadySelected.classList.replace('d-none' , 'd-block');
        return false;
      }
      else{
        signUpEmailIsAlreadySelected.classList.replace('d-block' , 'd-none');
        signUpEmailInput.classList.remove('is-invalid');
      }
   }
}

/**===========================================Login================================================= */
function Login(){
  // variables
    let  loginEmailEmptyInput =document.getElementById('loginEmailEmptyInput'),
         loginPasswordEmptyInput=document.getElementById('loginPasswordEmptyInput'),
         aMessageOfFail = document.getElementById('aMessageOfFail');
      
  //if email input empty
  if(loginEmailInput.value == ""){
    loginEmailEmptyInput.classList.replace('d-none' , 'd-block');
    loginEmailInput.classList.add('is-invalid');
  }
  else{
    loginEmailEmptyInput.classList.replace('d-block' , 'd-none');
    loginEmailInput.classList.remove('is-invalid');
  }
  //if email password empty
  if(loginPasswordInput.value == ""){
    loginPasswordEmptyInput.classList.replace('d-none' , 'd-block')
    loginPasswordInput.classList.add('is-invalid');
  }
  else{
    loginPasswordEmptyInput.classList.replace('d-block' , 'd-none')
    loginPasswordInput.classList.remove('is-invalid');
  }

  //for loop for check if Email & Password stored in usersContainer(localstorge)
  for (let i = 0; i < usersContainer.length; i++) {
     if(usersContainer[i].Uemail.toLowerCase() == loginEmailInput.value.toLowerCase() && usersContainer[i].Upassword == loginPasswordInput.value){
       //Session of user
       userSessionContainer.push(usersContainer[i].Uname)
       localStorage.setItem('sessionUserName' ,userSessionContainer)
       loginBtn.setAttribute('href' , 'index.html')
       //validate login
       aMessageOfFail.classList.replace('d-block' , 'd-none')
       loginEmailInput.classList.remove('is-invalid');
       loginPasswordInput.classList.remove('is-invalid');
       loginEmailInput.classList.add('is-valid');
       loginPasswordInput.classList.add('is-valid');
       break;
     }
     else{
       aMessageOfFail.classList.replace('d-none' , 'd-block')
       loginEmailInput.classList.add('is-invalid');
       loginPasswordInput.classList.add('is-invalid');
     }
  }
}
//Call function when event don
if(loginBtn){
loginBtn.addEventListener('click' , Login);
}

/**==========================Give the user the power to add update and delete================================ */

//variables
let actionId = document.getElementById('actionId'),
    actionBtns = document.getElementsByClassName('actionBtns'),
    logOut = document.getElementById('logOut'),
    loginLink = document.getElementById('login-link');
    

// give access to user to add or update or delete
function giveAccess(){
  if(actionId){
    actionId.classList.replace('d-none' , 'd-block');
    inputs.classList.replace('d-none' , 'd-block');
    addBtn.classList.replace('d-none' , 'd-block');
    logOut.classList.replace('d-none' , 'd-block');
    loginLink.classList.add('d-none');
    for (const actionBtn of actionBtns) {
      actionBtn.classList.replace('d-none' , 'd-block');
    }
  }
}

//If there's an access registered user
if(userSessionContainer.length > 0){
  giveAccess();
}

//-----Log out function----
function LogOut(){
  localStorage.removeItem('sessionUserName')
}
if(logOut){
  logOut.addEventListener('click' , LogOut)
}

