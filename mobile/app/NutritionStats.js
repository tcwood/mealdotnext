import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6,
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: '#3D3D3D',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2,
    height: 10,
  },
  data: {
    flex: 2,
    flexDirection: 'row',
  },
  dataNumber: {
    color: '#3D3D3D',
    fontSize: 12,
    marginBottom: 5,
    height: 14,
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 10,
    marginRight: 5,
    backgroundColor: '#59838B',
  },
});

export default class AnimationTest extends React.Component {
  static getWidth(data) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = deviceWidth * 0.85;
    const width = data < 100 ? (data / 100) * maxWidth : maxWidth;
    return width;
  }

  constructor(props) {
    super(props);
    this.nutrients = {};
    // Initialize nutrient values at 1 so that can animate up
    props.nutrition.forEach((nutrient) => {
      this.nutrients[nutrient.label] = new Animated.Value(1);
    });
    this.handleAnimation = this.handleAnimation.bind(this);
  }

  componentDidMount() {
    const animate = this.handleAnimation;
    setTimeout(animate, 300);
  }

  handleAnimation() {
    Animated.parallel(this.props.nutrition.map(nutrient =>
      Animated.timing(
        this.nutrients[nutrient.label],
        { toValue: AnimationTest.getWidth(nutrient.daily) }
      )
    )).start();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.nutrition.map(nutrient => (
          <View key={nutrient.label} style={styles.item}>
            <Text style={styles.label}>{nutrient.label}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, { width: this.nutrients[nutrient.label] }]} />
              <Text style={styles.dataNumber}>{Math.round(nutrient.daily)}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
