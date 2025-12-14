{
  "title": "Case Study: Criando um E-commerce de Bolsas Exclusivas",
  "date": "2025-12-14T14:30:00-03:00",
  "description": "Uma jornada fullstack desde a modelagem do banco de dados até a integração com gateway de pagamento.",
  "tags": ["react", "ecommerce", "node", "design"],
  "categories": ["portfolio"]
}
---

# A Jornada da "BagStore"

Criar uma loja virtual parece simples hoje em dia com ferramentas prontas, mas criar uma experiência **personalizada** e **performática** exige colocar a mão no código. Neste post, vou mostrar como desenvolvi a *BagStore*, uma loja de bolsas de luxo.

> "O design não é apenas o que parece e o que se sente. O design é como funciona." — *Steve Jobs*

---

## 1. O Planejamento e a Stack

Antes de escrever uma linha de código, defini a arquitetura. Eu precisava de algo que fosse rápido no carregamento (SEO) e seguro no backend.

### Tecnologias Escolhidas:

1.  **Frontend**:
    * React (Vite)
    * TailwindCSS (Estilização rápida)
    * Zustand (Gerenciamento de estado do carrinho)
2.  **Backend**:
    * Node.js + Express
    * PostgreSQL (Banco Relacional)
3.  **DevOps**:
    * Docker
    * CI/CD com GitHub Actions

---

## 2. Modelagem de Dados

O coração de um e-commerce é o seu catálogo. Diferente de um blog simples, bolsas possuem atributos variáveis (Cor, Material, Tamanho).

Aqui está como estruturei a tabela de produtos. Note o uso de `JSONB` para atributos flexíveis:

| Campo | Tipo | Descrição | Obrigatório? |
| :--- | :---: | :--- | :---: |
| `id` | UUID | Chave primária | Sim |
| `sku` | VARCHAR | Código único do produto | Sim |
| `price` | INTEGER | Preço em centavos (evita erro de float) | Sim |
| `attributes` | JSONB | Ex: `{"cor": "vermelho", "couro": "sintético"}` | Não |
| `stock` | INTEGER | Quantidade disponível | Sim |

---

## 3. Desafios no Código

### O Carrinho de Compras

Gerenciar o estado do carrinho no lado do cliente é desafiador. Usei um *hook* customizado para persistir os dados no `localStorage`.

Veja como ficou a lógica de adicionar itens:

```tsx
// src/store/cart.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
}

export const useCart = create((set) => ({
  items: [],
  addToCart: (product: CartItem) => set((state) => {
    const exists = state.items.find(i => i.id === product.id);
    
    if (exists) {
      return {
        items: state.items.map(i => 
          i.id === product.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      };
    }
    
    return { items: [...state.items, product] };
  }),
}));