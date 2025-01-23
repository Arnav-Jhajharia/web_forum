class AuthController < ApplicationController
    # Login action
    def login
      user = User.find_by(username: params[:username])
  
      if user
        token = JsonWebToken.encode({ user_id: user.id })
        render json: { token: token, message: 'Login succcccessful' }, status: :ok
      else
        render json: { error: 'Invalid username' }, status: :unauthorized
      end
    end
  
    # Logout action
    # (JWT tokens are stateless, so logout is handled client-side by deleting the token)
    def logout
      render json: { message: 'Logout successful' }, status: :ok
    end
  end
  