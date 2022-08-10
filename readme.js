// get elements from html
const wrap = document.querySelector('.wrapper');
const form = document.querySelector('form');
const input = form.querySelector('input');
const info = form.querySelector('.content p');
const close = document.querySelector('#close');
const copy = document.querySelector('#copy');
const text = document.querySelector('textarea');

const fetchReq = (file, form_data) => {
  info.innerHTML = 'Scanning QR code';
  fetch('http://api.qrserver.com/v1/read-qr-code/', {
    method: 'POST', body: form_data,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      info.innerHTML = result ? 'Upload QR code to scan' : `QR Scanning error`;
      if (!result) return;
      text.innerHTML = result;
      form.querySelector('img').src = URL.createObjectURL(file);
      wrapper.classList.add('active');
    })
    .catch(() => {
      info.innerHTML = `couldn't scan QR code`;
    });
};

// input change
input.onchange = async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let form_Data = new FormData();
  form_Data.append('file', file);
  fetchReq(file, form_Data);
};

// copy btn clicked
copy.onclick = () => {
  navigator.clipboard.writeText(text.textContent);
};

// form clicked
form.onclick = () => {
  input.click();
};

// close btn clicked
close.onclick = () => {
  wrap.classList.remove('active');
};
