# API para Minihook - Conversão de Imagens

## 🚀 Deploy no GitHub + Vercel (Recomendado - GRATUITO)

### Opção 1: Deploy Automático na Vercel (Mais Fácil)

1. **Fazer push para GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

2. **Conectar no Vercel:**
   - Acesse: https://vercel.com
   - Clique em "Import Project"
   - Conecte seu repositório do GitHub
   - Vercel detecta automaticamente e faz deploy!

3. **Copiar URL da API:**
   - Após deploy, você recebe uma URL tipo: `https://seu-projeto.vercel.app`
   - Sua API estará em: `https://seu-projeto.vercel.app/api`

4. **Configurar URLs:**

No arquivo `Image to Roblox.html`, linha ~820:
```javascript
const API_BASE_URL = 'https://seu-projeto.vercel.app/api';
```

No arquivo `eae.txt`, linha ~1137:
```lua
local API_BASE_URL = "https://seu-projeto.vercel.app/api"
```

### Opção 2: Deploy Manual

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar servidor local:**
```bash
npm start
```

3. **Outras opções de hospedagem:**
- **Replit**: Importe o projeto e rode
- **Glitch**: Importe e rode
- **Railway**: Conecte seu repositório
- **Heroku**: Adicione `Procfile` com: `web: node api-server.js`

## Como funciona:

1. **Usuário cola link da imagem** no HTML
2. **HTML envia para API** → API processa e retorna código (ex: `abc123def456`)
3. **Usuário copia código** (16 caracteres)
4. **Usuário cola código no minihook**
5. **Script Lua busca na API** e carrega a imagem automaticamente

## Endpoints:

- `POST /api/process-image` - Processa imagem e retorna código
- `GET /api/get-image/:code` - Busca JSON pelo código
- `GET /api/health` - Status da API

## 📁 Estrutura de Arquivos:

- `api-server.js` - Servidor Express (para deploy manual)
- `api/` - Funções serverless para Vercel
  - `process-image.js` - Processa imagem e retorna código
  - `get-image/[code].js` - Busca JSON pelo código
  - `health.js` - Status da API
- `vercel.json` - Configuração do Vercel
- `.github/workflows/deploy.yml` - Deploy automático (opcional)

## 🔧 Variáveis de Ambiente:

- `PORT` - Porta do servidor (padrão: 3000, apenas para servidor local)

## ⚡ Vercel (Recomendado):

- **Gratuito** para projetos pessoais
- **Deploy automático** a cada push
- **Serverless functions** - escala automaticamente
- **HTTPS** incluído
- **Sem configuração** de servidor

## 📝 Notas:

- Cache é em memória (limite de 50MB no Vercel)
- Códigos expiram após 1 hora
- Para produção, considere usar Redis para cache compartilhado

