import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

class Home extends Component {
  state = {
    address: '',
    transactionDataList : []
  };
  handleAddress = (text) => {
    this.setState({address: text});
  };
  search = (address) => {
    this.props.navigation.navigate('Transactions', {
      address: this.state.address, 
      transactionDataList : this.state.transactionDataList,
      transactionDataListLength: -1},
      );
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="EthereumAddress"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleAddress}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => this.search(this.state.address)}>
          <Text style={styles.searchButtonText}> Search </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { transactions } = state
  return { transactions }
};
 
export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  searchButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  searchButtonText: {
    color: 'white',
  },
});
