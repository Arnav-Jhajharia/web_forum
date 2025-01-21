class Api::V1::CommentsController < ApplicationController
  def index
    comments = Comment.where(forum_thread_id: params[:forum_thread_id])
    render json: comments
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment, status: :created
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :forum_thread_id)
  end
end
