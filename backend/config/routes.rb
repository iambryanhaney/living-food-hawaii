Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/dishes', to: 'dishes#index'
  post '/dishes', to: 'dishes#create'
  patch '/dishes/:id', to: 'dishes#update'
  delete '/dishes/:id', to: 'dishes#destroy'
  

  get '/tags', to: 'tags#index'
  
end
