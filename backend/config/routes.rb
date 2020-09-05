Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/dishes', to: 'dishes#index'
  post '/dishes', to: 'dishes#create'
  # post '/dishes', to: 'dishes#attach'
  

  get '/tags', to: 'tags#index'
  
end
