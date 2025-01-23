# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_01_23_114931) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "user_id", null: false
    t.bigint "forum_thread_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["forum_thread_id"], name: "index_comments_on_forum_thread_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "flags", force: :cascade do |t|
    t.string "flaggable_type", null: false
    t.bigint "flaggable_id", null: false
    t.bigint "user_id", null: false
    t.string "reason", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["flaggable_type", "flaggable_id"], name: "index_flags_on_flaggable"
    t.index ["user_id"], name: "index_flags_on_user_id"
  end

  create_table "forum_thread_tags", force: :cascade do |t|
    t.bigint "forum_thread_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["forum_thread_id"], name: "index_forum_thread_tags_on_forum_thread_id"
    t.index ["tag_id"], name: "index_forum_thread_tags_on_tag_id"
  end

  create_table "forum_threads", force: :cascade do |t|
    t.string "title", null: false
    t.text "content", null: false
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_forum_threads_on_category_id"
    t.index ["user_id"], name: "index_forum_threads_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "preferences", default: {}, null: false
    t.string "name"
    t.string "email"
    t.text "bio"
    t.string "language", default: "en"
    t.string "timezone", default: "UTC"
    t.boolean "dark_mode", default: false
    t.index ["email"], name: "index_users_on_email", unique: true, where: "(email IS NOT NULL)"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "comments", "forum_threads"
  add_foreign_key "comments", "users"
  add_foreign_key "flags", "users"
  add_foreign_key "forum_thread_tags", "forum_threads"
  add_foreign_key "forum_thread_tags", "tags"
  add_foreign_key "forum_threads", "categories"
  add_foreign_key "forum_threads", "users"
end
