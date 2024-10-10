// alert.js
function showAlert() {
    const fileInput = document.getElementById('file');
    const fileName = fileInput.files[0] ? fileInput.files[0].name : 'ไม่มีไฟล์ที่เลือก';

    Swal.fire({
        title: 'เลือกรูปภาพเสร็จแล้ว!',
        text: `คุณได้เลือกไฟล์: ${fileName}`,
        icon: 'success', // เปลี่ยนเป็น 'success' เพื่อแสดงเครื่องหมายติ๊กถูก
        confirmButtonText: 'ตกลง'
    });
}

// ฟังก์ชันแจ้งเตือนเมื่อกดปุ่ม Predict
function predictAlert(event) {
    const fileInput = document.getElementById('file');

    // ตรวจสอบว่ามีการเลือกไฟล์หรือไม่
    if (!fileInput.files[0]) {
        event.preventDefault(); // หยุดการส่งฟอร์ม
        Swal.fire({
            title: 'กรุณาเลือกไฟล์!',
            text: 'คุณยังไม่ได้เลือกไฟล์ กรุณาเลือกไฟล์ก่อน',
            imageUrl: 'https://media.tenor.com/2_aRMC55UQsAAAAi/catcoin-cat-meme.gif', // ใช้ GIF จาก Tenor
            imageWidth: 200,
            imageHeight: 200,
            icon: 'error', // แสดงเป็นเครื่องหมายกากบาท
            confirmButtonText: 'ตกลง'
        });
    } else {
        // ถ้ามีไฟล์แล้ว ให้แสดง SweetAlert การพยากรณ์
        Swal.fire({
            title: 'กำลังทำการพยากรณ์...',
            text: 'กรุณารอสักครู่...',
            icon: 'info', // แสดงเป็นเครื่องหมาย i
            confirmButtonText: 'ตกลง'
        });
    }
}

// เพิ่ม event listener เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file');
    const predictButton = document.querySelector('.button-submit');
    fileInput.addEventListener('change', showAlert); // เมื่อเปลี่ยนไฟล์
    predictButton.addEventListener('click', predictAlert); // เมื่อกดปุ่ม Predict
});