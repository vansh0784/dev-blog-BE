# 🚀 GraphQL Auth Notes (NestJS)

## 🧠 Big Picture

GraphQL uses a **single endpoint (`/graphql`)** and resolves operations using structured types and resolvers.

---

## 🔄 Complete Flow (IMPORTANT)

```
Client (GraphQL)
   ↓
Guard (JWT check)
   ↓
Resolver (entry point)
   ↓
Service (business logic)
   ↓
UserService (DB operations)
   ↓
Database
```

---

## 🧩 Core Concepts

### 1. Types (Schema Layer)

#### 🔹 InputType

Defines what client sends

```ts
@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
```

#### 🔹 ObjectType

Defines what server returns

```ts
@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;
}
```

👉 Think: **Contract between client & server**

---

### 2. Mutation

Used for **modifying data**

Examples:

- signup
- login
- updateProfile

```ts
@Mutation(() => AuthResponse)
login(@Args('input') input: LoginInput) {}
```

👉 Equivalent to `POST/PUT/DELETE` in REST

---

### 3. Query

Used for **fetching data**

```ts
@Query(() => UserType)
me() {}
```

👉 Equivalent to `GET` in REST

---

### 4. Resolver

Acts like a **controller**

```ts
@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }
}
```

👉 Responsibilities:

- Receive request
- Call service
- Return response

---

### 5. Service (Business Logic)

Handles:

- password hashing
- validation
- token generation

```ts
async login(input: LoginInput) {
  const user = await this.userService.findByEmail(input.email);
  // validate + generate token
}
```

---

### 6. UserService (DB Layer)

Handles database operations

```ts
create();
findByEmail();
findById();
update();
```

👉 Keeps DB logic separate and reusable

---

### 7. Entity (Database Schema)

Defines DB structure

```ts
@Entity()
export class User {
  @Column()
  email: string;

  @Column()
  password: string;
}
```

---

## 🔐 Authentication (JWT)

### Flow:

1. User logs in
2. Server returns JWT token
3. Client sends token in header

```
Authorization: Bearer <token>
```

---

### JWT Strategy

Validates token

```ts
validate(payload) {
  return { userId: payload.userId };
}
```

---

### Guard (Security Layer)

```ts
@UseGuards(GqlAuthGuard)
```

👉 Blocks unauthorized access

---

## 🧠 Important Patterns

### Separation of Concerns

| Layer       | Responsibility   |
| ----------- | ---------------- |
| Resolver    | Request handling |
| Service     | Business logic   |
| UserService | DB operations    |
| Entity      | Structure        |

---

## ⚠️ Common Mistakes

❌ Putting DB logic in resolver
❌ Returning password in response
❌ Not using InputTypes
❌ Skipping service layer
❌ No authentication guard

---

## 💡 Best Practices

✅ Always hash passwords
✅ Use InputTypes for mutations
✅ Keep resolvers thin
✅ Centralize DB logic in services
✅ Use guards for protected routes
✅ Never expose sensitive fields

---

## 🔥 Example Flow (Login)

```
Mutation (login)
   ↓
Resolver
   ↓
AuthService
   ↓
UserService.findByEmail()
   ↓
Compare password
   ↓
Generate JWT
   ↓
Return token
```

---

## 🚀 Advanced Topics (Next)

- Refresh Tokens
- Role-based Auth (RBAC)
- GraphQL Middleware / Interceptors
- DataLoader (performance optimization)
- Pagination (cursor-based)
- Error handling in GraphQL

---

## 🧠 One-Line Summary

👉 GraphQL = **Types + Resolver + Service + Security**

---

## 🎯 Your Current Progress

- Types ✅
- Resolver ✅
- Service ✅
- UserService ✅
- JWT ⏳
- Guard ⏳

---

## 🚀 Next Step

👉 Implement JWT + Guard to secure routes

---

**End of Notes** 🎯
