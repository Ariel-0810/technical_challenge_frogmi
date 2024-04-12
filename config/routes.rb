Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :features, only: [:index, :create] do
        resources :comments, only: [:create]
      end
    end
  end
end

