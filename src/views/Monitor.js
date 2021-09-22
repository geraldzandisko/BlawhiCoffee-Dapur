import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {
  TimeNow
} from '../components';
import styles from '../styles/Android.style';
import CONSTANT from '../../assets/constant';

class Monitor extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      statuslogin: [],
      idOrderanGet: '',
      monitormenualter: [
        {
          "id_pemesanan": 24,
          "nomor_pemesanan": 1,
          "id_nomor_meja": 2,
          "nomor_meja": "2",
          "orderan": [
            {
              "id_orderan": 23,
              "nomor_orderan": 1,
              "catatan": 'Catatan tes',
              "menus": [
                {
                  "nama_menu": "Ikan Asam Manis",
                  "jumlah_menu": 2
                },
                {
                  "nama_menu": "French Fries",
                  "jumlah_menu": 3
                },
                {
                  "nama_menu": "Kopi Gratis",
                  "jumlah_menu": 1
                }
              ]
            },
            {
              "id_orderan": 24,
              "nomor_orderan": 2,
              "catatan": '',
              "menus": [
                {
                  "nama_menu": "Ikan Asam Manis",
                  "jumlah_menu": 1
                },
                {
                  "nama_menu": "French Fries",
                  "jumlah_menu": 2
                },
                {
                  "nama_menu": "Kopi Spesial",
                  "jumlah_menu": 1
                }
              ]
            },
          ]
        }
      ],
      seluruhpesanan: [],
    }
  }
  doneOrderan() {
		fetch(CONSTANT.BASE_URL + '/orderan/doneOrderan', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				idorderan: this.state.idOrderanGet,
			})
		})
	}
  getOrder() {
    setInterval(() => {
      fetch(CONSTANT.BASE_URL + '/orderan/get')
      .then(response => response.json())
      .then(res => {
        this.setState({
          seluruhpesanan: res
        })
      })
      .catch(error => {
        console.error(error)
      })
    }, 3000)
  }
  getStatus() {
    setInterval(() => {
      fetch(CONSTANT.BASE_URL + '/statuslogin')
      .then(response => response.json())
      .then(res => {
        this.setState({
          statuslogin: res
        })
      })
      .then(() => {
        if (this.state.statuslogin.find(o => o.isLoggedIn === 'true')) {
          this.setState({
            validation: true
          })
        } else if (this.state.statuslogin.find(o => o.isLoggedIn === 'false')) {
          this.setState({
            validation: false
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
    }, 3000)
  }
  componentDidMount() {
    this.getOrder();
    this.getStatus();
  }
  render() {
    return (
      <View>
        {this.state.validation == false ?
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 300}}>
            <Text style={styles.headerTextBold}>Silahkan login terlebih dahulu pada Aplikasi Pihak Warung Kopi untuk menggunakan aplikasi ini.</Text>
          </View>
        :
        <View style={{padding: 30}}>
          <TimeNow />
          <View style={styles.horizontalLine}></View>
          <View style={styles.marginTopTen}></View>
          {/* Split */}
          <View style={{alignItems: 'flex-start'}}>
            {this.state.seluruhpesanan.map((data, i) => {
              return(
                <View key={i} style={{padding: 30, backgroundColor: '#FFFFFF', elevation: 5, marginBottom: 30}}>
                  <Text style={styles.headerTextBold}>Meja {data.nomor_meja}</Text>
                  <Text style={styles.bodyText}>Pesanan {data.nomor_pemesanan}</Text>
                  <View style={[styles.horizontalLine, {marginBottom: 0}]}></View>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {data.orderan.map((item, i) => {
                      return(
                        <View key={i} style={{backgroundColor: '#DEDEDE', padding: 20, marginTop: 20, width: 350, marginLeft: 10, marginRight: 10}}>
                          <Text style={styles.bodyTextBold}>Orderan {item.nomor_orderan}</Text>
                          <View style={styles.horizontalLine}></View>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.bodyTextBold}>PESANAN</Text>
                            <Text style={styles.bodyTextBold}>QTY</Text>
                          </View>
                          {/*  */}
                          <View style={{marginTop: 10}}></View>
                          {item.menus.map((file, i) => {
                            return(
                              <View key={i} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                {file.nama_menu == 'Kopi Gratis' ?
                                  <Text style={[styles.bodyText, styles.TextDanger]}>{file.nama_menu}</Text>
                                : file.nama_menu == 'Kopi Spesial' ?
                                  <Text style={[styles.bodyText, styles.TextDanger]}>{file.nama_menu}</Text>
                                :
                                  <Text style={[styles.bodyText, {color: '#000000'}]}>{file.nama_menu}</Text>
                                }
                                <Text style={styles.bodyText}>{file.jumlah_menu}</Text>
                              </View>
                            );
                          })}
                          {/* CATATAN */}
                          <TextInput
                            textAlignVertical="top"
                            placeholder={item.catatan_pesanan}
                            editable={false}
                            numberOfLines={5}
                            style={[styles.inputForm, {backgroundColor: '#FFFFFF', borderRadius: 0, borderWidth: 0}]}
                          />
                          <TouchableOpacity
                            style={[styles.addButton, {borderRadius: 0, marginTop: 20}]}
                            onPressIn={() => {
                              this.setState({idOrderanGet: item.id_orderan});
                            }}
                            onPress={() => this.doneOrderan()}
                          >
                            <Text style={styles.buttonText}>SELESAI</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        }
      </View>
    );
  }
}

export default Monitor;
