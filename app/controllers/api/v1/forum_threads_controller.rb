class Api::V1::ForumThreadsController < ApplicationController
  def index
    forum_threads = ForumThread.all.includes(:user, :category, :tags)
    render json: forum_threads, include: [:user, :category, :tags]
  end

  def show
    forum_thread = ForumThread.find(params[:id])
    render json: forum_thread, include: [:user, :category, :tags, :comments]
  end

  def create
    forum_thread = ForumThread.new(forum_thread_params)
    if forum_thread.save
      render json: forum_thread, status: :created
    else
      render json: { error: forum_thread.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def forum_thread_params
    params.require(:forum_thread).permit(:title, :content, :user_id, :category_id, tag_ids: [])
  end
end
