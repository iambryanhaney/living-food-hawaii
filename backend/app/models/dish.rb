class Dish < ApplicationRecord
    has_many_attached :images
    
    has_many :dish_tags
    has_many :tags, through: :dish_tags

    # def as_json(options={})
    #   puts "In as_json... #{options}"
    #   super(options)
    # end

end
