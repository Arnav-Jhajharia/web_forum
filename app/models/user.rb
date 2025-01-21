class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
  
    has_many :forum_threads, dependent: :destroy
    has_many :comments, dependent: :destroy
  end
  