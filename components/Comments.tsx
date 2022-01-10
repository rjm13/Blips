// import { Auth, API, graphqlOperation } from 'aws-amplify';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Dimensions, Animated, TouchableOpacity, TextInput} from 'react-native';
// import { getUser, listComments } from '../src/graphql/queries';
// import { createComment } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';

const comments =[
    {
        id: '1',
        comment: 'This is by far the best short story from this series. This authors imagination is truly amazing!',
        avatar: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg',
        name: 'JK Rowling',
        title: 'Listen to This',
        datePosted: 'Yesterday'
    }, 
    {
        id: '2',
        comment: 'Had me hooked from the first sentance!',
        avatar: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg',
        name: 'Ronald Dahl',
        title: '5 Stars',
        datePosted: 'August 23, 2020 at 12:16 pm'
    }, 
]




const Item = ({id, content}) => {

    return (
        <View style={{ marginVertical: 10, backgroundColor: '#00ffff0D', borderRadius: 15}}>

            <View style={{ margin: 10, flexDirection: 'row'}}>
                <View>
                   <Image 
                        source={{uri: 'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg' }}
                        style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                    /> 
                </View>
                <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                        Test Name
                    </Text>
                    <Text style={{color: '#ffffffa5', fontSize: 12}}>
                        Test Date posted
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ color: '#ffffff', marginVertical: 10, marginHorizontal: 20}}>
                    {content}
                </Text>
            </View>
        </View>
    );
}

const CommentsList = ({storyId}) => {

    useEffect(() => {

        setStory(storyId);

        console.log(storyId)

        const fetchComments = async () => {
           
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listComments, {
                                filter: {
                                    storyID: {
                                        eq: storyId
                                    },
                                  

                                }
                            } 
                        )
                    )
                    setCommentList(response.data.listComments.items);
                 
                    
                } catch (e) {
                    console.log(e);}  
        }
        fetchComments();
    },[storyId])

    const [commentList, setCommentList ] = useState();

    const [story, setStory] = useState(storyId);

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {

            // const userInfo = await Auth.currentAuthenticatedUser(
            //     { bypassCache: true }
            //   );

            const userData = await API.graphql(
                graphqlOperation(
                getUser, 
                { id: userID,
                }
                )
            )
            setUser(userData.data.getUser);
        }
    fetchUser();
    }, [])
    
    const renderItem = ({ item }) => (

        <Item 
            id={item.id}
            content={item.content}
            // comment={item.comment}
            // avatar={item.avatar}
            // name={item.name}
            // title={item.title}
            // datePosted={item.datePosted}
        />
      );
    
    const [comment, setComment] = useState('');

    const handlePostComment = async () => {
        if (comment.length > 0) {
            try {
                let result = await API.graphql(
                        graphqlOperation(createComment, { input: 
                            {
                                storyID: story,
                                content: comment,
                            }
                        }))
                            console.log(result);
                    } catch (e) {
                            console.error(e);
            }
            setComment('');
        }
    }

    return(
        <View>
            <View>
            <View style={{ padding: 20, flexDirection: 'row', marginVertical: 10, borderRadius: 15, backgroundColor: '#363636'}}>
                            <Image 
                                    source={{uri: user?.imageUri}}
                                    style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'yellow'}}
                                />
                            <TextInput 
                                placeholder='Say something'
                                placeholderTextColor='#ffFFFFa5'
                                style={{
                                    color: '#ffffff',
                                    fontSize: 14,
                                    marginLeft: 20,
                                    marginRight: 30,    
                                }}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={2}
                                onChangeText={comment => setComment(comment)}
                                value={comment}
                            />
            </View>
            {comment.length > 0 ? (
            <TouchableOpacity onPress={handlePostComment}>
                <View style={{ marginBottom: 20, alignItems: 'center'}}>
                    <Text style={{width: 100, padding: 5, borderRadius: 20, color: '#00ffff', borderWidth: 0.5, borderColor: '#00ffff', textAlign: 'center'}}>
                        Post
                    </Text>
                </View>
            </TouchableOpacity>
            ) : null}
            </View>

            <FlatList 
                data={commentList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                extraData={true}
                ListFooterComponent={ () => {
                    return (
                    <View style={{ height:  Dimensions.get('window').height-100, alignItems: 'center'}}>
                        
                    </View>
                    );
                }}
                ListHeaderComponent={ () => {
                    return (
                    <View>
                    </View>
                    );
                }}
            />
        </View>
    );
}

export default CommentsList;


