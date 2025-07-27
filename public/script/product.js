const checkboxes = document.querySelectorAll('.itemcheckbox');
const deleteForm=document.querySelector('#deleteForm')
const editForm=document.querySelector('#editForm')

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
        console.log(checkbox.dataset.name)
    });
});


deleteForm.addEventListener('submit', (e) => {
    if (!selectedProductId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một sản phẩm để xóa!");
        return;
    }
    deleteForm.action = `/product/${selectedProductId}/delete?_method=DELETE`;
});

editForm.addEventListener('submit', (e) => {
    if (!selectedProductId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một sản phẩm để xóa!");
        return;
    }
    editForm.action = `/product/${selectedProductId}/update?_method=PUT`;
});

document.getElementById("editButton").addEventListener("click", () => {
    const selected = document.querySelector(".itemcheckbox:checked");
    if (!selected) {
      alert("Vui lòng chọn sản phẩm để sửa");
      return;
    }

    document.getElementById("edit_product_name").value = selected.dataset.name;
    document.getElementById("edit_sell").value = selected.dataset.sellprice;
    document.getElementById("edit_import").value = selected.dataset.importprice;
    document.getElementById("edit_status").value = selected.dataset.status;
    document.getElementById("edit_des").value = selected.dataset.des;
    document.getElementById("edit_cat").value = selected.dataset.catid;
    document.getElementById("edit_unit").value = selected.dataset.unit;


    const modal = new bootstrap.Modal(document.getElementById("editProductModal"));
    modal.show();
})