# Используем официальный Node.js образ
FROM node:18-bullseye

# Устанавливаем системные зависимости для React Native
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    build-essential \
    libc6-dev \
    libstdc++6 \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    libsqlite3-dev \
    libbz2-dev \
    liblzma-dev \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Watchman для Metro bundler
RUN git clone https://github.com/facebook/watchman.git /tmp/watchman \
    && cd /tmp/watchman \
    && git checkout v2023.11.13.00 \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install \
    && cd / \
    && rm -rf /tmp/watchman

# Устанавливаем Expo CLI глобально
RUN npm install -g @expo/cli@latest

# Устанавливаем React Native CLI
RUN npm install -g react-native-cli

# Устанавливаем EAS CLI
RUN npm install -g @expo/eas-cli

# Создаем рабочую директорию
WORKDIR /workspaces/nebula-sports

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Устанавливаем Expo зависимости
RUN npx expo install --fix

# Открываем порты
EXPOSE 8081 19000 19001 19002

# Команда по умолчанию
CMD ["npm", "start"]
