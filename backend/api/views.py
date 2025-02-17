import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Base URL de la PokéAPI
POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/"

@api_view(['GET'])
def get_pokemons(request):
    """ Obtiene todos los Pokémon """
    url = f"{POKEAPI_BASE_URL}pokemon?limit=5000"
    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
def get_berries(request):
    """ Obtiene todas las bayas """
    url = f"{POKEAPI_BASE_URL}berry?limit=100"
    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
def get_abilities(request):
    """ Obtiene todas las habilidades """
    url = f"{POKEAPI_BASE_URL}ability?limit=1000"
    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
def get_regions(request):
    """ Obtiene todas las regiones """
    url = f"{POKEAPI_BASE_URL}region"
    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
def get_machines(request):
    """ Obtiene todas las máquinas técnicas (MTs) """
    url = f"{POKEAPI_BASE_URL}machine?limit=500"
    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
def search_pokemon(request):
    """ Busca Pokémon por nombre, tipo, habilidad o región """
    query = request.GET.get('query', '').lower()
    
    if not query:
        return Response({"error": "Se requiere un parámetro de búsqueda"}, status=400)

    # Buscar por nombre de Pokémon
    url = f"{POKEAPI_BASE_URL}pokemon/{query}"
    response = requests.get(url)
    if response.status_code == 200:
        return Response(response.json())

    # Buscar por tipo
    url = f"{POKEAPI_BASE_URL}type/{query}"
    response = requests.get(url)
    if response.status_code == 200:
        return Response(response.json())

    # Buscar por habilidad
    url = f"{POKEAPI_BASE_URL}ability/{query}"
    response = requests.get(url)
    if response.status_code == 200:
        return Response(response.json())

    return Response({"error": "No se encontró ningún resultado"}, status=404)

# 📌 NUEVOS ENDPOINTS

@api_view(['GET'])
def get_pokemon_stats(request, pokemon_name):
    """ Obtiene los stats de un Pokémon """
    url = f"{POKEAPI_BASE_URL}pokemon/{pokemon_name}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return Response({"error": "Pokémon no encontrado"}, status=404)

    data = response.json()
    stats = {stat["stat"]["name"]: stat["base_stat"] for stat in data["stats"]}
    
    return Response({"name": data["name"], "stats": stats})

@api_view(['GET'])
def get_pokemon_habitat(request, pokemon_id):
    """ Obtiene el hábitat de un Pokémon """
    url = f"{POKEAPI_BASE_URL}pokemon-habitat/{pokemon_id}"
    response = requests.get(url)

    if response.status_code != 200:
        return Response({"error": "Hábitat no encontrado"}, status=404)

    return Response(response.json())

@api_view(['GET'])
def get_pokemon_evolution(request, pokemon_id):
    """ Obtiene la cadena de evolución de un Pokémon """
    species_url = f"{POKEAPI_BASE_URL}pokemon-species/{pokemon_id}"
    species_response = requests.get(species_url)

    if species_response.status_code != 200:
        return Response({"error": "Especie no encontrada"}, status=404)

    evolution_url = species_response.json().get("evolution_chain", {}).get("url")
    if not evolution_url:
        return Response({"error": "Cadena de evolución no encontrada"}, status=404)

    evolution_response = requests.get(evolution_url)
    return Response(evolution_response.json())

@api_view(['GET'])
def get_pokemon_by_type(request, type_name):
    """ Obtiene Pokémon por tipo """
    url = f"{POKEAPI_BASE_URL}type/{type_name}"
    response = requests.get(url)

    if response.status_code != 200:
        return Response({"error": "Tipo no encontrado"}, status=404)

    return Response(response.json())

@api_view(['GET'])
def get_pokemon_by_habitat(request, habitat_name):
    """ Obtiene Pokémon por hábitat """
    url = f"{POKEAPI_BASE_URL}pokemon-habitat/{habitat_name}"
    response = requests.get(url)

    if response.status_code != 200:
        return Response({"error": "Hábitat no encontrado"}, status=404)

    return Response(response.json())

@api_view(['GET'])
def get_evolution_chain(request, evolution_id):
    url = f"{POKEAPI_BASE_URL}evolution-chain/{evolution_id}"
    response = requests.get(url)
    
    if response.status_code == 200:
        datos_evolucion = response.json()
        return Response(datos_evolucion)
    return Response({"error": "Cadena evolutiva no encontrada"}, status=404)

  

