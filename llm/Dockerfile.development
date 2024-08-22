FROM python:3.9-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install "fastapi[standard]"

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py /code/
COPY . /code/

CMD ["fastapi", "dev", "main.py", "--port", "8080", '--host', '0.0.0.0']