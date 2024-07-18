import { Stack, Link } from 'expo-router';
import { Image, YStack } from "tamagui";

import { Container, Main, Title, Subtitle, Button, ButtonText } from '../tamagui.config';

export default function Page() {
  return (
    <Container style={{backgroundColor: '#350A24', textAlign: 'center', justifyContent:'center', fontStyle:'Inter' }}>
      <Main justifyContent='center' alignItems='center'>
        <Stack.Screen options={{ title: 'Tercer Momento Piensas'}} />
        <Image
          source={
            require('../assets/Camera.png')
        }
        />
        <YStack>
          <Title style={{ color: 'white', fontSize: 20, fontWeight: 'bold',  }}>Movie {'\n'} Making </Title>
        </YStack>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button backgroundColor='#752D59' width='40%'>
            <ButtonText>Begin</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
