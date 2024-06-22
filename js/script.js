const storageKey = 'DadosWebFront';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('adminForm').addEventListener('submit', function (event) {
        event.preventDefault();
        register();
    });
    displayAdminList();
});

/* Função adequada para incluir dados do formulário (ID, data, nome e e-mail) em
uma lista e no local storage. Os dados deverão ser armazenados em uma única
chave, com valores em um objeto JSON. */
function register() {
    const username = document.getElementById('username').value;
    const usermail = document.getElementById('usermail').value;
    const id = Date.now().toString();
    const date = new Date().toISOString();
    if (username && usermail)
        addFormDataToLocalStorage(id, date, username, usermail);

    displayAdminList();
}

function addFormDataToLocalStorage(id, date, name, email) {
    let dataList = JSON.parse(localStorage.getItem(storageKey)) || [];

    const newEntry = {
        id: id,
        date: date,
        name: name,
        email: email
    };
    dataList.push(newEntry);

    localStorage.setItem(storageKey, JSON.stringify(dataList));
}

function displayAdminList() {
    const dataList = JSON.parse(localStorage.getItem(storageKey)) || [];
    const adminListContainer = document.getElementById('adminListContainer');
    adminListContainer.innerHTML = '';

    dataList.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${data.id}, Data: ${data.date}, Nome: ${data.name}, Email: ${data.email} `;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('btn-remove');
        removeButton.onclick = () => removeItem(index);

        listItem.appendChild(removeButton);
        adminListContainer.appendChild(listItem);
    });
}

// Função adequada para excluir um item da lista e do local storage.
function removeItem(index) {
    const dataList = JSON.parse(localStorage.getItem(storageKey)) || [];
    dataList.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(dataList));
    displayAdminList();
}

//Função adequada para limpar os campos do formulário.
function clearFields() {
    document.getElementById('username').value = '';
    document.getElementById('usermail').value = '';
}

// Função adequada para pesquisar um campo do formulário.
function searchEntries() {
    const username = document.getElementById('username').value.toLowerCase().trim();
    const usermail = document.getElementById('usermail').value.toLowerCase().trim();
    const dataList = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (!username && !usermail) {
        alert('Adicione um Nome ou Email');
        return;
    }
    debugger

    const results = dataList.filter(entry =>
        (username && entry.name.toLowerCase().includes(username)) ||
        (usermail && entry.email.toLowerCase().includes(usermail))
    );

    if (results.length > 0) {
        results.forEach(r => {
            alert("Nome: " + r.name + "\nEmail: " + r.email);
        });
    } else {
        alert('Não foi encontrado registro');
    }
}

// Função adequada para excluir todos os itens da lista e do local storage.
function clearList() {
    localStorage.removeItem(storageKey);
    alert('Lista Apagada');
    displayAdminList();
}