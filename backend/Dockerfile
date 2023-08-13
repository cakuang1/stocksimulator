# Use an official Python runtime as a parent image
FROM python:3.x

# Set the working directory in the container to /app
WORKDIR /app

# Copy the requirements file into the container's /app directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container's /app directory
COPY . /app

# Specify the command to run on container start, relative to /app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]