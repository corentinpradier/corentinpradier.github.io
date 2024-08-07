function redirectToPage() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Remplacez 'votreUsername' et 'votrePassword' par le nom d'utilisateur et le mot de passe attendus
    if (username === 'vigo' && password === 'vigo') {
        window.location.href = '../private/index.html'; // Remplacez par l'URL de votre nouvelle page
        return false;
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.");
        return false; // Empêche le formulaire de soumettre
    }
}