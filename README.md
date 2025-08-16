# Client Onboarding Form

A modern, accessible client onboarding form built with Next.js, React Hook Form, and Zod validation.

## 🚀 Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure
4. Run development server: `npm run dev`

## 🛠 Tech Stack

- **Next.js 15.4.6 with App Router
- **React Hook Form** for form state management
- **Zod** for schema validation
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## 🏗 Architecture

### React Hook Form + Zod Integration

The form uses `zodResolver` from `@hookform/resolvers/zod` to integrate Zod schemas with React Hook Form:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm<OnboardingFormData>({
  resolver: zodResolver(onboardingSchema)
})
```
## Pragith Thilakarathna