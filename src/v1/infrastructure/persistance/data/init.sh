#!/bin/bash

# Create a database
psql -c "CREATE DATABASE ${POSTGRES_DATABASE_NAME};"

# Create a user with password
psql -c "CREATE USER ${POSTGRES_USERNAME} WITH PASSWORD ${POSTGRES_PASSWORD};"

# Grant privileges to the user
psql -c "GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DATABASE_NAME} TO ${POSTGRES_USERNAME};"

# Additional tasks (optional)
# - Import initial data
# - Set custom configurations

echo "Database initialization complete!!"
