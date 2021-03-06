import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Card, Picker, CardItem, Button, Text } from 'native-base';

import config from '../../config';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baslik: '',
      aciklama: '',
      adet: '1',
      fiyat: '',
      alisverisTipi: 'evGider'
    };

    this.pickItemHandler = this.pickItemHandler.bind(this);
  }

  onValueChange(value: string) {
    this.setState({
      alisverisTipi: value
    });
  }
  onFiyatChange(fiyat) {
    if (fiyat === '') {
      fiyat = '';
    }
    else {
      fiyat = fiyat.replace(new RegExp(',', 'gm'), '')
        .replace(new RegExp('-', 'gm'), '');
      fiyat = parseInt(fiyat).toString();
    }
    fiyat.toString();
    this.setState(prevState => {
      return {
        ...prevState,
        fiyat
      };
    });
  }
  onAdetChange(adet) {
    adet = (!/^\d+$/.test(adet) ? '' : adet).toString();
    this.setState(prevState => {
      return {
        ...prevState,
        adet
      };
    });
  }
  pickItemHandler() {
    const expenseTypes = [
      {'label':'Ev Giderleri(Kira, boya vs.)','value':'evGider'},
      {'label':'Yemek','value':'yemek'},
      {'label':'Sağlık','value':'saglik'},
      {'label':'Kozmetik','value':'kozmetik'},
      {'label':'Elektronik','value':'elektronik'},
      {'label':'Kıyafet','value':'kiyafet'},
      {'label':'Okul','value':'okul'},
      {'label':'Ulaşım','value':'ulasim'}
    ];
    return (
      expenseTypes.map(({label, value}, key) => {
        return <Picker.Item label={label} value={value} key={key}/>;
      })
    );
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <Form>
              <CardItem>
                <Item inlineLabel>
                  <Label>Başlık:</Label>
                  <Input onChangeText={(baslik) => this.setState({ baslik })} value={this.state.baslik}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Açıklama:</Label>
                  <Input onChangeText={(aciklama) => this.setState({ aciklama })} value={this.state.aciklama}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Adet:</Label>
                  <Input onChangeText={this.onAdetChange.bind(this)} value={this.state.adet} keyboardType={'numeric'}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Birim Fiyat:</Label>
                  <Input onChangeText={this.onFiyatChange.bind(this)} value={this.state.fiyat}
                         keyboardType={'numeric'}/>
                  <Text style={styles.innerText}>TL</Text>
                </Item>
              </CardItem>
              <CardItem>
                <Item picker>
                  <Picker
                    mode='dialog'
                    placeholder={'Alişveriş tipi'}
                    selectedValue={this.state.alisverisTipi}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    { this.pickItemHandler() }
                  </Picker>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel disabled>
                  <Label>Toplam :</Label>
                  <Input disabled={true} value={`${
                    isNaN(parseInt(this.state.adet) * parseFloat(this.state.fiyat)) ? 0 : parseInt(this.state.adet) * parseFloat(this.state.fiyat)
                    } TL`}/>
                </Item>
              </CardItem>
              <Button
                onPress={() => {
                  if (this.state.fiyat !== '' && this.state.adet !== '' && this.state.baslik !== '') {
                    console.log(this.state);
                    this.props.addExpense(this.state);
                    this.props.navigator.popToRoot();
                  }
                }}
                style={styles.buttonStyle}
                full
              >
                <Text style={styles.fs18}> Ekle </Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textColor: {
    color: '#FCB340'
  },
  buttonStyle: {
    width: '90%',
    backgroundColor: config.navBarBackgroundColor,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10
  },
  innerText: {
    paddingRight: 10
  },
  fs18: {
    fontSize: 18
  }
});

export default AddExpense;
