class Tag < ApplicationRecord
    validates :name, presence: true, uniqueness: true
  
    has_many :forum_thread_tags, dependent: :destroy
    has_many :forum_threads, through: :forum_thread_tags
  end
  