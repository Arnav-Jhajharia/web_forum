class User < ApplicationRecord
  has_many :reactions, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  validates :email, 
    uniqueness: { allow_blank: true },
    format: { 
      with: URI::MailTo::EMAIL_REGEXP, 
      allow_blank: true 
    }

  # Relationships
  has_many :forum_threads, dependent: :destroy
  has_many :comments, dependent: :destroy

  # Preferences configuration
  store_accessor :preferences, :categories, :tags, :notifications
  before_save :set_default_preferences

  private

  def set_default_preferences
    self.preferences ||= {
      categories: [],
      tags: [],
      notifications: {
        push: true
      }
    }
  end
end