# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      # Replace with your frontend's origin
      origins 'https://web-forum-frontend-ele42p4ef-arnav-jhajharias-projects.vercel.app'
  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true # If you need to send cookies or authorization headers
    end
  end
  