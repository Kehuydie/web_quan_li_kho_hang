const checkboxes = document.querySelectorAll('.itemcheckbox');
const deleteForm=document.querySelector('#deleteForm')
let selectedimportorderId = null;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selectedimportorderId = this.value; 
            checkboxes.forEach((cb) => {
                if (cb !== this) cb.checked = false;
            });
        } else {
            selectedimportorderId = null; 
        }
    });
});

deleteForm.addEventListener('submit', (e) => {
    if (!selectedimportorderId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một phiếu nhập để xóa!");
        return;
    }
    deleteForm.action = `/import/${selectedimportorderId}/delete?_method=DELETE`;
});

document.querySelector('.view-detail-btn').addEventListener('click', async()=>{
    const importId = selectedimportorderId
    const importDetailTableBody=document.querySelector('#importDetailTableBody')
    const totalAmount=document.querySelector('#totalAmount')
    totalAmount.innerHTML=''
    importDetailTableBody.innerHTML=''
    let total=0
    try{
        const res = await fetch(`/import/${importId}/details`);
        const data = await res.json(); 
        console.log(data)
        const detail=data.details
        detail.forEach((item, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${item.Product.product_name}</td>
            <td>${item.import_id}</td>
            <td>${item.quantity}</td>
            <td>${item.import_price.toLocaleString()}₫</td>
          </tr>
        `;
        total+=Number(item.import_price)*Number(item.quantity)
        importDetailTableBody.innerHTML+=row
      });
      totalAmount.innerHTML=`${total.toLocaleString()}₫`
      const modal = new bootstrap.Modal(document.getElementById('importDetailModal'));
      modal.show();
    }catch (err) {
      console.error(err);
      alert('Đã xảy ra lỗi khi tải chi tiết phiếu');
    }
})

