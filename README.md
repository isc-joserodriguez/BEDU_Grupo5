# BEDU | Grupo 5 | RESTaurant
----
## Contenido
- [Usuarios de ejemplo](#usuarios)
- [Autores](#autores)

### [--- Abrir Deploy ---](https://joanrodriguezhe.github.io/BEDU_Grupo5)

Para el avance, hay que tomar algunos puntos en cuenta:

- Actualmente tiene peticiones a la API para la autenticación y registro de usuarios.
- En root ```/``` tenemos el login (abajo están 4 usuarios por defecto con sus credenciales).
- El registro "general"  en ```/signup``` está pensado para que un cliente pueda registrarse sin necesidad de algún permiso.
- Para usar el componente "New User" de "Admin" en ```/admin/new-user```, debe estar autenticado como administrador (sólo el administrador puede crear a otros usuarios no clientes).
- En el componente "Cliente" se muestra un ejemplo del menú que puede ser filtrado por favoritos y por recientes
- En el componente "Chef" se muestran algunos pedidos que pueden ser filtrados con el buscador o con el botón del estatus.
- En el componente "Mesero" se muestra un grid con algunos ejemplos de pedidos con sus estatus.
- Casi todos los componentes son responsivos y se le agregó un Side Drawer para reemplazar el Nav en pantallas pequeñas.

<a name="usuarios"></a>

| Tipo de usuario | Correo | Contraseña |
| ------------- | ------------- | ------------- |
| Administrador | admin2@admin.com | 123456 |
| Chef | chef2@chef.com | 123456 |
| Mesero | mesero2@mesero.com | 123456 |
| Cliente | cliente2@cliente.com | 123456 |



<a name="autores"></a>

### Autores
- ##### [Adrian-BT](https://github.com/Adrian-BT)
- ##### [diegosv6910](https://github.com/diegosv6910)
- ##### [NathalyNDC](https://github.com/NathalyNDC)
- ##### [joanrodriguezhe](https://github.com/joanrodriguezhe)
