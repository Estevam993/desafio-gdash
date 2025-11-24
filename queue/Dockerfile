FROM golang:1.25 AS builder

WORKDIR /app

# Copia os mod e instala dependências
COPY go.mod go.sum ./
RUN go mod download

# Copia o código
COPY . .

# Compila o binário
RUN go build -o consumer main.go

FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/consumer .

CMD ["./consumer"]
