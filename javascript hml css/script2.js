// Recupera o perfil do localStorage ou inicializa um perfil padrão
var userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
    name: 'Seu Nome',
    email: 'seuemail@example.com'
};

function showProfile() {
    var profileContainer = document.getElementById('profileInfo');
    profileContainer.innerHTML = '<h2>Meu Perfil</h2>' +
        '<p>Nome: <span id="user-name">' + userProfile.name + '</span></p>' +
        '<p>Email: <span id="user-email">' + userProfile.email + '</span></p>' +
        '<button onclick="editProfile()">Editar Perfil</button>';
}

function editProfile() {
    var profileContainer = document.getElementById('profile-container');
    var editProfileContainer = document.getElementById('edit-profile-container');

    document.getElementById('edit-name').value = userProfile.name;
    document.getElementById('edit-email').value = userProfile.email;

    profileContainer.style.display = 'none';
    editProfileContainer.style.display = 'block';
}

function saveChanges() {
    var editNameInput = document.getElementById('edit-name');
    var editEmailInput = document.getElementById('edit-email');

    userProfile.name = editNameInput.value;
    userProfile.email = editEmailInput.value;

    // Atualiza o local
}