import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'

const Profile = () => {

    const [user] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Mobile developer | Tech enthusiast | Coffee lover ☕',
        avatar: 'https://via.placeholder.com/150',
        stats: {
            posts: 124,
            followers: 2543,
            following: 432
        }
    })

    const menuItems = [
        {id: 1, title: 'Edit Profile', icon: '✏️'},
        {id: 2, title: 'Settings', icon: '⚙️'},
        {id: 3, title: 'Privacy', icon: '🔒'},
        {id: 4, title: 'Help & Support', icon: '❓'},
        {id: 5, title: 'About', icon: 'ℹ️'},
    ]


    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image
                    source={{uri: user.avatar}}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.posts}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.following}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItem}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.menuIcon}>{item.icon}</Text>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <Text style={styles.menuArrow}>›</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#4a90e2',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        paddingVertical: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#e0e0e0',
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 15,
    },
    menuTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    menuArrow: {
        fontSize: 24,
        color: '#ccc',
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        marginHorizontal: 20,
        marginVertical: 30,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default Profile