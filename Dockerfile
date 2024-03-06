FROM node
# Устанавливаем рабочую директорию
WORKDIR /app
# Устанавливаем переменные окружения
ENV DATABASE_URL = postgres://postgres:postgres@31.129.51.91:5432/clothest
# Копируем обе части приложения (клиентскую и серверную) в контейнер
COPY . .
# Установка зависимостей и сборка клиентской части
RUN cd client && npm install --legacy-peer-deps && npm run build
# Установка зависимостей для серверной части
RUN cd server && npm ci
# Определяем порт, который будет прослушивать сервер
EXPOSE 4000
# Запускаем сервер при запуске контейнера
CMD [ "node", "server/app.js" ]