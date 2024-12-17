FROM postgres:15-alpine

# Copy the initialization scripts from the builder stage
COPY init.sh /docker-entrypoint-initdb.d/
COPY sqlCreation.sql /docker-entrypoint-initdb.d/

# Set the user to postgres
USER POSTGRES_USER

# Expose the default PostgreSQL port
EXPOSE 5432

# Entrypoint to start PostgreSQL
ENTRYPOINT ["postgres"]