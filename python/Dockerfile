FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y gcc bash && apt-get clean

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Torna o wrapper executável
RUN chmod +x wrapper.sh

# Usa o wrapper como entrypoint
CMD ["python", "-u", "producer.py"]