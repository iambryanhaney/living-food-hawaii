# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



### Users


### Tags
        ### Meals
Tag.create(group: 'Meals', name: 'Breakfast')
Tag.create(group: 'Meals', name: 'Lunch')
Tag.create(group: 'Meals', name: 'Dinner')
        ### Courses
Tag.create(group: 'Courses', name: 'Ingredients')
Tag.create(group: 'Courses', name: 'Beverages')
Tag.create(group: 'Courses', name: 'Appetizers')
Tag.create(group: 'Courses', name: 'Salads')
Tag.create(group: 'Courses', name: 'Entrees')
Tag.create(group: 'Courses', name: 'Sides')
Tag.create(group: 'Courses', name: 'Desserts')
        ### Diets
Tag.create(group: 'Diets', name: 'Vegan')
Tag.create(group: 'Diets', name: 'Vegetarian')
Tag.create(group: 'Diets', name: 'Omnivore')
Tag.create(group: 'Diets', name: 'Gluten Free')
        ### Themes
Tag.create(group: 'Themes', name: 'Hawaiian')
Tag.create(group: 'Themes', name: 'Mediterranean')
Tag.create(group: 'Themes', name: 'Italian')
Tag.create(group: 'Themes', name: 'Japanese')
Tag.create(group: 'Themes', name: 'Thai')
Tag.create(group: 'Themes', name: 'Cuban')
Tag.create(group: 'Themes', name: 'Eastern European')
Tag.create(group: 'Themes', name: 'Indian')
Tag.create(group: 'Themes', name: 'Southwestern')
Tag.create(group: 'Themes', name: 'Southern')
Tag.create(group: 'Themes', name: 'Mexican')
        ### Events
Tag.create(group: 'Events', name: 'Weddings')
Tag.create(group: 'Events', name: 'Private Parties')
Tag.create(group: 'Events', name: 'Festivals')
Tag.create(group: 'Events', name: 'Retreats')
Tag.create(group: 'Events', name: 'Community Meals')
        ###Service
Tag.create(group: 'Services', name: 'Plated')
Tag.create(group: 'Services', name: 'Family Style')
Tag.create(group: 'Services', name: 'Self Serve')
Tag.create(group: 'Services', name: 'Take Away')


### Dishes
        ### [001]
dish = Dish.create(description: 'Lentil & Vegetable Fritters served with Quinoa & Seared Bok Choy')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Plated')
]

		### [002]
dish = Dish.create(description: 'Hawaiian Ahi Poke with Glass Noodle Salad (Toppings include cilantro, tamari, green onion, kimchi) and Haupia (Coconut Pudding)')
dish.tags << [
    Tag.where(name: 'Desserts'),
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Omnivore'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Hawaiian'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Family Style')
]

		### [003]
dish = Dish.create(description: 'B&B Breakfast Tray. Gluten Free Banana Bread with Butter, Macadamia Nuts, & Fresh Local Fruit')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Family Style')
]

		### [004]
dish = Dish.create(description: 'Garden Frittata with Mushrooms, Tomato, Basil, & Local Goat Cheese')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Festivals')
]

		### [005]
dish = Dish.create(description: 'Garden Harvest')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Ingredients'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Retreats')
]

		### [006]
dish = Dish.create(description: 'Salad with Edible Flowers, Beets, & Seeds with a Lilikoi Balsamic Dressing')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Salads'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Weddings'),
    Tag.where(name: 'Plated')
]

		### [007]
dish = Dish.create(description: 'Raw Avocado Cacao Pie with a Macadamia, Coconut, & Date Crust')
dish.tags << [
    Tag.where(name: 'Desserts'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Weddings')
]

		### [008]
dish = Dish.create(description: 'Crispy Coconut Bacon')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Sides'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Gluten Free')
]

		### [009]
dish = Dish.create(description: 'Kimchi Ingredients')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Ingredients'),
    Tag.where(name: 'Sides'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Hawaiian')
]

		### [010]
dish = Dish.create(description: 'Green Banana Pasteles')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Omnivore'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Hawaiian'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Festivals')
]

		### [011]
dish = Dish.create(description: 'Fruit Altar for Retreats')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Ingredients'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Retreats')
]

		### [012]
dish = Dish.create(description: 'Rainbow Salad of Seasonal Vegetables, & Hawaiian Seaweed with a Lilikoi Balsamic Vinaigrette')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Salads'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Hawaiian'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Weddings'),
    Tag.where(name: 'Plated')
]

		### [013]
dish = Dish.create(description: 'Garlic Butter Seared Kauai Prawns')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Appetizers'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Omnivore'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Hawaiian'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Weddings'),
    Tag.where(name: 'Family Style')
]

		### [014]
dish = Dish.create(description: 'Lilikoi Cheesecake with Lilikoi Glaze & Reduction')
dish.tags << [
    Tag.where(name: 'Desserts'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Hawaiian'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Weddings'),
    Tag.where(name: 'Plated')
]

		### [015]
dish = Dish.create(description: 'Mediterranean Lunch-Ulu Falafel, Quinoa Tabouli, Sprouted Hummus, Yogurt Tzatziki, Kalamata Olives, Local Goat Feta, & Vegetable Dippers')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Mediterranean'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Plated'),
    Tag.where(name: 'Take Away')
]

		### [016]
dish = Dish.create(description: 'Buddha Bowl Lunch')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Salads'),
    Tag.where(name: 'Vegan'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Self Serve'),
    Tag.where(name: 'Take Away')
]

		### [017]
dish = Dish.create(description: 'Retreat Breakfast Buffet')
dish.tags << [
    Tag.where(name: 'Breakfast'),
    Tag.where(name: 'Vegetarian'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Self Serve')
]

		### [018]
dish = Dish.create(description: 'Local Salt Crusted Grass Fed Steak')
dish.tags << [
    Tag.where(name: 'Lunch'),
    Tag.where(name: 'Dinner'),
    Tag.where(name: 'Entrees'),
    Tag.where(name: 'Omnivore'),
    Tag.where(name: 'Gluten Free'),
    Tag.where(name: 'Private Parties'),
    Tag.where(name: 'Weddings'),
    Tag.where(name: 'Retreats'),
    Tag.where(name: 'Family Style')
]


