import React from 'react';
import { Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import history from 'modules/history';
import theme from 'modules/theme';
import config from 'config';
import BookingMask from 'containers/BookingMask';
import { Container, Heading, Screen, utils } from 'styled-minimal';
import SystemAlerts from 'containers/SystemAlerts';
import GlobalStyles from 'components/GlobalStyles';

const Header = styled.div`
  margin-bottom: ${utils.spacer(3)};
  text-align: center;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.title}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            <Screen key="PageContent" data-testid="PageContentWrapper">
              <Container verticalPadding>
                <Header>
                  <Heading>Booking mask test assignment</Heading>
                </Header>
                <BookingMask />
              </Container>
            </Screen>
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}
