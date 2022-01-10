import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationSetting from '../screens/NotificationSetting';
import Narrations from '../screens/NarrationsScreen';
import History from '../screens/HistoryScreen';
import Following from '../screens/FollowingScreen';
import AboutScreen from '../screens/About';
import PlanScreen from '../screens/Plan';
import PublishingMainScreen from '../screens/PublishingMain';
import PublisherSetupScreen from '../screens/PublisherSetup';
import PublisherScreen from '../screens/Publisher';
import Recordings from '../screens/Recordings';
import MyStories from '../screens/MyStories';

import StoriesScreen from '../screens/StoriesScreen';
import PlaylistScreen from '../screens/Playlistscreen';

import BrowseAuthor from '../screens/BrowseAuthor';
import BrowseNarrator from '../screens/BrowseNarrator';
import GenreHome from '../screens/GenreHome';
import SearchScreen from '../screens/SearchScreen';


import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ 
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarStyle: {
            //backgroundColor: '#000',
            height: 55,
            paddingBottom: 4
        }
          }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-sharp" color={color}/>,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="Stories"
        component={StoriesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="library-sharp" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Playlist"
        component={PlaylistNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="disc" color={color} />,
          headerShown: false,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={25} style={{ marginBottom: -8 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PlanScreen"
        component={PlanScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Publishing"
        component={PublishingMainScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PublisherSetup"
        component={PublisherSetupScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Publisher"
        component={PublisherScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Recordings"
        component={Recordings}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Narrations"
        component={Narrations}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MyStories"
        component={MyStories}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Following"
        component={Following}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const StoriesStack = createStackNavigator<TabTwoParamList>();

function StoriesNavigator() {
  return (
    <StoriesStack.Navigator>
      <StoriesStack.Screen
        name="StoriesScreen"
        component={StoriesScreen}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="BrowseAuthor"
        component={BrowseAuthor}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="BrowseNarrator"
        component={BrowseNarrator}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="GenreHome"
        component={GenreHome}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </StoriesStack.Navigator>
  );
}

const PlaylistStack = createStackNavigator<TabThreeParamList>();

function PlaylistNavigator() {
  return (
    <PlaylistStack.Navigator>
      <PlaylistStack.Screen
        name="StoriesScreen"
        component={PlaylistScreen}
        options={{ headerShown: false }}
      />
    </PlaylistStack.Navigator>
  );
}


