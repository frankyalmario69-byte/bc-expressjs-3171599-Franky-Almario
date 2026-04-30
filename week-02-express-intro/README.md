# Proyecto Semana 02 — Servidor Express con CRUD completo

## Objetivo

Construir una API REST con Express 5 y TypeScript para el dominio **Empresa de Mensajería (Courier)**: gestión de paquetes con operaciones CRUD, middlewares personalizados y manejo correcto de códigos HTTP.

---

## Dominio: Empresa de Mensajería

**Recurso principal:** Paquete (`Package`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | Identificador autoincremental |
| `trackingCode` | `string` | Código de seguimiento único |
| `status` | `'pending' \| 'in_transit' \| 'delivered' \| 'cancelled'` | Estado del paquete |
| `weightKg` | `number` | Peso en kilogramos |
| `destination` | `string` | Ciudad o dirección de destino |
| `customerName` | `string` | Nombre del cliente remitente |
| `driverName` | `string` | Nombre del conductor asignado |

---

## Estructura del proyecto

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts                   # Express: middlewares + rutas
    ├── server.ts                # Entry point + graceful shutdown
    ├── types.ts                 # Interfaz Item (Package)
    ├── store.ts                 # Store en memoria con CRUD
    └── routes/
        └── items.routes.ts      # 5 endpoints CRUD
```

---

## Endpoints

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/packages` | Listar todos los paquetes | 200 |
| GET | `/api/v1/packages/:id` | Obtener paquete por ID | 200 / 404 |
| POST | `/api/v1/packages` | Crear un nuevo paquete | 201 |
| PUT | `/api/v1/packages/:id` | Actualizar un paquete | 200 / 404 |
| DELETE | `/api/v1/packages/:id` | Eliminar un paquete | 204 / 404 |

---

## Middlewares registrados

1. `express.json()` — parseo de body
2. Logger personalizado — registra timestamp, método y URL
3. `/health` — health check
4. `/api/v1/packages` — rutas del recurso
5. Handler 404 — rutas no encontradas
6. Error handler global — siempre último

---

## Pruebas con curl

```bash
# Listar todos
curl http://localhost:3000/api/v1/packages

# Crear
curl -X POST http://localhost:3000/api/v1/packages \
  -H "Content-Type: application/json" \
  -d '{
    "trackingCode": "PKG-001",
    "status": "pending",
    "weightKg": 2.5,
    "destination": "Bogotá",
    "customerName": "Juan García",
    "driverName": "Carlos López"
  }'

# Obtener por ID
curl http://localhost:3000/api/v1/packages/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/packages/1 \
  -H "Content-Type: application/json" \
  -d '{ "status": "in_transit", "driverName": "Pedro Ruiz" }'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/packages/1
```

---

## Entregables

1. Código fuente adaptado a mi dominio
2. Screenshots de Postman o Thunder Client con las 5 operaciones funcionando
3. README describiendo el dominio, recurso implementado y decisiones de diseño

---

## Criterios de evaluación

Ver [rubrica-evaluacion.md](../../rubrica-evaluacion.md) sección "Proyecto Semanal".
