const storageKey = 'DadosWebFront';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('adminForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        register();
    });
    displayAdminList();
});

function register() {
    const username = document.getElementById('username').value;
    const usermail = document.getElementById('usermail').value;
    const id = Date.now().toString();
    const date = new Date().toISOString();
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

    dataList.forEach(data => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${data.id}, Data: ${data.date}, Nome: ${data.name}, Email: ${data.email}`;
        adminListContainer.appendChild(listItem);
    });
}
