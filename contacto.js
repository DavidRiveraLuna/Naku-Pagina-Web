document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validar que los campos no estén vacíos
    if (name && email && message) {
        // Enviar los datos al servidor
        fetch('process_contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(data.message);
                document.getElementById('contact-form').reset(); // Limpiar el formulario
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el formulario');
        });
    } else {
        alert('Por favor, completa todos los campos');
    }
});
