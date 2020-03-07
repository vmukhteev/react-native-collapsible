/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Accordion from '@vmukhteev/react-native-collapsible/Accordion';

const App = () => {
  const [activeSections, setActiveSections] = useState([]);

  const [view01Offset, setView01Offset] = useState(0);
  const [wrapHeight, setWrapHeight] = useState(0);
  const [diff, setDiff] = useState(0);

  const ref = useRef(null);
  const scrollPos = useRef(0);

  const renderHeader = ({}) => (
    <View style={{flex: 1, height: 100}}>
      <Text>header</Text>
    </View>
  );

  const accordionOffset = view01Offset;

  const renderContent = ({}) => (
    <View style={{backgroundColor: 'red', flex: 1, height: 200}}>
      <Text>content</Text>
    </View>
  );

  return (
    <ScrollView
      ref={ref}
      onScroll={e => (scrollPos.current = e.nativeEvent.contentOffset.y)}
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setWrapHeight(height);
      }}>
      <View>
        <Text>diff: {diff}</Text>
        <Text>wrapHeight: {wrapHeight}</Text>
        <Text>accordionOffset: {accordionOffset}</Text>
        <View
          onLayout={({
            nativeEvent: {
              layout: {y},
            },
          }) => {
            setView01Offset(y);
          }}>
          <Accordion
            sections={[
              1,
              2,
              3,
              4,
              1,
              2,
              3,
              41,
              2,
              3,
              41,
              2,
              3,
              41,
              2,
              3,
              41,
              2,
              3,
              4,
            ]}
            renderContent={renderContent}
            renderSectionTitle={() => null}
            renderHeader={renderHeader}
            activeSections={activeSections}
            onChange={setActiveSections}
            sectionStyle={{borderWidth: 1}}
            sectionStyleFirst={{borderWidth: 4}}
            onExpand={({y, height}) => {
              const diff =
                scrollPos.current + wrapHeight - (accordionOffset + y + height);
              if (diff < 0 && ref.current) {
                ref.current.scrollTo({
                  y: scrollPos.current - diff,
                  animate: false,
                });
              }
            }}
            // duration={3000}
          />
        </View>
      </View>
    </ScrollView>
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
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
});

export default App;
