# 🚀 Guia de Deploy - GitHub + Vercel

## Passo a Passo Completo:

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Crie um novo repositório (ex: `minihook-api`)
3. **NÃO** inicialize com README (já temos arquivos)

### 2️⃣ Fazer Push do Código

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit: Minihook API"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/minihook-api.git
git push -u origin main
```

### 3️⃣ Deploy na Vercel (GRATUITO)

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Importe seu repositório `minihook-api`
5. Vercel detecta automaticamente:
   - ✅ Framework: Other
   - ✅ Build Command: (deixe vazio)
   - ✅ Output Directory: (deixe vazio)
6. Clique em **"Deploy"**

### 4️⃣ Copiar URL da API

Após deploy (2-3 minutos), você recebe:
- **URL**: `https://minihook-api.vercel.app`
- **API**: `https://minihook-api.vercel.app/api`

### 5️⃣ Configurar nos Arquivos

**No `Image to Roblox.html` (linha ~820):**
```javascript
const API_BASE_URL = 'https://minihook-api.vercel.app/api';
```

**No `eae.txt` (linha ~1137):**
```lua
local API_BASE_URL = "https://minihook-api.vercel.app/api"
```

### 6️⃣ Testar

1. Abra `Image to Roblox.html` no navegador
2. Cole um link de imagem
3. Deve retornar um código (ex: `abc123def4567890`)
4. Cole o código no minihook
5. Deve carregar a imagem! 🎉

## ✅ Pronto!

Agora você tem:
- ✅ API hospedada gratuitamente
- ✅ Deploy automático a cada push
- ✅ HTTPS incluído
- ✅ Sem necessidade de servidor próprio

## 🔄 Atualizar API

Sempre que fizer mudanças:
```bash
git add .
git commit -m "Update API"
git push
```

Vercel faz deploy automático em ~2 minutos!

## 📊 Monitoramento

- Acesse: https://vercel.com/dashboard
- Veja logs, métricas, etc.

## 🆘 Problemas?

- **Erro no deploy?** Verifique os logs no Vercel
- **API não funciona?** Teste: `https://sua-api.vercel.app/api/health`
- **Código não encontrado?** Cache expira em 1 hora

