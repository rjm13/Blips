import React from 'react';
import { View, StyleSheet, Text, Dimensions, Switch, ScrollView, TouchableWithoutFeedback } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import { Switch } from 'react-native-paper';
//import ToggleSwitch from 'toggle-switch-react-native'

const Settings = ({navigation} : any) => {

//explicit content switch
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

//autoplay switch
    const [isAutoplayOn, setIsAutoplayOn] = React.useState(false);

    const onAutoplaySwitch = () => setIsAutoplayOn(!isAutoplayOn);

    //subscription notifications on/off switch
    const [isSubsOn, setIsSubsOn] = React.useState(false);

    const onSubsSwitch = () => setIsSubsOn(!isSubsOn);   
    
//subscription notifications on/off switch
    const [isRecsOn, setIsRecsOn] = React.useState(false);

    const onRecsSwitch = () => setIsRecsOn(!isRecsOn);

//all notifications on/off switch
    const [isNotesOn, setIsNotesOn] = React.useState(false);

    const onNotesSwitch = () => {setIsNotesOn(!isNotesOn); setIsSubsOn(!isSubsOn); setIsRecsOn(!isRecsOn);}



    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{padding: 30, margin:-30}}>
                        <FontAwesome5 
                            name='chevron-left'
                            color='#fff'
                            size={20}
                        />
                    </View>
                    </TouchableWithoutFeedback>
                <Text style={styles.headertop}>
                    Settings
                </Text>
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={styles.header}>
                    Playback
                </Text>
            </View>

            <View style={styles.optionslist}>

                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Allow Explicit Content
                        </Text>
                        <Text style={styles.subparagraph}>
                            Turn on to listen to adult or explicit content
                        </Text>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#219a9ca5", true: "#219a9ca5" }}
                        thumbColor={isSwitchOn ? "cyan" : "gray"}
                        ios_backgroundColor="cyan"
                        onValueChange={onToggleSwitch}
                        value={isSwitchOn}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Autoplay
                        </Text>
                        <Text style={styles.subparagraph}>
                            Automatically play the next track in your playlist
                        </Text>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#219a9ca5", true: "#219a9ca5" }}
                        thumbColor={isAutoplayOn ? "cyan" : "gray"}
                        ios_backgroundColor="cyan"
                        onValueChange={onAutoplaySwitch}
                        value={isAutoplayOn}
                    />
                </View>

            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={styles.header}>
                    Notifications
                </Text>
            </View>

            <View style={styles.optionslist}>
                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Turn Off All
                        </Text>
                        <Text style={styles.subparagraph}>
                            Select this to turn off all notifications
                        </Text>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#219a9ca5", true: "#219a9ca5" }}
                        thumbColor={isNotesOn ? "cyan" : "gray"}
                        ios_backgroundColor="cyan"
                        onValueChange={onNotesSwitch}
                        value={isNotesOn}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Subscriptions
                        </Text>
                        <Text style={styles.subparagraph}>
                            Get notified when authors you follow create a new story
                        </Text>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#219a9ca5", true: "#219a9ca5" }}
                        thumbColor={isSubsOn ? "cyan" : "gray"}
                        ios_backgroundColor="cyan"
                        onValueChange={onSubsSwitch}
                        value={isSubsOn}
                    />
                </View>

                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Reccomendations
                        </Text>
                        <Text style={styles.subparagraph}>
                            Receive notifications about stories we think you'll like
                        </Text>
                    </View>
                    
                    <Switch
                        trackColor={{ false: "#219a9ca5", true: "#219a9ca5" }}
                        thumbColor={isRecsOn ? "cyan" : "gray"}
                        ios_backgroundColor="cyan"
                        onValueChange={onRecsSwitch}
                        value={isRecsOn}
                    />
                </View>
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 20}}>
                <Text style={styles.header}>
                    Storage
                </Text>
            </View>

            <View style={styles.optionslist}>
                <View style={styles.optionsitem}>
                    <View style={styles.subblock}>
                        <Text style={styles.paragraph}>
                            Clear cache
                        </Text>
                        <Text style={styles.subparagraph}>
                            This will clear the app cache. Your downloads will not be affected.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: '#363636a5'
    },
    headertop: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subblock: {
        width: '75%',
    },
    optionslist: {

    },
    optionsitem: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginLeft: 40,
        marginRight: 20,
        marginBottom: 30,
    },
    paragraph: {
        fontSize: 16,
        color: '#ffffff'
    },
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
});

export default Settings;
