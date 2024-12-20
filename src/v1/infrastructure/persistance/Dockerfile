FROM postgres:15-alpine

# Copy the initialization scripts from the builder stage
COPY ./data/* /docker-entrypoint-initdb.d/

# Set the user to postgres
USER postgres

# Expose the default PostgreSQL port
EXPOSE 5432

# Entrypoint to start PostgreSQL
ENTRYPOINT ["postgres"]