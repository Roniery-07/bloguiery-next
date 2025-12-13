{
  "title": "Construindo um Blog do Zero: A Saga Full Stack",
  "date": "2025-01-15T10:00:00-03:00",
  "draft": false,
  "tags": ["javascript", "react"],
  "categories": ["dev"]
}
---

Criar um blog em 2025 pode parecer "reinventar a roda", mas é a **melhor forma** de consolidar conhecimentos em arquitetura de software. Neste post, vou dissecar como construí esta aplicação usando *JavaScript* de ponta a ponta.

## 1. A Stack Tecnológica

Não queria usar frameworks "mágicos" como Next.js logo de cara. O objetivo era entender as engrenagens. Minha escolha foi a arquitetura **Monorepo**:

* **Frontend:**
    * React (com Vite)
    * React Router (para navegação SPA)
    * `react-markdown` (para renderizar este texto que você está lendo)
* **Backend:**
    * Node.js & Express
    * PostgreSQL (Banco de dados relacional)
    * `pg` (Driver nativo, sem ORM pesado)
* **DevOps & Tooling:**
    * Docker (para o banco local)
    * NPM Workspaces (para gerenciar o monorepo)

---

## 2. Modelagem do Banco de Dados

A decisão de não usar ORM (como Prisma ou TypeORM) foi polêmica, mas necessária. Eu queria ter controle total sobre as queries.

> "Abstrações são ótimas, até que elas vazam e você não sabe SQL." — *Autor Desconhecido*

Aqui está como ficou a estrutura inicial da tabela de `posts`:

| Coluna | Tipo | Descrição |
| :--- | :---: | :--- |
| `id` | `UUID` | Identificador único gerado pelo banco |
| `slug` | `VARCHAR` | URL amigável (ex: `meu-primeiro-post`) |
| `title` | `VARCHAR` | Título do artigo |
| `body` | `TEXT` | O conteúdo em Markdown |
| `status` | `VARCHAR` | `draft` ou `published` |

## 3. Desafios de Código

Um dos maiores desafios foi configurar a paginação no Backend. Veja um trecho de como calculei o `offset` para buscar os posts:

```javascript
async function findAll({ page = 1, limit = 30 }) {
  // A matemática da paginação
  const offset = (page - 1) * limit;

  const query = {
    text: "select * from posts",
}
```

aqui está uma sample de outras linguagens:
```go
func main(){
   fmt.println("ola mundo")
}
```