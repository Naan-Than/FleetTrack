import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setResetUser } from '../../store/slice/authSlice';

const ProfileScreen = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.userMail)

  const handleActivity = () => {
    props.navigation.navigate('UserActivityScreen');
  };
  const handleLogout = () => {
    dispatch(setResetUser());
    console.log('Logout');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar} >
          <Text style={styles.avatarText}>
            {user?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
        <Text style={styles.userName}>{user}</Text>
      </View>
      <View style={styles.menuContainer}>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconCircle}>
            <Icon name="settings" size={24} color="#6b7280" />
          </View>
          <Text style={styles.menuLabel}>Settings</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconCircle}>
            <Icon name="notifications" size={24} color="#6b7280" />
          </View>
          <Text style={styles.menuLabel}>Notifications</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleActivity}>
          <View style={styles.menuIconCircle}>
            <Icon name="bar-chart" size={24} color="#6b7280" />
          </View>
          <Text style={styles.menuLabel}>Activity</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]} onPress={handleLogout}>
          <View style={styles.menuIconCircle}>
            <Icon name="logout" size={24} color="#ef4444" />
          </View>
          <Text style={styles.menuLabel}>Logout</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

      </View>


      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
     backgroundColor: '#f3f4f6',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    marginLeft: 16,
    flex: 1,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default ProfileScreen;