from fastapi import FastAPI
from db.connector import *
from enums.country import Country

app = FastAPI()

@app.post("/generate")
async def generate(
    date: str,
    country: Country,
    startTime: str,
    endTime: str,
    address: str,
    lat: float,
    lng: float,
):
    response = query(date, country, startTime, endTime, address, lat, lng)
    return response

@app.post("/chat")
async def chat_handler(
    histories: ChatMessages,
    query: str,
    date: str,
    country: Country,
    startTime: str,
    endTime: str,
    address: str,
):
    response = chat_query(histories, query, date, country, startTime, endTime, address)
    return response

@app.get('/destinations/{cid}')
async def get_destination_detail(cid: str):
    response = get_destination_by_cid(cid)
    return response