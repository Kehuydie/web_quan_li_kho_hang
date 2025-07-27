const checkboxes = document.querySelectorAll('.itemcheckbox');
const deleteForm=document.querySelector('#deleteForm')
let selectedexportorderId = null;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selectedexportorderId = this.value; 
            checkboxes.forEach((cb) => {
                if (cb !== this) cb.checked = false;
            });
        } else {
            selectedexportorderId = null; 
        }
    });
});

deleteForm.addEventListener('submit', (e) => {
    if (!selectedexportorderId) {
        e.preventDefault(); 
        alert("Vui lòng chọn một phiếu xuất để xóa!");
        return;
    }
    deleteForm.action = `/export/${selectedexportorderId}/delete?_method=DELETE`;
});

document.querySelector('.view-detail-btn').addEventListener('click', async()=>{
    const exportId = selectedexportorderId
    const exportDetailTableBody=document.querySelector('#exportDetailTableBody')
    const totalAmount=document.querySelector('#totalAmount')
    totalAmount.innerHTML=''
    exportDetailTableBody.innerHTML=''
    let total=0
    try{
        const res = await fetch(`/export/${exportId}/details`);
        const data = await res.json(); 
        console.log(data)
        const detail=data.details
        detail.forEach((item, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${item.Product.product_name}</td>
            <td>${item.export_id}</td>
            <td>${item.quantity}</td>
            <td>${item.sell_price.toLocaleString()}₫</td>
          </tr>
        `;
        total+=Number(item.sell_price)*Number(item.quantity)
        exportDetailTableBody.innerHTML+=row
      });
      totalAmount.innerHTML=`${total.toLocaleString()}₫`
      const modal = new bootstrap.Modal(document.getElementById('exportDetailModal'));
      modal.show();
    }catch (err) {
      console.error(err);
      alert('Đã xảy ra lỗi khi tải chi tiết phiếu');
    }
})