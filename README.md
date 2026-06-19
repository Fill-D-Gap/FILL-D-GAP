# Fill D Gap

**Fill D Gap** es una plataforma web enfocada en conectar profesionales con oportunidades de registro dentro de una comunidad selecta.  
El objetivo principal del sitio es convertir visitas en registros rápidos y claros, guiando al usuario desde el primer impacto hasta el formulario de inscripción.

## Propósito del proyecto

La web está diseñada para:

- Presentar la propuesta de valor de la comunidad;
- Explicar por qué un profesional encaja en el proyecto;
- Captar registros de forma simple y directa;
- Almacenar los datos del formulario en una base de datos;
- Permitir la subida de documentos PDF como currículum.

## Estructura de la web

La experiencia del usuario sigue este flujo:

1. **Enganche**
2. **Beneficios clave**
3. **Formulario de registro**
4. **Sección Nosotros**

Esta estructura responde a una lógica de conversión: primero se capta la atención, luego se explica el valor de la comunidad y finalmente se completa el registro.

## Tecnologías utilizadas

### Frontend

- **React**
- **Tailwind CSS**
- **Lucide React**
- **React Icons**

### Backend / servicios

- **Supabase**
  - Base de datos PostgreSQL
  - Almacenamiento de archivos PDF

### Despliegue

- **Cloudflare Pages**
- **Cloudflare DNS**
- dominio personalizado: **filldgap.com**

### Control de código

- **GitHub**

## Funcionalidades principales

- Navegación por secciones con menú fijo;
- Diseño enfocado en conversión;
- Formulario de inscripción de talento;
- Validación de datos;
- Carga de CV en formato PDF;
- Almacenamiento de registros en Supabase;
- Soporte para dominio personalizado en producción.

## Variables de entorno

El proyecto utiliza estas variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Estas variables deben configurarse en **Cloudflare Pages** para que el formulario pueda conectar con Supabase en producción.

## Supabase

Supabase se utiliza para:

- Guardar los registros enviados desde el formulario;
- Almacenar el enlace público del PDF subido;



## Cloudflare Pages

El sitio está publicado en **Cloudflare Pages** y conectado al dominio:

- `https://filldgap.com`
- `https://www.filldgap.com`

Cloudflare Pages se usa para:

- Desplegar la pagina ;
- Servir la web con HTTPS;
- Conectar el dominio personalizado.

## Autoría

**Proyecto creado por Edwin Jiménez**  
Desarrollador de software freelance

## Contacto

- LinkedIn: [https://www.linkedin.com/in/edwin-jimenez12/](https://www.linkedin.com/in/edwin-jimenez12/)
- GitHub: [https://github.com/Edwin-Jimenez12](https://github.com/Edwin-Jimenez12)
- Email: [ed.jimenez0012@gmail.com](mailto:ed.jimenez0012@gmail.com)
- Ubicación: Panama City, Panama


## Instalación local

```bash
yarn install
yarn dev
```

## Build de producción

```bash
yarn build
```

## Notas técnicas

- Los archivos se suben a Supabase Storage.
- El formulario guarda la ruta pública del PDF en la base de datos.
- La aplicación está pensada para escalar el proceso de registro en futuras etapas.

