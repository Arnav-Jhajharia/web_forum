Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "flags/index"
      get "flags/create"
      get "tags/index"
      get "tags/show"
      get "comments/index"
      get "comments/create"
      get "forum_threads/index"
      get "forum_threads/show"
      get "forum_threads/create"
      get "categories/index"
      get "categories/show"
      # Authentication routes
      post "auth/login", to: "auth#login"
      delete "auth/logout", to: "auth#logout"

      # Categories
      resources :categories, only: [:index, :show]

      # Forum Threads with nested comments and flags
      resources :forum_threads do
        resources :comments, only: [:index, :create, :destroy]
        resources :flags, only: [:create]
      end

      # Tags
      resources :tags, only: [:index, :show]

      # Flags
      resources :flags, only: [:index]
    end
  end

  # Root and Frontend Routes
  root "homepage#index"
  get "/*path' => 'homepage#index"

  # Health Check
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA Files
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
