# db/migrate/[timestamp]_create_user_settings.rb
class CreateUserSettings < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      # Basic Info
      t.string :name
      t.string :email
      t.text :bio

      # Preferences
      t.string :language, default: 'en'
      t.string :timezone, default: 'UTC'
      t.boolean :dark_mode, default: false
      
      # JSON preferences column (if not already exists)
      unless column_exists?(:users, :preferences)
        t.jsonb :preferences, null: false, default: {}
      end
    end

    # Add indexes
    add_index :users, :email, unique: true, where: 'email IS NOT NULL'
  end
end