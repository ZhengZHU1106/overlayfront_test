FROM python:3.9-slim

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# 覆盖默认的 CMD 以监听 0.0.0.0 但使用 5000 端口
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
