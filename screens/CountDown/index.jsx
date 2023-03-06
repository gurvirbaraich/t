import { View } from "react-native";
import { Text } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function CountDown(props) {
   const time = props.route.params;

   if (!time) {
      props.navigation.goBack();
   }

   const f = (t) => {
      const s = t % 60;
      const m = Math.floor(t / 60);
      const h = Math.floor(m / 60);
      const i = new Intl.NumberFormat("en-US", {
         minimumIntegerDigits: 2
      });

      i.f = i.format;

      return (`${i.f(h)}:${i.f(m % 60)}:${i.f(s)}`);
   }

   return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
         <CountdownCircleTimer
            isPlaying
            duration={((time.hours * 60) + time.minutes) * 60}
            colors={['#004777']}
            onComplete={props.navigation.goBack}
         >
            {({ remainingTime }) => <Text>{f(remainingTime)}</Text>}
         </CountdownCircleTimer>
      </View>
   )
}