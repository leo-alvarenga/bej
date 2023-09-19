FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

ENV PORT 8080
ENV ENV prd

EXPOSE 8080

CMD [ "bun", "start" ]
