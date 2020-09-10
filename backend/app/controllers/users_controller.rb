class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: { user: @user.as_json, jwt: @token }, status: :created
        else
            render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end

    def show
        render json: { user: current_user.as_json }, status: :accepted
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
end
