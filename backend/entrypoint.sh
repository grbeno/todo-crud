#!/bin/sh

set -e

if [ "$RUN_TESTS" = "1" ]; then
    echo "Running tests..."
    python manage.py test
else
    echo "Running backend migrations..."
    python manage.py makemigrations
    python manage.py migrate

    echo "Collecting static files..."
    python manage.py collectstatic --noinput

    echo "Starting Gunicorn server..."
    gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
fi