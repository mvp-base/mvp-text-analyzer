'use client';

import store from '@/redux/store';
import { Provider } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '@/components/Navigation';
import Links from '@/components/Links';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Container fluid id="MainLayout">
            <Row>
              <Links direction="horizontal" />
            </Row>
            <Row>
              <Col xs="auto">
                <Navigation direction="vertical" />
              </Col>
              <Col id="Body">
                {children}
              </Col>
            </Row>
          </Container>
        </Provider>
      </body>
    </html>
  );
}