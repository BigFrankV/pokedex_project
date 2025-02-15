from django.contrib import admin
from django.urls import path, include
from api.views import get_pokemons



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('pokemon-list/', get_pokemons, name='pokemon_list'),
    path('', get_pokemons, name='home'),
    path('pokemon/', get_pokemons, name='get_pokemons'),

]