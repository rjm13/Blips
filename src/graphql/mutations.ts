/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      numAuthored
      pseudonym
      birthdate
      isPublisher
      followers {
        items {
          id
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      numAuthored
      pseudonym
      birthdate
      isPublisher
      followers {
        items {
          id
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following
      authored {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      numAuthored
      pseudonym
      birthdate
      isPublisher
      followers {
        items {
          id
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFollowingConn = /* GraphQL */ `
  mutation CreateFollowingConn(
    $input: CreateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    createFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowingConn = /* GraphQL */ `
  mutation UpdateFollowingConn(
    $input: UpdateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    updateFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowingConn = /* GraphQL */ `
  mutation DeleteFollowingConn(
    $input: DeleteFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    deleteFollowingConn(input: $input, condition: $condition) {
      id
      followerID
      authorID
      author {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre {
        id
        genreName
        stories {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
        }
        nextToken
      }
      createdAt
      updatedAt
      tagStoriesId
      storyGenreId
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre {
        id
        genreName
        stories {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
        }
        nextToken
      }
      createdAt
      updatedAt
      tagStoriesId
      storyGenreId
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre {
        id
        genreName
        stories {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        imageUri
        bio
        following
        authored {
          nextToken
        }
        numAuthored
        pseudonym
        birthdate
        isPublisher
        followers {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      narrator
      time
      description
      detailedDescription
      nsfw
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
          storyCommentsId
          commentStoryId
        }
        nextToken
      }
      tags {
        items {
          id
          tagName
          createdAt
          updatedAt
          storyTagsId
        }
        nextToken
      }
      createdAt
      updatedAt
      tagStoriesId
      storyGenreId
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      content
      createdAt
      updatedAt
      storyCommentsId
      commentStoryId
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      tagName
      stories {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      tagName
      stories {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      tagName
      stories {
        items {
          id
          title
          imageUri
          audioUri
          userID
          author
          narrator
          time
          description
          detailedDescription
          nsfw
          createdAt
          updatedAt
          tagStoriesId
          storyGenreId
        }
        nextToken
      }
      createdAt
      updatedAt
      storyTagsId
    }
  }
`;
export const createGenre = /* GraphQL */ `
  mutation CreateGenre(
    $input: CreateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    createGenre(input: $input, condition: $condition) {
      id
      genreName
      stories {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGenre = /* GraphQL */ `
  mutation UpdateGenre(
    $input: UpdateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    updateGenre(input: $input, condition: $condition) {
      id
      genreName
      stories {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGenre = /* GraphQL */ `
  mutation DeleteGenre(
    $input: DeleteGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    deleteGenre(input: $input, condition: $condition) {
      id
      genreName
      stories {
        id
        title
        imageUri
        audioUri
        genre {
          id
          genreName
          createdAt
          updatedAt
        }
        user {
          id
          name
          email
          imageUri
          bio
          following
          numAuthored
          pseudonym
          birthdate
          isPublisher
          createdAt
          updatedAt
        }
        userID
        author
        narrator
        time
        description
        detailedDescription
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        tagStoriesId
        storyGenreId
      }
      createdAt
      updatedAt
    }
  }
`;
