const newTransaction = document.querySelector('.new');
console.log(newTransaction);
const modalOverlay = document.querySelector ('.modal-overlay');
console.log(modalOverlay);

const modal = {
    get openClose() {
        modalOverlay.classList.toggle('active');
    },

}

document.addEventListener('click', (e)=>{
    const el = e.target;
    if (el.classList.contains('button', 'new')) {
        modal.openClose;
    }
    if (el.classList.contains('button','cancel')){
        modal.openCLose;
    }
});

