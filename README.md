# Sinsay AI Verification PoC

A Proof of Concept for AI-powered product return and complaint verification using GPT-4o Vision.

## Quick Start

### Prerequisites

- Java 17 (OpenJDK)
- Node.js 18+
- OpenAI API key

### Environment Variables

```bash
export OPENAI_API_KEY="your-api-key-here"
```

### Run Backend (Port 8081)

```bash
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ./mvnw spring-boot:run
```

### Run Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Test Backend API

```bash
curl -X POST http://localhost:8081/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "PL-12345",
    "intent": "RETURN",
    "description": "I want to return this item",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

Expected: SSE stream with `data:0:"..."` chunks (Vercel Data Stream Protocol)

---

## Configuration

| File                                        | Purpose                      |
| ------------------------------------------- | ---------------------------- |
| `src/main/resources/application.properties` | BE config (port, DB, OpenAI) |
| `frontend/vite.config.ts`                   | FE dev server proxy          |
| `pom.xml`                                   | Maven dependencies           |

### Key Settings (`application.properties`)

```properties
spring.ai.openai.api-key=${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o
server.port=8081
```

---

## Project Structure

```
├── src/main/java/      # Spring Boot backend
├── frontend/           # React 19 + Vite frontend
├── docs/               # PRD, ADR documentation
└── sinsay_poc.db       # SQLite database (gitignored)
```

## Tech Stack

- **Backend**: Spring Boot 3.5.9, Spring AI 1.1.2, SQLite
- **Frontend**: React 19, Vercel AI SDK, assistant-ui, TailwindCSS
