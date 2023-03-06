import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import React from "react";

const Container = styled.View`
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   padding: ${props => props._padding ? props._padding : "0px"};
   align-items: ${props => props.float ? props.float : "flex-start"};
   background-color: ${props => props.backgroundColor ? props.backgroundColor : "transparent"}
`;

const ContainerF = styled.View`
   flex: 1;
   align-items: ${props => props.float ? props.float : "flex-start"};
`;

const HomeContainer = styled.View`
   flex: 1;
   background-color: #193A4E;
`;

const Background = styled.ImageBackground`
   flex: 4;
   padding: 48px 24px;
   padding-bottom: 0px;
`;

const Text = styled.Text`
   padding-left: ${props => props.pl ? props.pl : "0px"};
   margin-right: ${props => props.mr ? props.mr : "0px"};
   font-size: ${props => props.fontSize ?? 16}px;
   position: ${props => props.position ?? "relative"};
   top: ${props => props.t ?? "0"}px;
   left: ${props => props.l ?? "0"}px;
   color: ${props => props.color ? props.color : "black"}
   font-family: ${props => props.bungee ? "bungee" : (props.bold ? "poppins-bold" : "poppins")};
`;

const MainSection = styled.View`
   flex: 1;
   padding: 21px 24px;
`;

const Box = styled.View`
   width: 100%;
   height: 71px;
   padding: 12px 14px;
   border-radius: 10px;
   position: relative;
   background-color: #FFFFFF;
`;

const LocationImage = styled.Image`
   width: 14px;
   height: 13px;
`;

const WeatherImage = styled.Image`
   width: 25px;
   height: 25px;
`;

const HeartImage = styled.Image`
   width: 25px;
   height: 22px;
`;

const FlexBox = styled.View`
   flex-wrap: nowrap;
   align-items: center;
   justify-content: center;
`;

const Overlay = styled.View`
   top: 0;
   flex: 1;
   left: 0;
   right: 0;
   bottom: 0;
   position: absolute;
   background-color: #00000050;
`;

const i = new Intl.NumberFormat("en-us", { minimumIntegerDigits: 2});
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

i.f = i.format;

export default function Home({ navigation }) {
   const [showModel, setShowModel] = React.useState(false);

   const onChange = (_, s) => {
      const { type } = _;
      const d = new Date(s);

      if (type === "set") {
         navigation.navigate("countdown", {
            hours: d.getHours(),
            minutes: d.getMinutes(),
         });
      }

      setShowModel(false);
   }

   const currentDay = function () {
      const d = new Date();

      return `${days[d.getDay() - 1]}`;
   }

   const currentDate = function () {
      const d = new Date();

      return `${months[d.getMonth()]} ${i.f(d.getDate())}, ${d.getFullYear()}`;
   }

   return (
      <HomeContainer>
         <StatusBar translucent={true} />
         <Background source={require("./images/background.png")}>
            <Text fontSize="32" bungee marginBottom={Platform.OS === "android" ? -10 : 8}>Hello, User 👋</Text>
            <Text width="85%" color={"#4F4F4F"}>The weather is clear, we can go exercise outside.</Text>

            <Box marginTop={30}>
               <ContainerF marginTop={Platform.OS === "android" ? 0 : 5}>
                  <Text>{currentDay()}</Text>
                  <Text fontSize={12} color={"#788FA0"}>{currentDate()}</Text>
               </ContainerF>
               <ContainerF float={"flex-end"} marginTop={Platform.OS === "android" ? -35 : -45}>
                  <FlexBox>
                     <Text>
                        <LocationImage source={require("./images/location.png")} />
                        <Text fontSize="10">
                           Baraich
                        </Text>
                     </Text>
                  </FlexBox>
                  <FlexBox marginTop={Platform.OS === "android" ? -15 : -5}>
                     <Text>
                        <WeatherImage source={require("./images/weather02-512.webp")} />
                        <Text fontSize="18" bungee>
                           31° C
                        </Text>
                     </Text>
                  </FlexBox>
               </ContainerF>
            </Box>
         </Background>
         <MainSection>
            <Text bungee fontSize="24" color="#FFFFFF">Daily Routine</Text>

            <TouchableOpacity>
               <Box marginTop={Platform.OS === "android" ? 3 : 13}>
                  <Text position={"relative"} marginTop={Platform.OS === "android" ? -0 : 8} marginRight={30}>
                     <Container>
                        <Text>
                           <Container width={44} height={45} backgroundColor={"#FB7F3020"} _padding={"0px 10px"}>
                              <HeartImage source={require("./images/heart.png")} />
                           </Container>

                           <Container>
                              {
                                 Platform.OS === "android" ? (
                                    <>
                                       <Text fontSize="16" position="absolute" t={-33} bungee pl={"10px"}>START NOW!</Text>
                                       <Text width="75%" fontSize="11" color="#788FA0" pl={"10px"}>Go to a cozy place and rest your mind</Text>
                                    </>
                                 ) : (
                                    <>
                                       <Text fontSize="16" bungee pl={"10px"} >START NOW!</Text>
                                       <Text width="75%" fontSize="11" color="#788FA0" pl={"10px"}>Go to a cozy place and rest your mind</Text>
                                    </>
                                 )
                              }
                           </Container>
                        </Text>
                     </Container>
                     {
                        (showModel) && (
                           <DateTimePicker
                              mode={"time"}
                              value={new Date("2023-03-06T00:00:00.000")}
                              onChange={onChange}
                              display={"default"}
                              testID="dateTimePicker"
                           />
                        )
                     }
                  </Text>
               </Box>
            </TouchableOpacity>
         </MainSection>
      </HomeContainer>
   );
}