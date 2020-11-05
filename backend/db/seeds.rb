# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



### Users
User.create(email: 'admin@livingfoodhawaii.com', password: '123456', first_name: 'Abby', last_name: 'Wiltse', is_admin: true)

### Tags
        ### Meals
Tag.create(group: 'meals', name: 'breakfast')
Tag.create(group: 'meals', name: 'lunch')
Tag.create(group: 'meals', name: 'dinner')
        ### Courses
Tag.create(group: 'courses', name: 'ingredients')
Tag.create(group: 'courses', name: 'beverages')
Tag.create(group: 'courses', name: 'appetizers')
Tag.create(group: 'courses', name: 'salads')
Tag.create(group: 'courses', name: 'entrees')
Tag.create(group: 'courses', name: 'sides')
Tag.create(group: 'courses', name: 'desserts')
        ### Diets
Tag.create(group: 'diets', name: 'vegan')
Tag.create(group: 'diets', name: 'vegetarian')
Tag.create(group: 'diets', name: 'omnivore')
        ### Events
Tag.create(group: 'events', name: 'retreats')
Tag.create(group: 'events', name: 'private parties')
Tag.create(group: 'events', name: 'weddings')
Tag.create(group: 'events', name: 'supper club')
        ###Serving Style
Tag.create(group: 'serving style', name: 'plated')
Tag.create(group: 'serving style', name: 'family style')
Tag.create(group: 'serving style', name: 'self serve')
Tag.create(group: 'serving style', name: 'take away')


### Dishes
        ### [001]
dish = Dish.create(description: 'Lentil & Vegetable Fritters served with Quinoa & Seared Bok Choy')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'lunch'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'plated')
]
images = [
    { io: File.open('./stor_uploads/dish_001.jpg'), filename: 'dish_001.jpg' },
#     { io: File.open('./stor_uploads/Molly 001.jpg'), filename: 'Molly 001.jpg' },
#     { io: File.open('./stor_uploads/collatz.png'), filename: 'collatz.png' },
#     { io: File.open('./stor_uploads/blob.jpeg'), filename: 'blob.jpeg' },
#     { io: File.open('./stor_uploads/CookieMonster.jpg'), filename: 'CookieMonster.jpg' },
]
dish.images.attach(images)


		### [002]
dish = Dish.create(description: 'Hawaiian Ahi Poke with Glass Noodle Salad (Toppings include cilantro, tamari, green onion, kimchi) and Haupia (Coconut Pudding)')
dish.tags << [
    Tag.where(name: 'desserts'),
    Tag.where(name: 'lunch'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'omnivore'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'family style')
]
dish.images.attach(io: File.open('./stor_uploads/dish_002.jpg'), filename: 'dish_002.jpg')

		### [003]
dish = Dish.create(description: 'B&B Breakfast Tray. Gluten Free Banana Bread with Butter, Macadamia Nuts, & Fresh Local Fruit')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'family style')
]
dish.images.attach(io: File.open('./stor_uploads/dish_003.jpg'), filename: 'dish_003.jpg')

		### [004]
dish = Dish.create(description: 'Garden Frittata with Mushrooms, Tomato, Basil, & Local Goat Cheese')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'retreats'),
]
dish.images.attach(io: File.open('./stor_uploads/dish_004.jpg'), filename: 'dish_004.jpg')

		### [005]
dish = Dish.create(description: 'Garden Harvest')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'ingredients'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'retreats')
]
dish.images.attach(io: File.open('./stor_uploads/dish_005.jpg'), filename: 'dish_005.jpg')

		### [006]
dish = Dish.create(description: 'Salad with Edible Flowers, Beets, & Seeds with a Lilikoi Balsamic Dressing')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'salads'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'weddings'),
    Tag.where(name: 'plated')
]
dish.images.attach(io: File.open('./stor_uploads/dish_006.jpg'), filename: 'dish_006.jpg')

		### [007]
dish = Dish.create(description: 'Raw Avocado Cacao Pie with a Macadamia, Coconut, & Date Crust')
dish.tags << [
    Tag.where(name: 'desserts'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'weddings')
]
dish.images.attach(io: File.open('./stor_uploads/dish_007.jpg'), filename: 'dish_007.jpg')

		### [008]
dish = Dish.create(description: 'Crispy Coconut Bacon')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'lunch'),
    Tag.where(name: 'sides'),
    Tag.where(name: 'vegan'),
]
dish.images.attach(io: File.open('./stor_uploads/dish_008.jpg'), filename: 'dish_008.jpg')

		### [009]
