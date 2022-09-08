import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feed, Search, Agenda, Profile, Details, Calendar, Chat, Login, Register, Conversation, Conversations } from './screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#14213d' }}
            inactiveColor='#ffffff'
            activeColor="#fca311"
            initialRouteName="Feed"
        >
            <Tab.Screen
                name='Feed'
                component={FeedRouter}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name='Search'
                component={SearchRouter}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="search" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Agenda'
                component={Agenda}
                options={{
                    tabBarLabel: 'Agenda',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="calendar" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const SearchStackNavigator = createStackNavigator();

const SearchRouter = () => {
    return <SearchStackNavigator.Navigator>
        <SearchStackNavigator.Screen name="Search" options={{ headerShown: false }} component={Search} />
        <SearchStackNavigator.Screen name="Details" options={{ headerShown: false }} component={Details} />
        <SearchStackNavigator.Screen name="Calendar" options={{ headerShown: false }} component={Calendar} />
        <SearchStackNavigator.Screen name="Chat" options={{ headerShown: false }} component={Chat} />
    </SearchStackNavigator.Navigator>
}

const FeedRouter = () => {
    return <SearchStackNavigator.Navigator>
        <SearchStackNavigator.Screen name="Feed" options={{ headerShown: false }} component={Feed} />
        <SearchStackNavigator.Screen name="Details" options={{ headerShown: false }} component={Details} />
        <SearchStackNavigator.Screen name="Calendar" options={{ headerShown: false }} component={Calendar} />
        <SearchStackNavigator.Screen name="Chat" options={{ headerShown: false }} component={Chat} />
        <SearchStackNavigator.Screen name="Conversations" options={{ headerShown: false }} component={Conversations} />
    </SearchStackNavigator.Navigator>
}


/* const PosLoginStackNavigator = createStackNavigator();
const PreLoginStackNavigator = createStackNavigator(); */

const StackNavigator = createStackNavigator();

/* const preLoginStack = (setIsLogged) => {
    return <PreLoginStackNavigator.Navigator>
        <PreLoginStackNavigator.Screen name="Login" options={{ headerShown: false }} component={Login} setIsLogged={setIsLogged} />
        <PreLoginStackNavigator.Screen name="Register" options={{ headerShown: false }} component={Register} />
    </PreLoginStackNavigator.Navigator>
}

const posLoginStack = () => {
    return <PosLoginStackNavigator.Navigator>
        <PosLoginStackNavigator.Screen name="Explore" options={{ headerShown: false }} component={Tabs} />
    </PosLoginStackNavigator.Navigator>
} */


export default () => {
    /* const [isLogged, setIsLogged] = useState(false); */

    return <NavigationContainer>
        <StackNavigator.Navigator>
           {/*  <StackNavigator.Screen name="Login" options={{ headerShown: false }} component={Login} /> */}
            <StackNavigator.Screen name="Explore" options={{ headerShown: false }} component={Tabs} />
            <StackNavigator.Screen name="Register" options={{ headerShown: false }} component={Register} />
        </StackNavigator.Navigator>
    </NavigationContainer>
}