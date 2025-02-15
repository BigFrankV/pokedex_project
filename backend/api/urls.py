
from django.urls import path
from .views import (
    get_pokemons, get_berries, get_abilities, get_regions, get_machines, search_pokemon,
    get_pokemon_stats, get_pokemon_habitat, get_pokemon_evolution, 
    get_pokemon_by_type, get_pokemon_by_habitat
)

urlpatterns = [
    path('pokemons/', get_pokemons, name='get_pokemons'),
    path('berries/', get_berries, name='get_berries'),
    path('abilities/', get_abilities, name='get_abilities'),
    path('regions/', get_regions, name='get_regions'),
    path('machines/', get_machines, name='get_machines'),
    path('search/', search_pokemon, name='search_pokemon'),

    # 📌 Nuevas rutas agregadas
    path('pokemons/<str:pokemon_name>/stats/', get_pokemon_stats, name='get_pokemon_stats'),
    path('pokemons/<int:pokemon_id>/habitat/', get_pokemon_habitat, name='get_pokemon_habitat'),
    path('pokemons/<int:pokemon_id>/evolution/', get_pokemon_evolution, name='get_pokemon_evolution'),
    path('pokemons/type/<str:type_name>/', get_pokemon_by_type, name='get_pokemon_by_type'),
    path('pokemons/habitat/<str:habitat_name>/', get_pokemon_by_habitat, name='get_pokemon_by_habitat'),
]
