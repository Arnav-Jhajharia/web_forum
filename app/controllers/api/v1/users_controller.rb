module Api
  module V1
    class UsersController < ApplicationController
      # GET /api/v1/user
      before_action :authenticate_user!

      def show
        render json: @current_user
      end

      # PATCH/PUT /api/v1/user
      def update
        if @current_user.update(user_params)
          render json: @current_user
        else
          render json: { errors: @current_user.errors.full_messages }, 
                 status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/user
      def destroy
        @current_user.destroy
        head :no_content
      end

      private

      def user_params
        params.require(:user).permit(
          :name,
          :email,
          :bio,
          :language,
          :timezone,
          :dark_mode,
          preferences: {
            categories: [],
            tags: [],
            notifications: [:push]
          }
        )
      end
    end
  end
end