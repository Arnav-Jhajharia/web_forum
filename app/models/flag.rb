class Flag < ApplicationRecord
  validates :reason, presence: true

  belongs_to :flaggable, polymorphic: true
  belongs_to :user
end
