## Todo CRUD Sample

[![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)]() [![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)]() [![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)]() [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)]() [![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)]() [![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)]()

### :hammer: Set environment variables
#### backend/.env
```
SECRET_KEY=<secret-key>
DEBUG=True
SSL_REQUIRE=False
```

#### frontend/.env
```
VITE_URL='http://localhost:8000/api'
```

### :rocket: Run the application with Docker
#### Build and run Docker images
```
docker-compose build
```
```
docker-compose up
```
#### Remove containers
```
docker-compose down
```
#### Run Django tests
```
docker-compose run --rm -e RUN_TESTS=1 backend
```

### :computer: Django backend development
#### Setup and activate the virtual environment
```
python -m venv venv
```
```
venv\scripts\activate
```
#### Install a dependency
```
pip install <package_name>==<version>
```
#### Update the dependency list
```
pip freeze > requirements.txt
```
