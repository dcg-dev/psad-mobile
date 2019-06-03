import React from 'react';
import { Image } from 'react-native';
import { Content, Container, View } from 'native-base';
import { Text, Button} from '../../Components';
import styles from '../Styles/HomeScreenStyles';
import { Fonts, Metrics, Colors, Images } from '../../Themes';

export default class AuthHomeScreen extends React.Component {
	render() {
		return (
			<Container>
        <Content>
          <View style={styles.content}>
            <View style={styles.spaceLarge}>
              <Text
                text="SMART PARKING"
                color={Colors.primary.base}
                type="medium"
                size={Fonts.size.big}
              />
            </View>
            <Image source={Images.launch} style={styles.logo}></Image>
            <View style={{...styles.center, paddingLeft: Metrics.space.small, paddingRight: Metrics.space.small}}>
              <Text
                text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et"
                type="regular"
                size={Fonts.size.medium}
                opacity={0.9}
                textAlign="center"
              />
            </View>
            <View style={styles.spaceLarge}>
              <Button
                onPress={() => this.props.navigation.navigate("LoginScreen")}
                name="LOG IN"
              />
              <Button
                name="REGISTER"
                marginTop={Metrics.space.small}
                bordered
                onPress={() => this.props.navigation.navigate("RegisterScreen")}
              />
            </View>
          </View>
        </Content>
      </Container> 
		);
	}
}
