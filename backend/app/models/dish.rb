class Dish < ApplicationRecord
    has_many :images
    
    has_many :dish_tags
    has_many :tags, through: :dish_tags
end
