class Category < ApplicationRecord
    validates :name, presence: true, uniqueness: true
  
    has_many :forum_threads, dependent: :destroy
  end
  