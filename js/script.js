function register() {
    const username = document.getElementById('username').value;
    const usermail = document.getElementById('usermail').value;
    const id = Date.now().toString();
    const date = new Date().toISOString();
    addFormDataToLocalStorage(id, date, username, usermail);
}

function addFormDataToLocalStorage(id, date, name, email) {
    const storageKey = 'DadosWebFront';
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