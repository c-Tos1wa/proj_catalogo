const close = document.getElementById('close');
const msg = document.getElementById('message');

close.addEventListener( 'click', () => {
  msg.style.display = 'none';
})

setTimeout(() => {
  msg.style.display = 'none'
}, 3000)