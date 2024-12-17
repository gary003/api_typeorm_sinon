#!/bin/bash

# Create a database
psql -c "CREATE DATABASE ${POSTGRES_DB};"

# Create a user with password
psql -c "CREATE USER ${POSTGRES_USER} WITH PASSWORD ${POSTGRES_PASSWORD};"

# Grant privileges to the user
psql -c "GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};"

# Additional tasks (optional)
# - Import initial data
# - Set custom configurations

echo "Database initialization complete!"
