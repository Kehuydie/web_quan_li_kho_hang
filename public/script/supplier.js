const checkboxes = document.querySelectorAll('.itemcheckbox');
const deleteForm=document.querySelector('#deleteForm')
const editForm=document.querySelector('#editForm')

let selectedsupplierId = null;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selectedsupplierId = this.value; 
            checkboxes.forEach((cb) => {
                if (cb !== this) cb.checked = false;
            });
        } else {
            selectedsupplierId = null; 
        }
    });
});

deleteForm.addEventListener('submit', (e) => {
    if (!selectedsupplierId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một nhà cung cấp để xóa!");
        return;
    }
    deleteForm.action = `/supplier/${selectedsupplierId}/delete?_method=DELETE`;
});

editForm.addEventListener('submit', (e) => {
    if (!selectedsupplierId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một nhà cung cấp để xóa!");
        return;
    }
    editForm.action = `/supplier/${selectedsupplierId}/update?_method=PUT`;
});

document.getElementById("editButton").addEventListener("click", () => {
    const selected = document.querySelector(".itemcheckbox:checked");
    if (!selected) {
      alert("Vui lòng chọn nhà cung cấp để sửa");
      return;
    }

    document.getElementById("edit_supplier_name").value = selected.dataset.name;
    document.getElementById("edit-contact_person").value = selected.dataset.contact;
    document.getElementById("edit_phone").value = selected.dataset.phone;
    document.getElementById("edit_status").value = selected.dataset.status;
    document.getElementById("edit_email").value = selected.dataset.email;
    document.getElementById("edit_address").value = selected.dataset.address;
    document.getElementById("edit_tax_code").value = selected.dataset.tax;


    const modal = new bootstrap.Modal(document.getElementById("editsupplierModal"));
    modal.show();
})