"use client"

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import DashboardCard from '@/components/cards/DashboardCard';
import Header from '@/components/Header';
import ActionCards from '@/components/cards/ActionCards';

import styles from './Home.module.scss'

export default function Home() {
  const [dayPeriod, setDayPeriod] = useState<string>('Greetings!');


  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      setDayPeriod('Good morning!');
    } else if (hour < 18) {
      setDayPeriod('Good afternoon!');
    } else {
      setDayPeriod('Good evening!');
    }
  }, []);

  return (
    <Container fluid>
      <Container fluid>
        <Header
          text="Dashboard"
          description="Select a file to view detailed analysis. The dashboard displays overall
                     topic distribution and single line analysis of the selected file."
          size={1}
        />
        <ActionCards />
      </Container>
      <Row>
        <Header
          text={`Import new file`}
          size={2}
        />
        <Container>
          <Row>
            <Col>
              <DashboardCard
                header={dayPeriod}
                caption={
                  <>
                    <p>Upload a text file, and the app will analyze the word frequencies, displaying the results in easy-to-understand graphs.</p>
                    <p>Upload your text file, View the analysis, Explore.</p>
                  </>
                }
              />
            </Col>
            <Col>
              <DashboardCard
                header='API Key'
                caption={
                  <div className={styles.apiCard}>
                    <p>
                      By default, we use a shared API key with global limits. To avoid potential restrictions, you can enter your own API key below.
                    </p>
                    <p>
                      You can optain your personal API Key using <a href="https://www.textrazor.com" target="_blank" rel="noopener noreferrer">this link</a> after registering.
                    </p>
                    <Form>
                      <Form.Label className={styles.apiInputLabel}>Put your API key here</Form.Label>
                      <Form.Control disabled size="sm" type="text" placeholder='Enter your API key' className={styles.apiInput} />
                    </Form>
                    <p className={styles.apiNote}>
                      Your API key is not stored on our side and is used solely for the app's functionality.
                    </p>
                    <p className={styles.apiNote}>
                      This feature is not yet available.
                    </p>
                  </div>
                }
              />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container >
  );
}


//Welcome card
//Token card and instructions
//