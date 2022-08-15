import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Bird_Drawing from "../assets/svg/Bird_Drawing.js";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/Footer.js";
import ProfileCard from "../components/ProfileCard.js";
import { imagesIndex } from "../assets/images/imagesIndex.js";
import { stepforward } from "react-native-vector-icons";
import ViewUsers from "../components/buttons/ViewUsers.js";
import AppLoading from "expo-app-loading";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import MainHeader from "../components/MainHeader.js";
import Constants from "../constants/constants.js";
import barackObama from "../assets/barackObama.jpeg";
import { useChatClient } from "./ChatAPI/useChatClient.js";
import FilterOverlay from "../components/FilterOverlay.js";
// Old Imports for filter
// import { Icon } from "@rneui/themed";
// import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";


const BirdFeed = ({ navigation }) => {
  const user = useSelector(state => state.data.userInfo);

  const [userList, setUserList] = useState([]);
  const [listState, setListState] = useState(false);
  // This is the old filter function on birdfeed

  const overlayFilterButton = () => {
    overlayFilterClicked ? setOverlayFilterClicked(false) : setOverlayFilterClicked(true);
  };
  
  const overlayDropDownButton = () => {
    overlayDropDownClicked ? setOverlayDropDownClicked(false) : setOverlayDropDownClicked(true);
  };
  // const handlerAgeChange = (ageSlide) => {
  //   setAgeState({ageState});
  // }
  const [ageState, setAgeState] = useState(18);

  const [rentState, setRentState] = useState(500);
  
  const [neighborhood, setNeighborhood] = useState("");

  const [leaseState, setLeaseState] = useState(1);

  const [sqFtState, setSqFtState] = useState(100);

  const [genderMale, setGenderMale] = useState(false);
  const [genderFemale, setGenderFemale] = useState(false);
  const [pet, setPet] = useState(false);
  const [drugs, setDrugs] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [guest, setGuest] = useState(false);
  const [clean, setClean] = useState(false);
  const [temp, setTemp] = useState(false);
  const [sound, setSound] = useState(false);
  const [awake, setAwake] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [interaction, setInteraction] = useState(false);


  const [overlayFilterClicked, setOverlayFilterClicked] = useState(false);

  const [overlayDropDownClicked, setOverlayDropDownClicked] = useState(false);

  const [switchEnabledSqua, setSwitchEnabledSqua] = useState(false);
  const toggleSwitchSqua = () =>
    setSwitchEnabledSqua((previousState) => !previousState);

  const [switchEnabledPri, setSwitchEnabledPri] = useState(false);
  const toggleSwitchPri = () =>
    setSwitchEnabledPri((previousState) => !previousState);

  const [switchEnabledIn, setSwitchEnabledIn] = useState(false);
  const toggleSwitchIn = () =>
    setSwitchEnabledIn((previousState) => !previousState);

  const [switchEnabledPer, setSwitchEnabledPer] = useState(false);
  const toggleSwitchPer = () =>
    setSwitchEnabledPer((previousState) => !previousState);

  const [switchEnabledRoo, setSwitchEnabledRoo] = useState(false);
  const toggleSwitchRoo = () =>
    setSwitchEnabledRoo((previousState) => !previousState);

  const [switchEnabledYes, setSwitchEnabledYes] = useState(false);
  const toggleSwitchYes = () =>
    setSwitchEnabledYes((previousState) => !previousState);

  const [switchEnabledNo, setSwitchEnabledNo] = useState(false);
  const toggleSwitchNo = () =>
    setSwitchEnabledNo((previousState) => !previousState);

  const [switchEnabledRec, setSwitchEnabledRec] = useState(false);
  const toggleSwitchRec = () =>
    setSwitchEnabledRec((previousState) => !previousState);

  const [switchEnabledApt, setSwitchEnabledApt] = useState(false);
  const toggleSwitchApt = () =>
    setSwitchEnabledApt((previousState) => !previousState);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  // ----- LOGIC FOR VIEW USER BUTTONS -----

  const viewUsers = async () => {
    setUserList([]);
    Axios.post(`${await Constants.BASE_URL()}/api/matching/`, {
      user_id: user.id,
    })
      .then((response) => {
        let userData = response.data;
        // manually push all but last, then setUserList on last user to trigger FlatList rerender
        // reason is that FlatList will not re-render unless setUserList is properly called
        // but setUserList (setState) will only set state once
        for (let i = 0; i < userData.length - 1; i++) {
          userList.push({
            name: userData[i].fullname,
            city: userData[i].city,
            src: barackObama,
          });
        }
        setUserList((prevList) => [
          ...userList,
          {
            name: userData[userData.length - 1].fullname,
            city: userData[userData.length - 1].city,
            src: barackObama,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    setListState(true);
  };

  useEffect(() => {
    viewUsers();
  }, []);

  // ---------------------------------------

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      // Header - Beginning
      <SafeAreaView style={styles.container}>
        <MainHeader screen="Bird Feed" navigation={navigation} />
        <View style={[styles.svg, { transform: [{ translateY: 100 }] }]}>
          <Bird_Drawing />
        </View>
        <TouchableOpacity
          style={[styles.input, { marginVertical: 7 }]}
          onPress={overlayFilterButton}
        >
          <Icon3
            style={styles.input}
            name="options-sharp"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        {overlayFilterClicked && (
          <FilterOverlay 
          setOverlayFilterClicked={setOverlayFilterClicked} 
          overlaFilterClicked={overlayFilterClicked}
          overlayFilterButton={overlayFilterButton} 

          setOverlayDropDownClicked={setOverlayFilterClicked}
          overlayDropDownClicked={overlayDropDownClicked}
          overlayDropDownButton={overlayDropDownButton}

          setAgeState={setAgeState}
          ageState={ageState}

          setNeighborhood={setNeighborhood}
          neighborhood={neighborhood}

          setRentState={setRentState}
          rentState={rentState}

          setLeaseState={setLeaseState}
          leaseState={leaseState}

          setSqFtState={setSqFtState}
          sqFtState={sqFtState}

      // changeMultipleColor(state_a, state_b, state_c, state_d){
      //   if(state_a.pressed == false && (state_b.pressed == true || state_c.pressed == true || state_d.pressed == true)  && (state_b.backgroundColor == '#3B9CF1' || state_c.backgroundColor == '#3B9CF1' || state_d.backgroundColor == '#3B9CF1')) {
      //     state_a.backgroundColor='#3B9CF1';
      //     state_b.backgroundColor='#D9D9D9';
      //     state_c.backgroundColor='#D9D9D9';
      //     state_d.backgroundColor='#D9D9D9';
      //     state_a.pressed=true;
      //     state_b.pressed=false;
      //     state_c.pressed=false;
      //     state_d.pressed=false;
      //     this.setState({backgroundColor: state_a.backgroundColor});
      //     this.setState({backgroundColor: state_b.backgroundColor});
      //     this.setState({backgroundColor: state_c.backgroundColor});
      //     this.setState({backgroundColor: state_d.backgroundColor});
      //     this.setState({pressed: state_a.pressed});
      //     this.setState({pressed: state_b.pressed});
      //     this.setState({pressed: state_c.pressed});
      //     this.setState({pressed: state_d.pressed});
      //   }
          // state1 = {
          //   name: true,
          //   pressed: false,
          //   backgroundColor: '#D9D9D9'
          // };
          // state2 = {
          //   name: false,
          //   pressed: false,
          //   backgroundColor: '#D9D9D9'
          // };
          // <Text style={HousingQ_styles.question1}>Does the property have a</Text>
          // <Text style={HousingQ_styles.question1}>garage?</Text>
          // <TouchableOpacity style={[this.state1, HousingQ_styles.buttonContainerYes1]} 
          // onPress={()=>{
          //   this.changeColor(this.state1, this.state2)
          //   this.props.dispatch(dataActions.updateGarage(this.state1.name))
          // }}>
          // <Text style = {HousingQ_styles.buttonText}>Yes</Text>
          // </TouchableOpacity>
          // <TouchableOpacity style={[this.state2, HousingQ_styles.buttonContainerNo1]}
          // onPress={()=>{
          //   this.changeColor(this.state2, this.state1)
          //   this.props.dispatch(dataActions.updateGarage(this.state1.name))
          // }}>
          //   <Text style = {HousingQ_styles.buttonText}>No</Text>
          // </TouchableOpacity>

          switchEnabledPri={switchEnabledPri}
          toggleSwitchPri={toggleSwitchPri}

          switchEnabledIn={switchEnabledIn}
          toggleSwitchIn={toggleSwitchIn}

          switchEnabledPer={switchEnabledPer}
          toggleSwitchPer={toggleSwitchPer}

          switchEnabledRoo={switchEnabledRoo}
          toggleSwitchRoo={toggleSwitchRoo}

          switchEnabledYes={switchEnabledYes}
          toggleSwitchYes={toggleSwitchYes}

          switchEnabledNo={switchEnabledNo}
          toggleSwitchNo={toggleSwitchNo}

          switchEnabledRec={switchEnabledRec}
          toggleSwitchRec={toggleSwitchRec}

          switchEnabledApt={switchEnabledApt}
          toggleSwitchApt={toggleSwitchApt}
          />
        )}

        {listState && (
          <View styles={styles.flatlist}>
            <FlatList
              data={userList}
              // data={UserData}
              renderItem={(item) => <ProfileCard item={item} />}
              extraData={userList}
              // extraData={UserData}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  input: {
    alignSelf: "flex-start",
    flexDirection: "row",
    color: "black",
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    left: 7,
    color: "#219EBC",
    alignSelf: "center",
    fontFamily: "Pacifico_400Regular",
  },
  headerButtonView: {
    flexDirection: "row",
  },
  headerButtons: {
    marginRight: 15,
    alignSelf: "center",
    padding: 10,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "#219EBC",
  },
  overlay: {
    position: "absolute",
    zIndex: 2,
  },
  filterHeader: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "42%",
    justifyContent: "space-between",
  },
  filterText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Pacifico_400Regular",
    color: "#560CCE",
  },
  filterCard: {
    backgroundColor: "white",
    marginTop: 100,
    position: "absolute",
    zIndex: 2,
    alignSelf: "auto",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 15,
    width: "100%",
    height: 450,
  },
  switchView: {
    marginLeft: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    fontSize: 20,
  },
  subContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "120%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  svg: {
    position: "absolute",
    zIndex: 5,
    // top: 100,
    // left: 200,
  },
});
export default BirdFeed;
