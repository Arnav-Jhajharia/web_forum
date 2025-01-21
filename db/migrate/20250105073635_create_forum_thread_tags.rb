class CreateForumThreadTags < ActiveRecord::Migration[6.1]
  def change
    create_table :forum_thread_tags do |t|
      t.references :forum_thread, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
