# ReplyLI — Asistente de respuestas LinkedIn con IA

App web mobile-first para generar respuestas estratégicas a posts de LinkedIn usando IA.

## Estructura del proyecto

```
linkedin-replies/
├── api/
│   └── generate.js      ← Función serverless (llama a Anthropic)
├── public/
│   └── index.html       ← App frontend
├── vercel.json          ← Configuración Vercel
└── package.json
```

## Despliegue en Vercel (paso a paso)

### 1. Subir a GitHub
1. Crea un repositorio nuevo en github.com (ej: `replyLI`)
2. Sube todos estos archivos manteniendo la estructura de carpetas

### 2. Conectar con Vercel
1. Ve a vercel.com → "Add New Project"
2. Importa el repositorio de GitHub
3. Vercel detecta la configuración automáticamente
4. Clic en "Deploy"

### 3. Agregar la API Key de Anthropic
1. En Vercel → tu proyecto → "Settings" → "Environment Variables"
2. Agrega:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-XXXX...` (tu clave de console.anthropic.com)
3. Clic en "Save"
4. Ve a "Deployments" → clic en los tres puntos → "Redeploy"

### 4. Listo
Tu app estará en: `https://replyLI.vercel.app` (o el nombre que elijas)

## Tonos disponibles
- 🧠 **Formal** — Profesional y estructurado
- 💬 **Casual** — Cercano y natural  
- 🤝 **Empático** — Conecta con el autor
- ♟️ **Estratégico** — Posiciona tu marca personal

## Variables de entorno requeridas
| Variable | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | Clave API de Anthropic (console.anthropic.com) |
