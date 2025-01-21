class CreateFlags < ActiveRecord::Migration[6.1]
  def change
    create_table :flags do |t|
      t.references :flaggable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true
      t.string :reason, null: false

      t.timestamps
    end
  end
end
