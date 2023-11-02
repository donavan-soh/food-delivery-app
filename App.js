import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

const image_width = 0.935 * Dimensions.get('screen').width;
const image_x = 0.73 * Dimensions.get('screen').width;

function HomeScreen({navigation}) {

  const HomeScreenCell = (props) => (
      <Cell
        {...props}
        cellContentView={
          <View style={{backgroundColor: "transparent", highlightUnderlayColor: "#ccc", justifyContent: "center", height: 290}}>
            <Image source={props.imgUri} style={{resizeMode: 'cover', borderRadius: 5, width: image_width, height: 200}}/>
            <View style={{position: "absolute", justifyContent: "center", backgroundColor: "lightgrey", borderRadius: 20, width: 70, height: 50, top: 193, left: image_x}}>
              <Text style={{alignSelf: "center", textAlign: "center", fontSize: 15, fontWeight: "bold"}}>{props.eta}</Text>
            </View>
            <Text style={{alignSelf: "flex-start", marginBottom: 10, color: "black", fontSize: 20, fontWeight: "bold"}}>{props.title}</Text>
            <Text style={{alignSelf: "flex-start", color: "grey", fontSize: 13}}>{props.tagline}</Text>
          </View>
        }
        onPress={props.action}
      />
  )

  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        <TableView>
            <Section header = "Restaurant">
              <HomeScreenCell
                title="Pasta Blasta"
                tagline="Wester, French, Pasta, £££££"
                eta="60 mins"
                imgUri={require('./images/pasta.jpg')}
                action={() => 
                  navigation.navigate("Menu", {
                    items:[
                      {"title":"Pasta", "contents":[{"title":"Carbonara"}, {"title":"Prawn Aglio Olio"}, {"title":"Meatball Marinara Linguine"}, {"title":"Bucatini Pasta"},]},
                      {"title":"Side-dish", "contents":[{"title":"Mashed Potato"}, {"title":"French Fries"}, {"title":"Corn"}, {"title":"Salad"}, {"title":"Onion Rings"},]}
                    ]
                  })
                }
              />
              <HomeScreenCell
                title="I-Scream"
                tagline="Desert, Ice cream, ££"
                eta="10 mins"
                imgUri={require('./images/icecream.jpg')}
                action={() => 
                  navigation.navigate("Menu", {
                    items:[
                      {"title":"Gelato", "contents":[{"title":"Vanilla"}, {"title":"Chocolate"}, {"title":"Mint"}, {"title":"Cookies and Cream"}, {"title":"Strawberry"}]},
                      {"title":"Coffee", "contents":[{"title":"Flat White"}, {"title":"Latte"}, {"title":"Caffe Americano"}]},
                      {"title":"Milkshake", "contents":[{"title":"Chocolate"}, {"title":"Vanilla"}, {"title":"Strawberry"}]}
                    ]
                  })
                }
              />
              <HomeScreenCell
                title="Asian Fusion"
                tagline="Asian, Chinese, £££"
                eta="10-30 mins"
                imgUri={require('./images/dimsum.jpg')}
                action={() => 
                  navigation.navigate("Menu", {
                    items:[
                      {"title":"Dim Sum", "contents":[{"title":"Har Kow"}, {"title":"Siew Mai"}, {"title":"Char Siew Bao"}, {"title":"Carrot Cake"}, {"title":"Custard Bun"}]},
                      {"title":"Tea", "contents":[{"title":"Pu'Er Tea"}, {"title":"Chrysanthemum Tea"}, {"title":"Green Tea"}]}
                    ]
                  })
                }
              />
            </Section>
        </TableView>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

function DetailsScreen({route, navigation}) {

  const DetailsScreenCell = (props) => (
    <Cell
      {...props}
      cellContentView={
        <View style={{backgroundColor: "transparent", highlightUnderlayColor: "#ccc", justifyContent: "center", height: 30}}>
          <Text>{props.customLabel}</Text>
        </View>
      }
      onPress={props.action}
    />
)

  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        <TableView>
          {route.params.items.map((section, i) => (
            <Section
              header={section.title}
            >
              {section.contents.map((cell, i) => (
                <DetailsScreenCell 
                  customLabel = {cell.title}
                />
              ))}
            </Section>
          ))}
        </TableView>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={HomeScreen} />
        <Stack.Screen name="Menu" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
