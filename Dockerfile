FROM public.ecr.aws/docker/library/node:22-slim as development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM public.ecr.aws/docker/library/node:22-slim as production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM public.ecr.aws/docker/library/node:22-slim AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM public.ecr.aws/docker/library/node:22-slim
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]