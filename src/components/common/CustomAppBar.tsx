import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  showBack?: boolean;  
  centerTitle?: boolean;       
  onBackPress?: () => void;  
  children?: React.ReactNode;
  style?: ViewStyle;          
}

const CustomAppBar: React.FC<Props> = ({
  title,
  showBack = true,
  centerTitle = false,
  onBackPress,
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity style={{ width: 40 }} onPress={onBackPress}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 10 }} /> 
        )}
      </View>

      <View style={[styles.center, !centerTitle && { alignItems: 'flex-start', paddingLeft: 6 }]}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            !centerTitle && { textAlign: 'left', width: '100%' },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.right}>{children}</View>
      
    </View>
  );
};

export default CustomAppBar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  left: {
    // width: 40,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

