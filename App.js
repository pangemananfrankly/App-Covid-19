import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground,Image } from 'react-native';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      global: {},
      dataApiKeseluruhan: {},
      dataApiProvinsi: [],
      refreshing: false,
     

      
    }
  }

  onRefresh = () => {
    this.getDataApi();
    this.getDataIndoKeseluruhan();
    this.getDataApiProvinsi();
  }

  componentDidMount = () => {
    this.getDataApi();
    this.getDataIndoKeseluruhan();
    this.getDataApiProvinsi();
  }
 // Mengambil Data API Global Keseluruhan
  getDataApi = async () => {
    this.setState({ refreshing: true })
    const response = await fetch('https://covid19.mathdro.id/api')
    const global = await response.json()
    const { confirmed, recovered, deaths, lastUpdate } = await global
    this.setState({
      global: {
        confirmed: await confirmed,
        recovered: await recovered,
        death: await deaths,
        lastUpdate: await lastUpdate,
      },
      refreshing: false
    })
  }
  // Mengambil Data API Indonesia Keseluruhan
  getDataIndoKeseluruhan = async () => {
    this.setState({ refreshing: true })
    const response = await fetch('https://indonesia-covid-19.mathdro.id/api')
    const dataApiKeseluruhan = await response.json()
    const { jumlahKasus, sembuh, perawatan, meninggal } = await dataApiKeseluruhan
    this.setState({
      dataApiKeseluruhan: {
        jumlahKasus: await jumlahKasus,
        sembuh: await sembuh,
        perawatan: await perawatan,
        meninggal: await meninggal
      },
      refreshing: false
    })
  }



  // Mengambil Data API Provinsi
  getDataApiProvinsi = async () => {
    this.setState({ refreshing: true })
    const response = await fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
    const dataApiProvinsi = await response.json()
    const { data } = await dataApiProvinsi
    this.setState({
      dataApiProvinsi: {
        Data: await data,
      },
      refreshing: false
    })
  }

  renderItem = ({ item }) => (
    <View style={styles.containerDataProvinsi}>

      <View style={styles.containerlabelProvinsi}>
        <Text style={styles.textLabelProvisi}>{item.provinsi}</Text>
      </View>
      <View style={styles.containerIsiDataProvinsi}>
        <Text style={styles.textDataPositif}>{item.kasusPosi}</Text>
        <Text style={styles.textDataSembuh}>{item.kasusSemb}</Text>
        <Text style={styles.textDataMeninggal}>{item.kasusMeni}</Text>
      </View>

    </View>

  )

  

  render(){
    if (!this.state.global.confirmed) {
      return <Text style={styles.textLoading}>Loading..</Text>
    }
    if (!this.state.global.recovered) {
      return <Text style={styles.textLoading}>Loading..</Text>
    }
    if (!this.state.global.death) {
      return <Text style={styles.textLoading}>Loading..</Text>
    }
    if (!this.state.global.lastUpdate) {
      return <Text style={styles.textLoading}>Loading..</Text>
    }
    if (!this.state.dataApiKeseluruhan.jumlahKasus) {
      return <Text style={styles.textLoading}>Loading...</Text>
    }
    if (!this.state.dataApiKeseluruhan.sembuh) {
      return <Text style={styles.textLoading}>Loading...</Text>
    }
    if (!this.state.dataApiKeseluruhan.perawatan) {
      return <Text style={styles.textLoading}>Loading...</Text>
    }
    if (!this.state.dataApiKeseluruhan.meninggal) {
      return <Text style={styles.textLoading}>Loading...</Text>
    }
    
  return (
    
    <View style={styles.container}>
      <View style={styles.Header0}></View>
      
      <View style={styles.Header}>
        <ImageBackground
          style={styles.containerBackground}
          source={require('../aplikasi/assets/covid.jpg')}
          borderRadius= {20}
         
        ><Text style={styles.textHeader}>Data COVID_19</Text></ImageBackground>
        
      </View>
      <ImageBackground
        style={{width:'100%',height:'50%'}}
        source={require('../aplikasi/assets/ground.jpg')}


      >
      <View style={styles.HeaderGlobal}>
          <Text style={styles.textGlobal}>Global</Text>
      </View>
      
      <View style={styles.Body}>
    
        <View style={styles.headercard}>
            <Text style={styles.textHeadercard, {
               fontWeight: 'bold',
               backgroundColor: "white", 
               width:50, borderRadius:20,
               justifyContent:'center',
              marginHorizontal: 30,}}>Positif</Text>
          </View>
        <View style={styles.headercard1}>
            <Text style={styles.textHeadercard, { 
              fontWeight: 'bold',
               backgroundColor: "white", 
               width: 70, 
               borderRadius: 20 }}>  Sembuh</Text>
        </View>
        <View style={styles.headercard2}>
            <Text style={styles.textHeadercard, { 
              fontWeight: 'bold',
               backgroundColor: "white",
              width: 70, borderRadius: 20,
             
              justifyContent: 'flex-start', }}>Meninggal</Text> 
        </View>
        
      </View>

      <View style={styles.BodyCard}>
       
        <View style={styles.card1}>
          <View style={styles.textLabelData1}>
            <Text style={{ fontWeight: 'bold'}}>{this.state.global.confirmed.value}</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <View style={styles.textLabelData1}>
            <Text style={{ fontWeight: 'bold' }}>{this.state.global.recovered.value}</Text>
          </View>
        </View>
        <View style={styles.card3}>
          <View style={styles.textLabelData1}>
            <Text style={{ fontWeight: 'bold' }}>{this.state.global.death.value}</Text>
          </View>
        </View>
        
      </View>

      <View style={{ width: "100%", height: 50}}></View>
      <View style={styles.HeaderIndonesia}>
        <Text style={styles.textBodydataindo}>Indonesia</Text>
      </View>

      <View style={styles.containerDataApi}>
        <View style={styles.containerIsiDataLabel}>
          <Text style={styles.textLabelData}>Jumlah Kasus :</Text>
          <Text style={styles.textLabelData}>Sembuh :</Text>
          <Text style={styles.textLabelData}>Perawatan:</Text>
          <Text style={styles.textLabelData}>Meninggal:</Text>
        </View>
        <View style={styles.containerIsiDataApi}>
          <Text style={styles.dataJumlahKasus}>{this.state.dataApiKeseluruhan.jumlahKasus}</Text>
          <Text style={styles.dataSembuh}>{this.state.dataApiKeseluruhan.sembuh}</Text>
          <Text style={styles.dataPerawatan}>{this.state.dataApiKeseluruhan.perawatan}</Text>
          <Text style={styles.dataMeninggal}>{this.state.dataApiKeseluruhan.meninggal}</Text>
        </View>
      </View>
      </ImageBackground>
      <View style={styles.containerPembatas}></View>
     <View style={{flex:1}}>
      <FlatList
        data={this.state.dataApiProvinsi.Data}
        keyExtractor={item => item.fid.toString()}
        renderItem={this.renderItem}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        showsVerticalScrollIndicator={false}

      />
      </View>
   

    </View>
  );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#88ffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  

  //_____header
  Header: {
    flex: 0.2,
    width: "100%",
    height: 0.1,

  },
  containerBackground: {
    alignItems: 'center',
    flex: 0.7,
    width: "100%",
    height: 50,
    opacity: 5

  },
 Header0:{
   flex:0.2,
   width: "100%",
   height: 0.1,
   backgroundColor: 'white',
   justifyContent: 'center',
  
 },
 textHeader:{
   height: 35,
  textAlign: 'center',
   fontWeight: "bold",
   backgroundColor: 'transparent',
   color: 'red',
   fontSize: 30,
  
 },
 HeaderGlobal:{
   flex:0.2,
   width: '100%',
    justifyContent:'center',
    alignItems: 'flex-start',
  
 },
 textGlobal:{
    fontSize: 20,
   fontWeight: "bold",
   backgroundColor: 'white',
   borderRadius: 10
 },
 //textDataIndo
 HeaderIndonesia:{
   flex:0.1,
   width: '100%',
   justifyContent: 'flex-start',
   backgroundColor: '#4dd0e1'
 },
 Bodydataindo:{
  flex: 1,

 },
 textBodydataindo:{
fontSize: 20,
fontWeight: 'bold'
 },

 //----Body
 Body:{
  flex: 0.1,
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
  headercard: {
    flex: 0.3,
    justifyContent: 'center',  
    fontWeight: "bold",
  },
  headercard1: {
    flex: 0.3,
    justifyContent: 'center',  
    fontWeight: "bold",
  },
  headercard2: {
    flex: 0.2, 
    fontWeight: "bold",
  },
  textHeadercard:{
    fontSize: 13,
    fontWeight: 'bold',
    
  },

  //_____Card golbal data
  BodyCard: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dd2c00',
    borderWidth: 2,
    borderRadius:90
  },card2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#29b6f6',
    borderWidth: 2,
    borderRadius: 90
  },card3: {
    flex: 1,
   alignItems: 'center',
    backgroundColor: '#8e8e8e',
    borderWidth: 2,
    borderRadius: 90
  },
   textLabelData1: {
    fontSize: 16,
    marginHorizontal:7,
    marginVertical: 35,
    backgroundColor:'white',
    borderRadius: 90,
     
  },
  //---------Tabel----
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: 'red' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  //-___Info
  textInfo: {
    color: '#000080',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1,
  },
  // Pembatas Content
  containerPembatas: {
    height: 7,
    backgroundColor: '#EBEBEB',
  },
  //Data indonesia
  containerDataApi: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#4dd0e1'
  },
  textLabelData: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: '700',
  },

  dataJumlahKasus: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#800000',
  },
  dataSembuh: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: 'darkgreen',
  },
  dataPerawatan: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#008080',
  },
  dataMeninggal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#808000',
  },

  // Styling Sub Judul Data Provinsi
  containerSubJudulProvinsi: {
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingVertical: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
  },
  textSubJudulProvinsi: {
    fontWeight: '700',
    fontSize: 17,
    color: '#696969'
  },

  // Styling Indikator Warna
  containerIndikatorWarna: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
  },
  indikatorPositif: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#800000',
  },
  indikatorSembuh: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'green',
  },
  indikatorMeninggal: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#808000',
  },

  // Styling Data Provinsi
  containerDataProvinsi: {
    flex: 1,
    top: 10,
    marginVertical: 3,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerlabelProvinsi: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#006400'

  },
  textLabelProvisi: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  containerIsiDataProvinsi: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  textDataPositif: {
    flex: 1,
    paddingVertical: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#800000',
  },
  textDataSembuh: {
    flex: 1,
    paddingVertical: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'green',
  },
  textDataMeninggal: {
    flex: 1,
    paddingVertical: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808000',
  },

});
