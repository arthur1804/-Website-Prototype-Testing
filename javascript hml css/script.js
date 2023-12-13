var searchData = [
    { title: 'Mel de flor de laranjeira', category: 'Mel' },
    { title: 'Apiário da Serra', category: 'Apiários' },
    { title: 'Mapa da Apicultura', category: 'Mapa' },
    { title: 'Registro de Produção', category: 'Registros' },
    { title: 'Sobre nós', category: 'Sobre nós' },
    { title: 'Nossos Apicultores', category: 'Apicultores' },
    { title: 'Próximos Eventos', category: 'Eventos' }
];

function toggleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchButton = document.getElementById('searchButton');

    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'inline-block';
        searchButton.style.display = 'inline-block';
    } else {
        searchInput.style.display = 'none';
        searchButton.style.display = 'none';
    }
}

function search() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var results = [];

    results = files.filter(function (file) {
        return file.toLowerCase().includes(searchTerm);
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    var resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(function (result) {
            var resultItem = document.createElement('div');
            resultItem.innerHTML = '<strong>' + result + '</strong>';
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
    }
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}


function showRegisterForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function login() {
    var username = document.getElementById('username').value;

    // Armazenar informações de login no Local Storage
    localStorage.setItem('usuario', username);

    // Esconder formulários e mostrar conteúdo principal
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';

    // Redirecionar para a página principal
    window.location.href = 'main.html';
}

document.addEventListener('DOMContentLoaded', function () {
    // Verificar se há informações de usuário no Local Storage
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
        alert('Bem-vindo de volta, ' + usuario + '!');
    } else {
        // Se não houver informações de usuário, redireciona de volta para a página de login
        window.location.href = 'welcome.html';
    }
});
 
function register() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';

    // Redireciona para a página principal
    window.location.href = 'main.html';
}
function validateLoginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        login();
    } else {
        alert('Por favor, preencha todos os campos de login.');
    }
}

function validateRegisterForm() {
    var newUsername = document.getElementById('newUsername').value;
    var newEmail = document.getElementById('newEmail').value;
    var newPassword = document.getElementById('newPassword').value;
    var newCpf = document.getElementById('newCpf').value;
    var newCep = document.getElementById('newCep').value;

    if (newUsername && newEmail && newPassword && newCpf && newCep) {
        register();
    } else {
        alert('Por favor, preencha todos os campos de cadastro.');
    }
}

function getDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return now.toLocaleDateString('pt-BR', options);
}

setInterval(function () {
    document.getElementById('date-time').textContent = getDateTime();
}, 1000);

function viewFile(fileName) {
    var fileContent = document.getElementById('file-content');
    fileContent.textContent = filesData[fileName];
}

function editProfile() {
    var profileContainer = document.getElementById('profile-container');
    var editProfileContainer = document.getElementById('edit-profile-container');

    profileContainer.style.display = 'none';
    editProfileContainer.style.display = 'block';

    document.getElementById('edit-name').value = document.getElementById('user-name').textContent;
    document.getElementById('edit-email').value = document.getElementById('user-email').textContent;
}

function saveChanges() {
    var editNameInput = document.getElementById('edit-name');
    var editEmailInput = document.getElementById('edit-email');

    var userName = document.getElementById('user-name');
    var userEmail = document.getElementById('user-email');

    userName.textContent = editNameInput.value;
    userEmail.textContent = editEmailInput.value;

    document.getElementById('profile-container').style.display = 'block';
    document.getElementById('edit-profile-container').style.display = 'none';
}

var notifications = [];

function sendNotification() {
    var notificationInput = document.getElementById('notificationInput');
    var notificationMessage = notificationInput.value;

    if (notificationMessage.trim() !== '') {
        addNotification(notificationMessage);
        notificationInput.value = '';
    }
}

function addNotification(message) {
    var notification = { message: message };
    notifications.push(notification);
    displayNotifications();
}

function displayNotifications() {
    var notificationContainer = document.getElementById('notification-content');

    if (notificationContainer) {
        notificationContainer.innerHTML = '';

        notifications.forEach(function (notification) {
            var notificationElement = document.createElement('div');
            notificationElement.innerHTML = '<strong>Notificação:</strong> ' + notification.message;
            notificationContainer.appendChild(notificationElement);
        });
    }
}

function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        alert('Arquivo enviado com sucesso: ' + file.name);
    } else {
        alert('Por favor, selecione um arquivo antes de enviar.');
    }
}

function addMel() {
    var melName = document.getElementById('melName').value;
    var melDescription = document.getElementById('melDescription').value;

    // Verifica se há algo no Local Storage
    var existingMels = JSON.parse(localStorage.getItem('mel')) || [];

    existingMels.push({ name: melName, description: melDescription });

    localStorage.setItem('mel', JSON.stringify(existingMels));

    // Limpa os campos do formulário
    document.getElementById('melName').value = '';
    document.getElementById('melDescription').value = '';

    // Atualiza a lista na página
    displayMels();
}

// Função para exibir os tipos de mel na lista
function displayMels() {
    var melList = document.getElementById('melList');
    
    // Limpa a lista atual
    melList.innerHTML = '';

    var mels = JSON.parse(localStorage.getItem('mel')) || [];

    mels.forEach(function (mel) {
        var melItem = document.createElement('li');
        melItem.textContent = mel.name + ': ' + mel.description;
        melList.appendChild(melItem);
    });
}

// Chama a função para exibir mels quando a página carrega
document.addEventListener('DOMContentLoaded', displayMels);