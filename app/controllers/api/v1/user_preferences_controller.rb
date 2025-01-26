class Api::V1::UserPreferencesController < ApplicationController

    before_action :authenticate_user!

    def show
      render json: { preferences: current_user.preferences }, status: :ok
    end
  
    def update
      if current_user.update(preferences: params[:preferences])
        render json: { message: 'Preferences updated successfully.' }, status: :ok
      else
        render json: { error: current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
