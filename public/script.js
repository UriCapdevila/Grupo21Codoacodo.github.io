
document.addEventListener('DOMContentLoaded', () => {
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn');
    const mostrarEditarUsuarioFormBtn = document.getElementById('mostrarEditarUsuarioFormBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const editarUsuarioForm = document.getElementById('editarUsuarioForm');
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn');
    const listaUsuarios = document.getElementById('listaUsuarios');


    //TOGGLE form de creación de usuario-----------------------

    mostrarCrearUsuarioFormBtn.addEventListener('click', () => {
        crearUsuarioForm.classList.toggle('hidden');
    });


    //CREARNOS UN NUEVO USUARIO-------------------------------

    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearUsuarioForm);
        const data = //es un json que obtiene los valores del form
        {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            direccion: formData.get('direccion'),
            mail: formData.get('mail'),
            telefono: formData.get('telefono')
        }

        const response = await fetch('/usuarios',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        const result = await response.json();
        alert("Usuario Creado Con EXITO");

        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });

    //listar todos los usuarios

    listarUsuariosBtn.addEventListener('click', listarUsuarios);

    async function listarUsuarios() {
        const response = await fetch('/usuarios/');
        const usuarios = await response.json();
        listaUsuarios.innerHTML = '';//limpio la lista de usuarios y después le vovleré a pasar los datos nuevos

        usuarios.forEach(usuario => {//por cada usuario que recibas que me lleguen desde response
            const li = document.createElement('li'); //creas un li por c/usuario 
            li.innerHTML = /*y a cada li le agregas éstos detalles*/
                ` 
                <span> ID: ${usuario.id}, Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, direccion: ${usuario.direccion}, Email: ${usuario.mail}, telefono: ${usuario.telefono}</span>
                <div class="actions"> 
                    <button class="update btn btn-success" data-id="${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-direccion="${usuario.direccion}" data-mail="${usuario.mail}" data-telefono="${usuario.telefono}"> Actualizar  </button> 

                    <button class="delete btn btn-success" data-id="${usuario.id}"> Eliminar </button>

                </div>
            `;

            listaUsuarios.appendChild(li);
        });

        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const apellido = e.target.getAttribute('data-apellido');
                const direccion = e.target.getAttribute('data-direccion');
                const mail = e.target.getAttribute('data-mail');
                const telefono = e.target.getAttribute('data-telefono');

                document.getElementById('editID').value = id;
                document.getElementById('editNombre').value = nombre;
                document.getElementById('editApellido').value = apellido;
                document.getElementById('editDireccion').value = direccion;
                document.getElementById('editMail').value = mail;
                document.getElementById('editTelefono').value = telefono;

                editarUsuarioForm.classList.remove('hidden');
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const response = await fetch(`/usuarios/${id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();
                alert(result.message);
                listarUsuarios();
            });

        });
    }

});

//TOGGLE form de edición de usuario

mostrarEditarUsuarioFormBtn.addEventListener('click', () => {
    editarUsuarioForm.classList.toggle('hidden');
});

    //EDITAR USUARIO
    editarUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editarUsuarioForm);
        const id = formData.get('editID');
        const data =
        {
            nombre: formData.get('editNombre'),
            apellido: formData.get('editApellido'),
            direccion: formData.get('editDireccion'),
            mail: formData.get('editMail'),
            telefono: formData.get('editTelefono')
        }

        const response = await fetch(`/usuarios/${id}`,
            {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });

//--------------VALIDACION FORMULARIO DE CONTACTO

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()