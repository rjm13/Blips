import React from 'react';

const context = {
    storyID: null,
    setStoryID: (id: string | null) => {},

    userID: null,
    setUserID: (id: string | null) => {}
}

export const AppContext = React.createContext(context);