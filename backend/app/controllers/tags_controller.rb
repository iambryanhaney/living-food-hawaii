class TagsController < ApplicationController
    skip_before_action :authorized, only: :index

    def index
        render json: Tag.all, except: [:created_at, :updated_at]
    end

end