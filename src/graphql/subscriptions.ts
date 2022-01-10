/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFollowingConn = /* GraphQL */ `
  subscription OnCreateFollowingConn {
    onCreateFollowingConn {
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
export const onUpdateFollowingConn = /* GraphQL */ `
  subscription OnUpdateFollowingConn {
    onUpdateFollowingConn {
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
export const onDeleteFollowingConn = /* GraphQL */ `
  subscription OnDeleteFollowingConn {
    onDeleteFollowingConn {
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
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory {
    onCreateStory {
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
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory {
    onUpdateStory {
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
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory {
    onDeleteStory {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateGenre = /* GraphQL */ `
  subscription OnCreateGenre {
    onCreateGenre {
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
export const onUpdateGenre = /* GraphQL */ `
  subscription OnUpdateGenre {
    onUpdateGenre {
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
export const onDeleteGenre = /* GraphQL */ `
  subscription OnDeleteGenre {
    onDeleteGenre {
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
