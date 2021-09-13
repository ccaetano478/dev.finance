const modalOverlay = document.querySelector ('.modal-overlay');

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

const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '09/09/2021'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '09/09/2021'
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '09/09/2021'
    }
];

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction);
        app.reload();
    },
    remove(index){
        Transaction.all.splice(index, 1);
        app.reload();
    },
    incomes(){
        let income = 0;
        Transaction.all.forEach((transaction)=>{
            if(transaction.amount > 0) {
                income += transaction.amount;
            };
        })

        return income;
    
    },
    expenses(){
        let expense = 0;
        Transaction.all.forEach((transaction)=>{
            if(transaction.amount < 0) {
                expense += transaction.amount;
            };
        })

        return expense;
        
    },
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
};

const dom = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction (transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = dom.innerHTMLTransaction(transaction);

        dom.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td> 
        `
        return html;
    },
    updateBalance(){
        document.querySelector('#incomeDisplay').innerHTML = utils.formatCurrency(Transaction.incomes());
        document.querySelector('#expenseDisplay').innerHTML = utils.formatCurrency(Transaction.expenses());
        document.querySelector('#totalDisplay').innerHTML = utils.formatCurrency(Transaction.total());
    },
    clearTransactions(){
        dom.transactionsContainer.innerHTML = '';
    }
}

const utils = {
    formatCurrency (value){
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency", 
            currency: "BRL"
        })
        
        return signal + value;
    },

    formatAmount(value){
        value = Number(value) * 100;
        return value;
    },
    formatDate(date){
        const splittedDate = date.split('-');
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }

}



const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: this.description.value,
            amount: this.amount.value,
            date: this.date.value,
            
        }
    },
    validateField(){
        const {description, amount, date } = form.getValues();
        if (description.trim()==='' || amount.trim() === '' || date.trim() === ''){
            throw new Error('Por favor, prencha todos os campos')
        }
    },
    formatValues(){
        let {description, amount, date } = form.getValues();

        amount = utils.formatAmount(amount);
        date = utils.formatDate(date);

        return{
            description,
            amount,
            date
        };
    },

    saveTransaction(transaction){
        Transaction.add(transaction);
    },

    clearFields(){
        form.description.value = '';
        form.amount.value = '';
        form.date.value = '';
    },


    submit: document.addEventListener ('submit', (e)=>{
            e.preventDefault();

            try{
                form.validateField();
                const transaction = form.formatValues();
                form.saveTransaction(transaction);
                form.clearFields();
                modal.openClose;
                
            }catch(error){
                alert(error.message);
            }

            
        }),
    
}

const app = {
    init (){
        Transaction.all.forEach((transaction) => {
            dom.addTransaction(transaction)
        })
        
        dom.updateBalance();

        
    },
    reload(){
        dom.clearTransactions();
        app.init()
    },
}


app.init();



 
