import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/product(.*)', 
    '/sign-in', 
    '/sign-up', 
    '/search', 
    '/api/search',  // Adicione a rota /api/search às rotas públicas
    '/api/filter',   // Adicione a rota /api/filter às rotas públicas
    '/api/webhooks/user',
    '/api/webhooks/stripe'
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+\\.[\\w]+$)", 
    "/api/search",   // Ignora a autenticação para a rota /api/search
    "/api/filter"    // Ignora a autenticação para a rota /api/filter
  ]
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
};
