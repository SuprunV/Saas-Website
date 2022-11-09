# Define base image
FROM mcr.microsoft.com/dotnet/sdk:6.0.402-alpine3.16 AS builder

# Copy project files
WORKDIR /source
COPY ./*.csproj .

# Restore
RUN dotnet restore

# Copy all source code
COPY . .

# Publish
WORKDIR /source
RUN dotnet publish "server.csproj" -c Release -o /publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0.10-alpine3.16
WORKDIR /app
COPY --from=builder /publish .

EXPOSE 80


RUN addgroup -S runner && adduser -S runner -G runner
USER runner
ENTRYPOINT ["dotnet", "server.dll"]
