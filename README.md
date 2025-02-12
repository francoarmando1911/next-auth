# Next.js Auth System

Este proyecto es un sistema de autenticación basado en **Next.js** con una integración de backend que permite:
- **Registro de usuarios** con validaciones avanzadas
- **Inicio de sesión** con verificación de credenciales
- **Recuperación de contraseña** mediante envío de correos con **Resend**
- **Seguridad** con **bcrypt** para el hash de contraseñas y **jsonwebtoken (JWT)** para la autenticación

## Tecnologías utilizadas
- **Next.js**
- **MongoDB**
- **Bcrypt.js**
- **jsonwebtoken (JWT)**
- **Resend (para envío de emails)**

## Endpoints principales
### Registro (`/api/auth/register`)
- Validación de campos requeridos
- Verificación de formato de email
- Hash de contraseña con bcrypt
- Generación de token JWT

### Login (`/api/auth/login`)
- Verificación de email registrado
- Comparación de contraseña con bcrypt
- Generación de token JWT para sesión

### Recuperación de contraseña (`/api/auth/forgot-password`)
- Validación de email existente
- Generación de enlace de recuperación
- Envío de email con Resend

## Estado del proyecto
✅ Backend completado (API funcional)
🔄 Desarrollo del frontend en proceso

