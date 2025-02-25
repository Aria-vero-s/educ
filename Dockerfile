# Use a Python base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . /app/

# Build the React frontend
RUN cd frontend && npm install && npm run build

# Expose port
EXPOSE 8000

# Start Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
