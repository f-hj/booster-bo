FROM node:12 as builder

WORKDIR /app
COPY package.json .
COPY yarn.lock .

# add credentials on build
ARG BOOSTER_JS_PULL_KEY
RUN mkdir /root/.ssh/
RUN echo "${BOOSTER_JS_PULL_KEY}" > /root/.ssh/id_rsa

RUN yarn

COPY . .
RUN yarn build


FROM nginx:1.15-alpine

# Copy site file
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration for site
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]

