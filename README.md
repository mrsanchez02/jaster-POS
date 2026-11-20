# Taller Razer POS

Aplicación web progresiva (PWA) para el control de vehículos, catálogo de servicios y facturación de **Taller Razer**.

Está diseñada para el uso diario del dueño del taller, principalmente desde dispositivos móviles, y funciona completamente del lado del cliente.

## Funcionalidades

- Registro y edición de facturas.
- Datos del cliente y del vehículo:
  - Nombre.
  - Modelo.
  - Placa.
  - Año.
  - Teléfono.
- Selección de servicios activos desde el catálogo.
- Edición de precio, descripción y cantidad dentro de una factura.
- Cálculo de subtotal, ITBIS del 18% y total.
- Búsqueda de facturas por número, cliente, placa o vehículo.
- Generación de facturas en PDF.
- Administración del catálogo de servicios:
  - Crear.
  - Editar.
  - Activar o desactivar.
  - Eliminar con confirmación.
- Búsqueda de servicios.
- Modal de configuración para exportar/importar respaldos y administrar las facturas.
- Respaldo mediante exportación e importación de archivos JSON.
- Persistencia local en el navegador.
- Instalación como PWA y funcionamiento offline después de la primera carga.
- Interfaz responsive con tarjetas optimizadas para móvil y tablas para pantallas grandes.
- Formularios móviles desplazables y adaptados al teclado de iOS.

## Tecnologías

- React.
- TypeScript.
- Vite.
- Tailwind CSS v4.
- jsPDF.
- vite-plugin-pwa.
- ESLint.

## Requisitos

- Node.js compatible con las versiones actuales de Vite.
- npm.

## Instalación

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la URL local disponible, normalmente `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| `npm run build` | Comprueba TypeScript y genera la build de producción junto con los archivos PWA. |
| `npm run preview` | Sirve localmente la build de producción. |

## Producción y PWA

Generar la build:

```bash
npm run build
```

Para revisar la versión compilada:

```bash
npm run preview
```

La configuración PWA se encuentra en `vite.config.ts`. El service worker se genera durante la build de producción. Para probar correctamente la instalación y el modo offline, se recomienda usar `npm run preview` o un servidor HTTPS de producción.

## Persistencia de datos

La aplicación no utiliza backend. Los datos se almacenan en `localStorage` con estas claves:

| Clave | Contenido |
| --- | --- |
| `taller_razer_db` | Facturas registradas. |
| `taller_razer_counter` | Contador utilizado para generar números de factura. |
| `taller_razer_services` | Catálogo de servicios. |

Las facturas conservan una copia histórica del nombre, descripción, precio y cantidad de cada servicio utilizado. Por eso, modificar o eliminar un servicio del catálogo no altera las facturas existentes.

## Respaldos JSON

Desde la aplicación se puede:

- **Exportar JSON:** descarga las facturas y servicios actuales.
- **Importar JSON:** agrega registros válidos que no existan previamente.

El formato de respaldo actual utiliza una estructura similar a:

```json
{
  "version": 2,
  "exportedAt": "2026-01-01T00:00:00.000Z",
  "facturas": [],
  "servicios": []
}
```

Se recomienda exportar respaldos periódicos, especialmente antes de limpiar datos del navegador o cambiar de dispositivo.

## Estructura principal

```text
.
├── public/
│   ├── pwa-192x192.svg
│   └── pwa-512x512.svg
├── src/
│   ├── App.tsx       # Interfaz y flujos principales
│   ├── data.ts       # ITBIS, claves de almacenamiento y catálogo inicial
│   ├── index.css     # Estilos globales y Tailwind
│   ├── lib.ts        # Persistencia, formato y generación de identificadores
│   ├── main.tsx      # Entrada de React y registro de la PWA
│   ├── pdf.ts        # Generación de facturas PDF
│   └── types.ts      # Tipos de facturas, servicios y respaldos
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

`Taller_Razer_2.html` es la implementación de referencia original. La aplicación ejecutable actual utiliza la implementación React dentro de `src/`.

## Flujo de uso recomendado

1. Abrir la pestaña **Servicios** y revisar el catálogo.
2. Crear, editar o desactivar los servicios necesarios.
3. Ir a **Facturación**.
4. Registrar los datos del cliente y del vehículo.
5. Seleccionar uno o más servicios.
6. Ajustar cantidades, precios o descripciones si es necesario.
7. Aplicar ITBIS cuando corresponda.
8. Guardar la factura.
9. Consultar, editar, eliminar o generar el PDF desde el listado.
10. Abrir **Configuración** desde el botón ⚙️ para exportar/importar datos o borrar facturas.
11. Exportar un respaldo periódicamente.

## Consideraciones importantes

- Los datos son locales al navegador y al dispositivo actual.
- Limpiar los datos del navegador puede eliminar las facturas y servicios guardados.
- No existe sincronización entre dispositivos.
- El archivo JSON exportado es el mecanismo de respaldo y migración disponible.
- La aplicación no contiene autenticación ni control de usuarios.

## Verificación antes de publicar

Ejecutar:

```bash
npm run lint
npm run build
```

También se recomienda probar manualmente:

- Crear, editar y eliminar una factura.
- Crear, activar/desactivar y eliminar un servicio.
- Buscar en ambas secciones.
- Exportar e importar un respaldo JSON.
- Generar un PDF.
- Recargar y comprobar la persistencia.
- Instalar la PWA y comprobar el uso offline.

## Publicación en GitHub

Después de crear el repositorio remoto:

```bash
git init
git add .
git commit -m "docs: document project setup and usage"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Antes del primer commit, verifica que no se incluyan credenciales, datos personales reales ni archivos de respaldo con información del taller.
