# db/seeds.rb

puts "Clearing existing data..."
Tag.destroy_all
Comment.destroy_all
ForumThread.destroy_all
Category.destroy_all
User.destroy_all

puts "Creating Users..."
user1 = User.create!(
  username: "alice",
  email: "alice@example.com",
  name: "Alice Wonderland",
  preferences: {
    categories: [1, 2, 5],  # The user’s preferred category IDs (will map below)
    tags: ["Ruby", "React"],
    notifications: { push: true }
  }
)

user2 = User.create!(
  username: "bob",
  email: "bob@example.com",
  name: "Bob Builder",
  preferences: {
    categories: [3, 7],
    tags: ["JavaScript"],
    notifications: { push: false }
  }
)

puts "Creating Categories..."
# Let’s make 10 categories
category_data = [
  { name: "General Discussion", description: "Talk about anything" },
  { name: "Programming", description: "Coding & Software Development" },
  { name: "Music", description: "Discuss all genres & instruments" },
  { name: "Sports", description: "Football, Cricket, Baseball, etc." },
  { name: "Travel", description: "Share travel experiences & tips" },
  { name: "Fitness", description: "Workout and healthy lifestyle" },
  { name: "Cooking", description: "Recipes and cooking tips" },
  { name: "Movies", description: "Discuss the latest films and classics" },
  { name: "Gaming", description: "Video games and board games" },
  { name: "Art", description: "Painting, sculpture, and design" }
]

category_data.each do |cat|
  Category.create!(cat)
end

puts "Creating Tags..."
tag_names = %w[Ruby Rails React Vue JavaScript TypeScript Java Python TravelTips Recipes SportsTalk FitnessGoals MovieReview]
tag_names.each do |name|
  Tag.create!(name: name)
end

puts "Creating Threads..."
# Create random threads in random categories
categories = Category.all
10.times do
  cat = categories.sample
  user = [user1, user2].sample

  ForumThread.create!(
    title: "Discussion on #{cat.name}",
    content: "Some interesting thoughts about #{cat.name}. Generated for feed testing (#{rand(1000)}).",
    mood: ForumThread.moods.keys.sample, # random mood
    user: user,
    category: cat,
    tag_list: tag_names.sample(2).join(",")
  )
end

puts "Seeding complete!"
