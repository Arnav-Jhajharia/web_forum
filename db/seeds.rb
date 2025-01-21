# Categories
Category.create(name: "General")
Category.create(name: "Technology")
Category.create(name: "Gaming")

# Users
User.create(username: "testuser")
User.create(username: "admin")

# Forum Threads
ForumThread.create(title: "Welcome to the Forum!", content: "This is the first thread.", user_id: 1, category_id: 1)
ForumThread.create(title: "What's your favorite tech?", content: "Discuss here!", user_id: 2, category_id: 2)

# Comments
Comment.create(content: "Great topic!", user_id: 1, forum_thread_id: 1)
Comment.create(content: "I love gaming discussions!", user_id: 2, forum_thread_id: 1)

# Tags
Tag.create(name: "Ruby")
Tag.create(name: "React")
Tag.create(name: "Gaming")

# Flags
Flag.create(reason: "Spam", user_id: 1, flaggable: ForumThread.first)
Flag.create(reason: "Inappropriate", user_id: 2, flaggable: Comment.first)