dish = Dish.create(description: 'Kimchi Ingredients')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'ingredients'),
    Tag.where(name: 'sides'),
    Tag.where(name: 'vegan'),
]
dish.images.attach(io: File.open('./stor_uploads/dish_009.jpg'), filename: 'dish_009.jpg')

		### [010]
dish = Dish.create(description: 'Green Banana Pasteles')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'omnivore'),
    Tag.where(name: 'private parties'),
]
dish.images.attach(io: File.open('./stor_uploads/dish_010.jpg'), filename: 'dish_010.jpg')

		### [011]
dish = Dish.create(description: 'Fruit Altar for Retreats')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'ingredients'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'retreats')
]
dish.images.attach(io: File.open('./stor_uploads/dish_011.jpg'), filename: 'dish_011.jpg')

		### [012]
dish = Dish.create(description: 'Rainbow Salad of Seasonal Vegetables, & Hawaiian Seaweed with a Lilikoi Balsamic Vinaigrette')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'salads'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'weddings'),
    Tag.where(name: 'plated')
]
dish.images.attach(io: File.open('./stor_uploads/dish_012.jpg'), filename: 'dish_012.jpg')

		### [013]
dish = Dish.create(description: 'Garlic Butter Seared Kauai Prawns')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'appetizers'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'omnivore'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'weddings'),
    Tag.where(name: 'family style')
]
dish.images.attach(io: File.open('./stor_uploads/dish_013.jpg'), filename: 'dish_013.jpg')

		### [014]
dish = Dish.create(description: 'Lilikoi Cheesecake with Lilikoi Glaze & Reduction')
dish.tags << [
    Tag.where(name: 'desserts'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'weddings'),
    Tag.where(name: 'plated')
]
dish.images.attach(io: File.open('./stor_uploads/dish_014.jpg'), filename: 'dish_014.jpg')

		### [015]
dish = Dish.create(description: 'Mediterranean Lunch-Ulu Falafel, Quinoa Tabouli, Sprouted Hummus, Yogurt Tzatziki, Kalamata Olives, Local Goat Feta, & Vegetable Dippers')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'plated'),
    Tag.where(name: 'take away')
]
dish.images.attach(io: File.open('./stor_uploads/dish_015.jpg'), filename: 'dish_015.jpg')

		### [016]
dish = Dish.create(description: 'Buddha Bowl Lunch')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'salads'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'self serve'),
    Tag.where(name: 'take away')
]
dish.images.attach(io: File.open('./stor_uploads/dish_016.jpg'), filename: 'dish_016.jpg')

		### [017]
dish = Dish.create(description: 'Retreat Breakfast Buffet')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'self serve')
]
dish.images.attach(io: File.open('./stor_uploads/dish_017.jpg'), filename: 'dish_017.jpg')


		### [018]
dish = Dish.create(description: 'Local Salt Crusted Grass Fed Steak')
dish.tags << [
    Tag.where(name: 'lunch'),
    Tag.where(name: 'dinner'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'omnivore'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'weddings'),
    Tag.where(name: 'retreats'),
    Tag.where(name: 'family style')
]
dish.images.attach(io: File.open('./stor_uploads/dish_018.jpg'), filename: 'dish_018.jpg')


		### [019]
dish = Dish.create(description: 'Chick Peas of the Sea')
images = [
        { io: File.open('./stor_uploads/dish_019_01.jpg'), filename: 'dish_019_01.jpg' },
        { io: File.open('./stor_uploads/dish_019_02.jpg'), filename: 'dish_019_02.jpg' },
        { io: File.open('./stor_uploads/dish_019_03.jpg'), filename: 'dish_019_03.jpg' },
]
dish.images.attach(images)


		### [020]
dish = Dish.create(description: 'Lilikoi Cheesecake')
images = [
        { io: File.open('./stor_uploads/dish_020_01.jpg'), filename: 'dish_020_01.jpg' },
        { io: File.open('./stor_uploads/dish_020_02.jpg'), filename: 'dish_020_02.jpg' },
        { io: File.open('./stor_uploads/dish_020_03.jpg'), filename: 'dish_020_03.jpg' },
        { io: File.open('./stor_uploads/dish_020_04.jpg'), filename: 'dish_020_04.jpg' },
]
dish.images.attach(images)