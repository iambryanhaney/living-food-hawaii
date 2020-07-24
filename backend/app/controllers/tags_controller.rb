class TagsController < ApplicationController

    def index
        render json: Tag.all, except: [:created_at, :updated_at]
    end

end