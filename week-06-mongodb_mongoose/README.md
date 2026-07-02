# Proyecto Semana 06 — API REST con MongoDB + Mongoose

## Dominio: Empresa de Mensajería

API REST para gestionar paquetes y clientes de una empresa de mensajería (courier).

---

## Entidades

### Customer (Entidad Secundaria)

| Campo     | Tipo   | Requerido | Descripción             |
|-----------|--------|-----------|-------------------------|
| name      | String | Sí        | Nombre completo         |
| email     | String | Sí        | Email único del cliente |
| phone     | String | Sí        | Teléfono de contacto    |
| address   | String | Sí        | Dirección de entrega    |

### Package (Entidad Principal)

| Campo        | Tipo      | Requerido | Descripción                                       |
|--------------|-----------|-----------|---------------------------------------------------|
| trackingCode | String    | Sí        | Código de seguimiento único (UPPERCASE)           |
| description  | String    | Sí        | Descripción del contenido                         |
| weightKg     | Number    | Sí        | Peso en kilogramos                                |
| status       | String    | No        | Estado: `pending` `in_transit` `delivered` `returned` |
| customer     | ObjectId  | Sí        | Referencia al cliente (populate)                  |

---

## Endpoints

### Customers — `/api/v1/customers`

| Método | Ruta               | Descripción             | Status |
|--------|--------------------|-------------------------|--------|
| GET    | `/`                | Listar todos            | 200    |
| GET    | `/:id`             | Obtener por ID          | 200    |
| POST   | `/`                | Crear cliente           | 201    |
| PUT    | `/:id`             | Actualizar cliente      | 200    |
| DELETE | `/:id`             | Eliminar cliente        | 204    |

### Packages — `/api/v1/packages`

| Método | Ruta               | Descripción                         | Status |
|--------|--------------------|-------------------------------------|--------|
| GET    | `/`                | Listar con paginación + populate    | 200    |
| GET    | `/:id`             | Obtener con populate                | 200    |
| POST   | `/`                | Crear paquete                       | 201    |
| PUT    | `/:id`             | Actualizar paquete                  | 200    |
| DELETE | `/:id`             | Eliminar paquete                    | 204    |

### Paginación

```
GET /api/v1/packages?page=1&limit=10&search=PKG
```

```json
{
  "data": [...],
  "total": 6,
  "page": 1,
  "totalPages": 1
}
```

---

## Errores manejados

| Código | Causa                                    |
|--------|------------------------------------------|
| 400    | ID con formato inválido o datos Zod      |
| 404    | Recurso no encontrado                    |
| 409    | `trackingCode` o `email` duplicado       |

---

## Stack

```
Node.js 22 | Express 5.1.0 | TypeScript 5.8.3
Mongoose 9.4.1 | MongoDB 7 (Docker) | Zod 4.3.6
```

---

## Levantar el proyecto

```bash
# 1. Iniciar MongoDB
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Crear .env (copiar del ejemplo)
cp .env.example .env

# 4. Cargar datos de prueba
pnpm seed

# 5. Iniciar servidor
pnpm dev
```

---

## Evidencia

### GET /api/v1/packages — populate funcionando (200 OK)

![GET packages populate](assets/get-packages-populate.png)

### POST /api/v1/packages — 201 Created

![POST packages 201](assets/post-packages-201.png)

### POST /api/v1/packages — 400 ID inválido

![POST packages 400](assets/post-packages-400-id-invalido.png)

### POST /api/v1/packages — 409 Duplicado

![POST packages 409](assets/post-packages-409-duplicado.png)
