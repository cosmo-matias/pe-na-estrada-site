# Pé Na Estrada Tour - Plataforma Web

Um site moderno e dinâmico para uma agência de turismo, contando com uma vitrine atrativa de passeios para clientes e um painel de controle (CMS) completo para gestão de conteúdo.

## Stack de Tecnologias

- **Next.js (React):** Framework moderno para construção da interface e rotas.
- **Tailwind CSS:** Para estilização rápida, responsiva e customizada.
- **Firebase:** Utilizado para o banco de dados (Firestore), autenticação de administradores (Auth) e hospedagem do site estático (Hosting).
- **ImgBB API:** Serviço integrado para hospedagem gratuita das imagens dos passeios e do slideshow.

## Funcionalidades

### Vitrine (Público)
- Slideshow dinâmico na capa carregado diretamente do painel de administração.
- Listagem de passeios em cards atrativos.
- Modal de detalhes com informações completas e formatação amigável.
- Redirecionamento direto para reserva via WhatsApp com mensagens pré-configuradas.

### Painel Admin (CMS)
- Autenticação segura via Firebase.
- CRUD Completo (Criar, Ler, Atualizar, Excluir) para gestão dos passeios.
- Upload automático de imagens e gerenciamento das fotos dos pacotes.
- Gerenciamento dinâmico exclusivo para as imagens do slideshow da capa.

## Configuração Local e Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone https://github.com/cosmo-matias/pe-na-estrada-site.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd pe-na-estrada-site
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000` no seu navegador.

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto contendo as chaves do Firebase e a chave de API do ImgBB, conforme o exemplo abaixo:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_IMGBB_API_KEY=sua_chave_do_imgbb
```

## Deploy

O projeto foi configurado para **exportação estática** no Next.js (utilizando `output: 'export'` no `next.config.ts`), o que permite hospedar a plataforma com máxima performance e baixo custo através do Firebase Hosting. O deploy pode ser feito compilando os arquivos com `npm run build` e em seguida enviando-os usando `firebase deploy --only hosting`.
