const newTransaction = document.querySelector('.new');
console.log(newTransaction);
const modalOverlay = document.querySelector ('.modal-overlay');
console.log(modalOverlay);

const modal = {
    open() {
        console.log ('adicionei a bendita classe');
        modalOverlay.classList.add('active');
        console.log(modalOverlay);
    }, 

    close() {
        console.log ('adicionei a bendita classe');
        modalOverlay.classList.remove('.active');
        console.log(modalOverlay);
    },
}

document.addEventListener('click', (e)=>{
    const el = e.target;
    if (el.classList.contains('button', 'new')) {
        modal.open();
    }
    if (el.classList.contains('button','cancel')){
        modal.close();
    }
});

