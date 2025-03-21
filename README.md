# Reto de Programación Franki - Aplicación de Gestión de Tareas

## Descripción del Proyecto

La empresa ABC ha solicitado el desarrollo de una aplicación de gestión de tareas que permita a los usuarios crear, editar, listar y eliminar tareas. La aplicación está compuesta por un **frontend** desarrollado con **React** y un **backend** implementado con **Node.js**, utilizando un archivo JSON como base de datos para almacenar las tareas.

### Especificaciones Técnicas

- **Frontend**: Implementado con React (TypeScript) y estilos gestionados con Tailwind CSS.
- **Backend**: Desarrollado con Node.js y Express.
- **Base de Datos**: Archivo JSON que se sobrescribe según las acciones del usuario.

### Funcionalidades Principales

1. **Crear tareas**:
   - Título obligatorio (entre 1 y 100 caracteres).
   - Descripción opcional (entre 1 y 200 caracteres).
2. **Editar tareas**:
   - Permite modificar el título y la descripción respetando las mismas reglas de validación.
3. **Listar tareas**:
   - Muestra todas las tareas existentes al cargar la página.
4. **Eliminar tareas**:
   - Solicita confirmación antes de eliminar una tarea con opciones de "Cancelar" y "Confirmar".

---

## Historias de Usuario

### Historia 1: Crear una tarea

**Como** usuario,  
**quiero** poder crear una nueva tarea con un título obligatorio y una descripción opcional,  
**para** organizar mis actividades pendientes.

**Criterios de aceptación**:

- El título debe ser obligatorio y tener entre 1 y 100 caracteres.
- La descripción es opcional, pero si se incluye, debe tener entre 1 y 200 caracteres.
- Al guardar la tarea, esta debe aparecer en la lista de tareas.

---

### Historia 2: Editar una tarea

**Como** usuario,  
**quiero** poder editar el título y la descripción de una tarea existente,  
**para** actualizar la información de mis actividades.

**Criterios de aceptación**:

- El título y la descripción deben cumplir las mismas reglas de validación que al crear una tarea.
- Los cambios deben reflejarse inmediatamente en la lista de tareas.

---

### Historia 3: Listar tareas

**Como** usuario,  
**quiero** ver todas mis tareas al cargar la página,  
**para** tener una visión general de mis actividades pendientes y completadas.

**Criterios de aceptación**:

- Las tareas deben mostrarse ordenadas por fecha de creación (más recientes primero).
- Las tareas completadas deben estar visualmente diferenciadas de las pendientes.

---

### Historia 4: Eliminar una tarea

**Como** usuario,  
**quiero** poder eliminar una tarea,  
**para** mantener mi lista de tareas organizada.

**Criterios de aceptación**:

- Antes de eliminar una tarea, debe mostrarse un mensaje de confirmación con las opciones "Cancelar" y "Confirmar".
- Si se confirma, la tarea debe eliminarse de la lista.
- Si se cancela, no debe realizarse ninguna acción.

---

## Instrucciones para Ejecutar el Proyecto Localmente

### Requisitos Previos

- **Node.js** (versión 18 o superior).
- **npm** o **yarn** instalado.

### Pasos para el Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

4. El backend estará disponible en http://localhost:4000.

### Pasos para el Frontend

1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador en http://localhost:5173 para acceder a la aplicación.

## Estrategia de Manejo de Ramas

Al ser un proyecto pequeño, he trabajado únicamente en la rama `main`. Sin embargo, entiendo el flujo de trabajo recomendado para proyectos más grandes, que incluye el uso de ramas específicas para funcionalidades, correcciones y errores críticos. A continuación, detallo el flujo:

- **`main`**: Rama principal que contiene el código listo para producción.
- **`feature/*`**: Ramas dedicadas a nuevas funcionalidades (por ejemplo, `feature/create-task`).
- **`fix/*`**: Ramas para solucionar errores (por ejemplo, `fix/task-validation`).
- **`hotfix/*`**: Ramas para solucionar errores críticos en producción.

### Flujo de trabajo:

1. Crear una rama a partir de `main`.
2. Realizar los cambios y realizar commits descriptivos.
3. Abrir un Pull Request hacia `main` y solicitar revisión.
4. Fusionar la rama una vez aprobada.

---

## Tecnologías Utilizadas

- **Frontend**:
  - React (TypeScript)
  - Tailwind CSS
  - Vite
- **Backend**:
  - Node.js
  - Express
  - UUID
- **Base de Datos**:
  - Archivo JSON
- **Herramientas de Desarrollo**:
  - ESLint
  - TypeScript
