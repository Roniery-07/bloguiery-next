{
"title": "How I Started Building a Bag Shop",
"date": "2025-12-18T14:30:00-03:00",
"description": "Building a bag shop without any experience at full-stack dev",
"tags": ["react", "node", "prisma", "postgres"],
"categories": ["development"]
}

---
  
## Initial Motivation

The motivation for this project was quite simple, my sister owns a bag shop, so I combined my need to build a full-stack project with her need to expand her shop to the internet. I essentially killed two birds with one rock.

---
## Planning
First, I needed to decide on the project's architecture. Since I started this when I was still taking my first steps in full-stack development, I decided to use the most  intuitive and easy to use framework(in my opinion), so the framework picked was `Next.js`.

> **Important note:** I decided to leverage the API capabilities provided by `Next.js`. This means that my entire project, from frontend to database logic, resides within a single repository (monorepo).

Furthermore, I needed to choose a database. In this case, I didn't apply any strict criteria, I simply chose the `Postgres` paired with an ORM(Object-Relational Mapping). My choice was `Prisma`.

For styling, I went with Tailwind CSS. To be honest, I didn't exactly "choose" it, I just did the stanart Next.js installation and it came out of the box.(lol)

Here is a table containing the used tech stack

| frontend    | backend              | devops |
| ----------- | -------------------- | ------ |
| Next.js     | Next.js Internal API | Docker |
| TailwindCSS | Postgres             |        |
|             | PrismaORM            |        |
|             | Better-Auth          |        |

## Application Architecture
When building this site, I didn't want to just "make it work", I wanted to practice software development best practices. Therefore, I started researching to find an architecture that would best fit my project.

I found some point interesting architectural patterns, including Hexagonal Architecture and Clean Architecture. I decided to go with **Clean Architecture** as it seemed slightly simpler than Hexagonal for this context.

---

## Clean Architecture
O ponto principal da arquitetura limpa é o desacoplamento entre as camadas da aplicação, segundo ela teremos 3 camadas:
The main point of Clean Architecture is the decoupling between the application layers. According to this pattern, we have 3 main layers:

- Core
- Usecases
- Interface

### 1. Core
The Core is where all the domain logic resides. Since we are talking about a bag shop, all the logic for adding bags to stock, removing discontinued items, processing payments, applying discount coupons, and everything else related to the business must exist within the core. It must be the **single source of truth**. The Core should not know about the outer layers. This means your code must work independently of other layers and even libraries if we follow the pattern strictly. Furthermore, this is where we create contracts (interfaces) for the outer layers, such as repository contracts, errors, etc.

Code Example:
```typescript
type BagProps = {
	id: string,
	name: string,
	price: number,
	quantity: number
}

class Bag{
	private constructor(private props: BagProps){}
	
	public static create(name: string, price: number, quantity: number = 0){
		return new Bag({
			id: crypto.randomUUID().toString(),
			name,
			price,
			quantity
		})
	}
	
	public updatePrice(newPrice: number){
		if(newPrice <= 0){
			throw new Error("Preço não pode ser menor ou igual a zero!")
			return;
		}
		
		this.props.price = newPrice
	}
	
	public updateQuantity(newQuantity: number){
		this.props.quantity = newQuantity
	}
}

interface BagGateway{
	save(bag: Bag): Promise<void>;
	get(id: string): Promise<Bag>;
} 
```

### 2. Usecases
The Usecases layer is where we orchestrate the business rules to perform more complex operations. Additionally, we inject a repository dependency (database interaction) here. This way, we can add data to the database within the usecase.

For example, when adding a bag, we initially create a Bag entity (using the Core layer). After creating the object, we insert it into the database using the repository gateway.

Code example:
```typescript
class GetBagUsecase{
	private constructor(private readonly bagGateway : BagGateway){}
	
	public static create(bagGateway: BagGateway){
		return new GetBagUsecase(bagGateway);
	}
	
	public async execute(id: string){
		const bag = await this.bagGateway.get(id);
		if(bag === null) throw new Error("No bag found with this ID!")
		
		return {
			id: bag.id,
			name: bag.name,
			price: bag.price
		}
	}
}

```

### 3. Interface Adapters/Infrastructure
The Interface Adapters (or Infrastructure) layer is responsible for adapting external libraries to our project. As mentioned in the usecases layer, we inject a repository dependency. In this case, that dependency is an **interface**. Therefore, any class that implements this interface must obey the rules proposed by it.

This way, we achieve low coupling and follow the SOLID principle that tells us to depend on interfaces (abstractions), not implementations.

Code example:
```typescript
class BagRepositoryPrisma implements BagGateway{
	private constructor(private readonly prismaClient: PrismaClient){}
	
	public static create(prismaClient: PrismaClient){
		return new BagRepositoryPrisma(prismaClient)
	}
	
	public async save(bag: Bag){
		await this.prismaClient.bag.create({...bag})
	}
	public async get(id: string){
		const bag = await this.prismaClient.bag.findUnique({where: {id}})
		
		return bag
	}
}
```


Clean Architecture is quite complex for those just starting out, but it is a great way to learn more about software development best practices, such as **Dependency Inversion** and **Abstraction**.

## Current Status & Next Steps

The site is still under construction. The last missing piece—and in this case, the most important one—is the checkout and payment gateway integration. Eventually, I will post here about how I implemented that gateway.
In upcoming posts, I will also detail how I implemented authentication and authorization.