class ForumThread < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true

  belongs_to :user
  belongs_to :category
  has_many :comments, dependent: :destroy
  has_many :forum_thread_tags, dependent: :destroy
  has_many :tags, through: :forum_thread_tags
end
