import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from 'styled-components/native';
import { setItemAsync } from "expo-secure-store";

const OnboardingContainer = styled.View`
   flex: 1;
`;

const OnboardingImage = styled.View`
   height: 65%;
`;
   
const OnboardingBox = styled.View`
   left: 0;
   width: 100%;
   bottom: -40px;
   padding: 52px;
   position: absolute;
   background-color: #FFF;
   height: ${Platform.OS === "android" ? "44%" : "47%"};
   padding-top: ${Platform.OS === "android" ? "52px" : "7.5%"};
   border-radius: ${Platform.OS === "android" ? "50px" : "40px"};
`;

const Image = styled.Image`
   width: 100%;
   height: 100%;
`;

const Text = styled.Text`
   font-size: ${props => props.fontSize}px;
   color: ${props => props.color ? props.color : "black"}
   font-family: ${props => props.bungee ? "bungee" : (props.bold ? "poppins-bold" : "poppins")};
`;

const TitleText = styled.Text`
   line-height: ${23 * 1.38}px;
   font-size: ${props => props.fontSize}px;
   color: ${props => props.color ? props.color : "black"}
   font-family: ${props => props.bungee ? "bungee" : (props.bold ? "poppins-bold" : "poppins")};
`;

const TouchableButton = styled.TouchableOpacity`
   padding: 13px 0;
   align-items: center;
   justify-content: center;
   background-color: #FB7F30;
   width: ${Platform.OS === "android" ? "93%" : "252px"};
   margin-top: ${Platform.OS === "android" ? "12px" : 0};
`;

export default function Onboarding({ navigation }) {
   const onFinished = () => {
      const setFinished = async function () {
         return setItemAsync("finished_onboarding", "true");
      }

      setFinished().then(() => navigation.navigate("home"));
   }

   return (
      <OnboardingContainer>
         <StatusBar style="dark" />
         <OnboardingImage>
            <Image source={require("./images/onboarding.webp")} />
         </OnboardingImage>
         <OnboardingBox>
            <OnboardingContainer>
               <TitleText bungee fontSize={23} marginBottom={14}>Time To Make Your Soul Relaxed</TitleText>
               <Text width={Platform.OS === "android" ? "95%" : 252} color={"#788FA0"} marginBottom={17} fontSize={16}>Getting more focus in a couple of minutes with a simple movement</Text>

               <TouchableButton onPress={onFinished}>
                  <Text bold fontSize={24} color="#FFFFFF">Get Started</Text>
               </TouchableButton>
            </OnboardingContainer>
         </OnboardingBox>
      </OnboardingContainer>
   );
}