/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 * @format
 * @flow
 */

import React,
{ useState, useEffect, Component }
  from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import data from './#doc/timeslots';


// const datax = {
//   "data": [{
//     "id": "bd668f56-4918-45e5-999d-38879df304a0",
//     "provider_category_id": "7c8ea264-2cd3-4e5b-8f40-46a1a6fda174_1259a190-f352-40ba-94fc-b85ff84866c4",
//     "day_of_week": 2,
//     "start_time": "08:00",
//     "tier": "offPeak",
//     "pax": 3,
//     "discount": 55,
//     "active": 0
//   },
//   {
//     "id": "d6f36564-6afa-4444-8747-7a9f166c4bb8",
//     "provider_category_id": "7c8ea264-2cd3-4e5b-8f40-46a1a6fda174_1259a190-f352-40ba-94fc-b85ff84866c4",
//     "day_of_week": 1,
//     "start_time": "10:00",
//     "tier": "offPeak",
//     "pax": 3,
//     "discount": 55,
//     "active": 0
//   }]
// };




const App: () => React$Node = () => {

  // const [datay, setDatay] = useState([
  //   { name: 'aaa', id: '1' },
  //   { name: 'bbb', id: '2' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  //   { name: 'ccc', id: '3' },
  // ])

  let [data, setData] = useState([])

  useEffect(() => {
    let urlx = 'https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0'

    fetch(urlx)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.length <= 0) {
          alert('data not found')
        } else {
          const byActive = (item) => {
            return item.active != 0
          }

          const byDate = (a, b) => {
            // console.error(a.day_of_week)
            // return false
            const dateA = a.day_of_week//.toLowerCase()
            const dateB = b.day_of_week//.toLowerCase()

            let ret = 0
            if (dateA > dateB) {
              ret = 1
            } else if (dateA > dateB) {
              ret = -1
            }

            return ret
          }

          let filteredDt = responseJson.data.filter(byActive)//.sort(byDate)
          let sortedDt = filteredDt.sort(byDate)
          // let filteredDt = responseJson.data.filter(byActive).sort(byDate)

          // console.error(JSON.stringify(sortedDt, null, '  '))
          setData(sortedDt)
        }
      })
  }, [])

  const renderDate = (dt) => {
    // console.error(dt.item)
    return (
      <TouchableOpacity
        onPress={() => alert(dt.item.day_of_week)}
        style={[styles.ddBtn, styles.active_ddBtn]}
      >
        <Text style={[styles.dayTxt, styles.active_txt]}>{dt.item.name}</Text>
        <Text style={[styles.dateTxt, styles.active_txt]}>{dt.item.day_of_week}</Text>
        <Text style={[styles.monthTxt, styles.active_txt]}>OCT</Text>
      </TouchableOpacity>

      // <View style={[styles.ddBtn, styles.active_ddBtn]}>
      //   <Text style={[styles.dayTxt, styles.active_txt]}>FRI</Text>
      //   <Text style={[styles.dateTxt, styles.active_txt]}>22</Text>
      //   <Text style={[styles.monthTxt, styles.active_txt]}>OCT</Text>
      // </View>
      // <View style={styles.ddBtn}>
      //   <Text style={styles.dayTxt}>FRI</Text>
      //   <Text style={styles.dateTxt}>22</Text>
      //   <Text style={styles.monthTxt}>OCT</Text>
      // </View>
    );
  }

  // console.error(data.length)
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <View style={styles.body}>
            <View style={styles.sectionLight}>
              <Text style={styles.sectionTitle}>Daily Deals</Text>

              <View style={styles.ddRow}>

                <FlatList
                  keyExtractor={(item) => item.id}
                  horizontal
                  data={data}
                  // renderItem={({ item }) => (
                  //   <TouchableOpacity
                  //     onPress={() => alert(item.name)}
                  //     style={[styles.ddBtn, styles.active_ddBtn]}
                  //   >
                  //     <Text style={[styles.dayTxt, styles.active_txt]}>{item.name}</Text>
                  //     <Text style={[styles.dateTxt, styles.active_txt]}>22</Text>
                  //     <Text style={[styles.monthTxt, styles.active_txt]}>OCT</Text>
                  //   </TouchableOpacity>
                  // )}
                  renderItem={(item) => renderDate(item)}
                // keyExtractor={item => item.data.id}
                // extraData={item => item.data.id}
                />

              </View>
            </View>

            <View style={styles.sectionDark}>

              <View style={styles.ddRow}>
                <View style={styles.dd2Btn}>
                  <Text style={styles.timeTxt}>1:00pm</Text>
                  <Text style={styles.discTxt}>-55%</Text>
                </View>
                <View style={[styles.dd2Btn, styles.active_dd2Btn]}>
                  <Text style={[styles.timeTxt, styles.active_2txt]}>12:00pm</Text>
                  <Text style={[styles.discTxt, styles.active_2txt]}>-45%</Text>
                </View>
                <View style={styles.dd2Btn}>
                  <Text style={styles.timeTxt}>1:00pm</Text>
                  <Text style={styles.discTxt}>-55%</Text>
                </View>
                <View style={styles.dd2Btn}>
                  <Text style={styles.timeTxt}>1:00pm</Text>
                  <Text style={styles.discTxt}>-55%</Text>
                </View>

              </View>
            </View>

          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionLight: {
    // marginTop: 32,
    // marginBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  sectionDark: {
    // marginTop: 32,
    // marginBottom: 20,
    paddingHorizontal: 24,
    // backgroundColor: 'red'
    backgroundColor: '#F8F8F8'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    // fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  dayTxt: {
    color: '#828282',
    marginBottom: -8,
  },
  dateTxt: {
    color: '#828282',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: -8,
  },
  monthTxt: {
    color: '#828282',
  },
  active_txt: {
    color: '#FF3364',
  },
  ddBtn: {
    marginRight: 12,
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8'
  },
  active_ddBtn: {
    backgroundColor: 'white',
    borderColor: '#828282',
    borderWidth: 1,
  },
  dd2Btn: {
    marginRight: 12,
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 1
  },
  active_dd2Btn: {
    backgroundColor: '#FF3364',
    borderWidth: 0,
  },
  timeTxt: {
    color: '#FF3364',
    marginBottom: -5,
    fontSize: 13
  },
  discTxt: {
    color: '#FF3364',
    fontWeight: 'bold',
    fontSize: 25
  },
  active_2txt: {
    color: 'white'
  },
  ddRow: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 10,
    // marginTop: 10,
    marginVertical: 20,

    // backgroundColor: 'yellow',
  }
});

export default App;
