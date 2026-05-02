# TAREA

**Implementar una aplicación web con Express**

Objetivo: Implementar un frontend que pueda integrase a los endpoints del servidor.

Requisitos previos:

- Agregar los siguiente campos y restricciones al modelo **User**:

| lastName | String, requerido |
|---|---|
| password | min, 8 caracteres, min 1 mayúscula, min 1 dígito, min un caracter especial ( # $ % & * @ ) |
| phoneNumer | String, requerido |
| birthdate | requerido (calcular edad) |
| url_profile | String |
| adress | String |

- Registrar al menos 1 usuario con el rol **admin** desde la base de datos o creando un archivo **seedUsers.js** en la carpeta /src/utils y llamándolo desde **server.js**.

Instrucciones y recomendaciones:

- Utilizar EJS como motor de plantillas.
- Utilizar Materialize para el diseño de la web.

Páginas principales:

1. **SignIn**
   - Formulario con email y password.
   - Llama a POST /api/auth/signIn.
   - Guarda el token JWT en sessionStorage.
   - Tras iniciar sesión => redirigir al **Dashboard** correspondiente para su rol.

2. **SignUp**
   - Formulario con name, lastName, phoneNumber, birthdate, email, password.
   - Llama a POST /api/auth/signUp.
   - Puede asignar por defecto el rol user.
   - Tras registrarse => redirigir a **SignIn**.

3. **Profile (Mi cuenta)**
   - Llama a GET /api/users/me con token JWT.
   - Muestra todos los datos del usuario y permite editarlos.

4. **Dashboard de usuario (rol: user)**
   - Ejemplo: "Bienvenido, aquí están tus datos".
   - Reglas: solo usuarios logueados con rol user (o superior).

5. **Dashboard de administrador (rol: admin)**
   - Accede a GET /api/users para listar todos los usuarios.
   - Lista todos los usuarios en una tabla indicando la fecha de registro y otros datos.
   - Botón para ver información de cada usuario.
   - Reglas: solo accesible si **req.userRoles** incluye **admin**.

6. **Página 403 – Acceso denegado:** Se muestra cuando un usuario intenta acceder a una ruta protegida sin rol suficiente.

7. **Página 404 – No encontrada**: Para rutas inexistentes.

Reglas de navegación

- Protección de rutas:
  - Si no hay token JWT válido => redirigir siempre a /signIn.
  - Si hay token expirado => cerrar sesión automáticamente y volver a /signIn.
- Roles:
  - **user**: acceso a su propio **perfil** y **dashboard** de usuario.
  - **admin**: acceso al **dashboard** de administrador (además de lo que puede un rol **user**).
