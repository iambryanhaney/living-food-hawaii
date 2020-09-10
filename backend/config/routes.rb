Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/dishes', to: 'dishes#index'
  post '/dishes', to: 'dishes#create'
  patch '/dishes/:id', to: 'dishes#update'
  delete '/dishes/:id', to: 'dishes#destroy'

  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show'

  post '/login', to: 'auth#create'
  
  get '/tags', to: 'tags#index'
  
end
