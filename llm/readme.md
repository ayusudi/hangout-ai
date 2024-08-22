# Hangout AI LLM

This project is a Hangout AI that uses a Large Language Model (LLM) to create custom travel itineraries based on specific input parameters like location, date, and weather conditions. The system integrates various software components to provide a robust and dynamic itinerary creation service.

## Table of Contents

- [Hangout AI](#hangout-ai)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Running the FastAPI Server](#running-the-fastapi-server)

## Overview

The Hangout AI is designed to provide personalized itineraries for users based on their preferences, time availability, and real-time weather data. It leverages machine learning and natural language processing techniques to create itineraries that are practical, enjoyable, and tailored to the user's needs.

## Tech Stack

- **Programming Language**: Python
- **Framework**: FastAPI
- **Embedding Model**: Gemini models/embedding-001
- **LLM**: Groq Llama3-70B-8192
- **Vector Database**: TiDB
- **Data Scraping**:
  - Scraper: [Google Maps Scraper](https://github.com/gosom/google-maps-scraper)
  - Data Cleaner: Pandas (Python)

## Architecture

The system architecture is composed of several key components:

1. **FastAPI**: A Python-based web framework used to build the API endpoints and serve the itinerary generation service.
2. **LLM (Groq Llama3-70B-8192)**: A large language model used to generate the itinerary based on the input prompt and embedded data.
3. **Gemini Embedding Model**: Used for embedding location and weather data into a format that can be effectively processed by the LLM.
4. **TiDB (Vector DB)**: A distributed, MySQL-compatible database that stores vectorized data for quick retrieval and similarity search.
5. **Google Maps Scraper**: Scrapes location data from Google Maps for use in the itinerary.
6. **Pandas**: A Python library used for cleaning and processing scraped data before embedding.

## Setup

### Prerequisites

- Python 3.8 or higher
- Virtual environment tool (e.g., `venv` or `conda`)
- TiDB instance
- API keys for external services (if required)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hangout-itinerary-generator.git
    cd hangout-itinerary-generator
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```plaintext
    GROQ_API_KEY=YOUR_GROQ_API_KEY
    TIDB_HOST=YOUR_TIDB_HOST
    TIDB_PORT=YOUR_TIDB_PORT
    TIDB_USERNAME=YOUR_TIDB_USERNAME
    TIDB_PASSWORD=YOUR_TIDB_PASSWORD
    TIDB_DATABASE=YOUR_TIDB_DATABASE
    VECTOR_TABLE_NAME=YOUR_VECTOR_TABLE_NAME
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    VISUAL_CROSSING_API_KEY=YOUR_VISUAL_CROSSING_API_KEY
    ```

## Usage

### Running the FastAPI Server

To start the FastAPI server, run:
```bash
fastapi dev main.py
```