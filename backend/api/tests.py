from django.test import TestCase
from .models import Pokemon

class PokemonModelTest(TestCase):

    def setUp(self):
        Pokemon.objects.create(name="Pikachu", height=4, weight=60, base_experience=112)

    def test_pokemon_creation(self):
        pikachu = Pokemon.objects.get(name="Pikachu")
        self.assertEqual(pikachu.name, "Pikachu")
        self.assertEqual(pikachu.height, 4)
        self.assertEqual(pikachu.weight, 60)
        self.assertEqual(pikachu.base_experience, 112)