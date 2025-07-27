const checkboxes = document.querySelectorAll('.itemcheckbox');
const addtolist=document.getElementById('add-to-list')
const quantity=document.getElementById('quantity')
const add=document.querySelector('.add')
const submitbtn=document.querySelector('.submit')
const exportForm=document.getElementById('exportForm')

let exportlist=[]
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
    item.sell_price=selected.dataset.sellprice
    item.stock_quantity=quantity.value
    exportlist.push(item)
    showimportlist(exportlist)
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
                <td>${order.sell_price}</td>
                <td><button class="btn btn-danger" onclick="removeProduct(${order.product_id})">Xóa sản phẩm</button></td>
            </tr>
        `
        add.innerHTML+=row
    })
}

function removeProduct(productId) {
    for (let i = exportlist.length - 1; i >= 0; i--) {
        if (String(exportlist[i].product_id) === String(productId)) {
            exportlist.splice(i, 1);
        }
    }
    showimportlist(exportlist); 
    console.log(exportlist)
}

document.getElementById("exportForm").addEventListener("submit", function (e) {
  const detailsInput = document.getElementById("exportDetailsInput");
  detailsInput.value = JSON.stringify(exportlist);
});

submitbtn.addEventListener('click',()=>{
    exportForm.requestSubmit();
})