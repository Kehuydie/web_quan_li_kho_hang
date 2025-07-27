const checkboxes = document.querySelectorAll('.itemcheckbox');
const addtolist=document.getElementById('add-to-list')
const quantity=document.getElementById('quantity')
const add=document.querySelector('.add')
const submitbtn=document.querySelector('.submit')
const importForm=document.getElementById('importForm')

let importlist=[]
let selectedProductId = null;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selectedProductId = this.value; 
            checkboxes.forEach((cb) => {
                if (cb !== this) cb.checked = false;
            });
        } else {
            selectedProductId = null; 
        }
    });
});

addtolist.addEventListener('click',()=>{
    const selected = document.querySelector(".itemcheckbox:checked");
    const item={}
    if (!selected) {
      alert("Vui lòng chọn sản phẩm");
      return;
    }
    item.product_name=selected.dataset.name
    item.product_id=selected.dataset.id
    item.import_price=selected.dataset.importprice
    item.stock_quantity=quantity.value
    importlist.push(item)
    showimportlist(importlist)
})

function showimportlist(array){
    add.innerHTML=''
    array.forEach((order,index)=>{
        const row=`
            <tr>
                <td>${index + 1}</td>
                <td>${order.product_id}</td>
                <td>${order.product_name}</td>
                <td>${order.stock_quantity}</td>
                <td>${order.import_price}</td>
                <td><button class="btn btn-danger" onclick="removeProduct(${order.product_id})">Xóa sản phẩm</button></td>
            </tr>
        `
        add.innerHTML+=row
    })
}

function removeProduct(productId) {
    for (let i = importlist.length - 1; i >= 0; i--) {
        if (String(importlist[i].product_id) === String(productId)) {
            importlist.splice(i, 1);
        }
    }
    showimportlist(importlist); 
    console.log(importlist)
}

document.getElementById("importForm").addEventListener("submit", function (e) {
  const detailsInput = document.getElementById("importDetailsInput");
  detailsInput.value = JSON.stringify(exportlist);
});

submitbtn.addEventListener('click',()=>{
    importForm.requestSubmit();
})
