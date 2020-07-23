class DishesController < ApplicationController

    def index
        render json: Dish.all, except: [:created_at, :updated_at], include: [:tags, :images]
    end

end
