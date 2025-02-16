let inputs = document.querySelectorAll("input");
let btn = document.querySelector("#form-section button");
let productsRow=document.querySelector("#card-section .row");
let editMode= false;
let editIndex= null;
//array of avaliable products 
let  products=JSON.parse(localStorage.getItem("products"))||[];

//clear
function clearInputs(){
    inputs.forEach((input ,index)=>{
        if(index !=5){
            input.value="";
        }
        input.value='';
    })
    inputs[5].checked=false;

}

//trim
function filtervalue(value){
    newvalue=value.trim();
    return newvalue;
}
//create
function createProduct(){
    let valid=true;
      for(let i =0 ; i < inputs.length-1 ;i++){
        if(inputs[i].value == ""){
            valid=false;
        }
      }
      if(valid){
        if(editMode){
            const product = {
                title:filtervalue(inputs[0].value),
                description:filtervalue(inputs[1].value),
                amount:filtervalue(inputs[2].value),
                price:filtervalue(inputs[3].value),
                image:filtervalue(inputs[4].value),
                sale:inputs[5].checked,
            };
            products[editIndex]=product;
            btn.classList.replace('btn-warning','btn-primary');
            btn.innerText="Submit";
            editIndex=null;
            editMode=false;
        } else{
          const product = {
            title:filtervalue(inputs[0].value),
            description:filtervalue(inputs[1].value),
            amount:filtervalue(inputs[2].value),
            price:filtervalue(inputs[3].value),
            image:filtervalue(inputs[4].value),
            sale:inputs[5].checked,
          };
          products.push(product);
        }
        clearInputs();
        localStorage.setItem("products",JSON.stringify(products));
        readproducts();
    }else{
        alert('please fill all inputs !');
        valid= true;
    }
}
    

//read
function readproducts(){
    productsRow.innerHTML="";
    products.forEach((element , index) => {
        if(element.sale){
            productsRow.innerHTML +=
            `<div class="col-lg-4 col-md-6 mb-20 col-lg-12">
                        <div class="card">
                            <img src="${element.image}" alt=""class="card-img-top"/>
                            <div class="card-body">
                                <h5 class="card-title mb-15 text-center">${element.title}</h5>
                                <p class="card-text">
                                ${element.description}                            </p>
                                <p class="card-text">Amount:${element.amount} Unit</p>
                                <p class="card-text">price:<del>${element.price}$</del><span class="new-price">${element.price*0.9}$</span></p>
                                <div class="text-center">
                                    <button class="btn btn-warning mr-10" onclick='editProduct(${index})'><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button class="btn btn-danger" onclick='deleteproduct(${index})'><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
             </div>`;
        }else{
            productsRow.innerHTML +=
            `<div class="col-lg-4 col-md-6 mb-20 col-lg-12">
                        <div class="card">
                            <img src="${element.image}" alt=""class="card-img-top"/>
                            <div class="card-body">
                                <h5 class="card-title mb-15 text-center">${element.title}</h5>
                                <p class="card-text">
                                ${element.description}                            </p>
                                <p class="card-text">Amount:${element.amount} Unit</p>
                                <p class="card-text">price:${element.price}$</p>
                                <div class="text-center">
                                    <button class="btn btn-warning mr-10" onclick='editProduct(${index})'><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button class="btn btn-danger" onclick='deleteproduct(${index})'><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
             </div>`;
        }
    ;})
}


//delete
function deleteproduct(index){
    products.splice(index,1);
    localStorage.setItem("products",JSON.stringify(products));
    readproducts();
}   



//edit
function editProduct(index) {
    inputs[0].value=products[index].title;
    inputs[1].value=products[index].description;
    inputs[2].value=products[index].amount;
    inputs[3].value=products[index].price;
    inputs[4].value=products[index].image;
    inputs[5].checked=products[index].sale;
    btn.classList.replace("btn-primary","btn-warning");
    btn.innerText= "Update" ;
    editIndex= index ;
    editMode= true ;
}
readproducts();
btn.addEventListener( "click" , createProduct);

