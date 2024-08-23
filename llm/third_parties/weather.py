import os
import requests

def get_weather_data(
    lat: float,
    lng: float,
    date: str,
    startTime: str,
    endTime: str,
):
    try:
        response = requests.get(f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{lat},{lng}/{date}?key={os.getenv('VISUAL_CROSSING_API_KEY')}")
        hourly_data = response.json()["days"][0]["hours"]
        weather_data_list = []
        for item in hourly_data:
            if startTime <= item["datetime"] <= endTime:
                weather_data_list.append({
                    "time": item["datetime"],
                    "temp": item["temp"],
                    "feelslike": item["feelslike"],
                    "precipprob": item["precip"],
                    "conditions": item["conditions"],
                    "cloudcover": item["cloudcover"],
                    "uvindex": item["uvindex"],
                })
        return weather_data_list
    except Exception as e:
        print(e)
        return []
    
def get_weather_calculation(weather_data_list):
    if not weather_data_list:
        return None

    avg_temp = sum(item['temp'] for item in weather_data_list) / len(weather_data_list)
    avg_feelslike = sum(item['feelslike'] for item in weather_data_list) / len(weather_data_list)
    avg_precipprob = sum(item['precipprob'] for item in weather_data_list) / len(weather_data_list)
    max_precipprob = max(item['precipprob'] for item in weather_data_list)
    predominant_conditions = max(set(item['conditions'] for item in weather_data_list), key=lambda c: sum(1 for item in weather_data_list if item['conditions'] == c))
    avg_cloudcover = sum(item['cloudcover'] for item in weather_data_list) / len(weather_data_list)
    max_uvindex = max(item['uvindex'] for item in weather_data_list)

    return {
        "avg_temp": avg_temp,
        "avg_feelslike": avg_feelslike,
        "avg_precipprob": avg_precipprob,
        "max_precipprob": max_precipprob,
        "predominant_conditions": predominant_conditions,
        "avg_cloudcover": avg_cloudcover,
        "max_uvindex": max_uvindex,
    }

def summarize_weather_data(calculation):
    if not calculation:
        return None
    
    weather_summary = f"Average temperature: {calculation['avg_temp']:.1f}°F (feels like {calculation['avg_feelslike']:.1f}°F). "
    weather_summary += f"Average precipitation probability: {calculation['avg_precipprob']:.1f}%, with a maximum of {calculation['max_precipprob']}%. "
    weather_summary += f"Predominant conditions: {calculation['predominant_conditions']}. "
    weather_summary += f"Average cloud cover: {calculation['avg_cloudcover']:.1f}%. "
    weather_summary += f"Maximum UV index: {calculation['max_uvindex']}."

    return weather_summary