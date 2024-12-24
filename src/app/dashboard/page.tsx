'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Container, OverlayTrigger, Popover, Row, Col } from 'react-bootstrap';
import { IDashboardData } from '@/interfaces/global';
import Header from '@/components/Header';
import ActionCards from '@/components/cards/ActionCards';
import DashboardCard from '@/components/cards/DashboardCard';
import {
  ResponsiveContainer,
  Legend,
  Pie,
  PieChart,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Treemap
} from 'recharts';

import styles from './dashboard.module.scss'
import GraphCard from '@/components/cards/GraphCard';

function EmptyDashboardContent() {
  return (
    <Container className={styles.dashboard}>
      <Col xs={12} md={6}>
        <DashboardCard
          header='No File Selected'
          caption={
            <p>Please, select a file to display analyzed data.</p>
          }
        />
      </Col>
    </Container>
  );
}

function DashboardContent({ globalTopics, detailedTopics, topTopics, entities, sentences }: IDashboardData) {
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#964141',
    '#16538d',
  ];

  return (
    <>
      <Container fluid>
        <div>
          <Header
            text={`Overall file analysis`}
            size={2}
          />
        </div>

        <Row>
          <Col>
            <GraphCard
              header='Relevance Across Categories'
              caption=''
              graph={
                <ResponsiveContainer height={300}>
                  <PieChart>
                    <Pie
                      data={globalTopics}
                      nameKey="name"
                      dataKey="score"
                      outerRadius={60}
                      fill="#8884d8"
                      label
                    >
                      {globalTopics.map((entry: any, index: any) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                          onClick={() => window.open(entry.wikiLink, '_blank')}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              }
            />
          </Col>
          <Col>
            <GraphCard
              header='Most Common Topics Analyzed'
              caption=''
              graph={
                <Row className={styles.topTopicsContainer}>
                  {topTopics.map((topic, index) => {
                    const popover = (
                      <Popover id={`popoverTopTopics-${index}`}>
                        <Popover.Body>
                          <p><b>{topic.name}</b></p>
                          <span>Score: {topic.score}</span> <br />
                          <span>Link: {topic.wikiLink}</span>
                        </Popover.Body>
                      </Popover>
                    );

                    return (
                      <Col key={index} className={styles.topTopicsCol}>
                        <i className={`bi bi-${index + 1}-square fs-5`}></i>
                        <OverlayTrigger
                          trigger={['hover', 'focus']}
                          placement="bottom"
                          overlay={popover}
                        >
                          <p
                            className={styles.topTopicText}
                            onClick={() => window.open(topic.wikiLink, "_blank")}
                          >
                            {topic.name}
                          </p>
                        </OverlayTrigger>
                      </Col>
                    );
                  })}
                </Row>
              }
            />
            <GraphCard
              header=' Topics Analyzed'
              caption=''
              graph={
                <ResponsiveContainer height={0}>
                  <Treemap
                    data={topTopics}
                    dataKey="score"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                  />
                </ResponsiveContainer>
              }
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <GraphCard
              header='Other Topics Analyzed'
              caption=''
              graph={
                <ResponsiveContainer height={300}>
                  <BarChart data={detailedTopics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              }
            />
          </Col>
        </Row>

      </Container >

      <Container >
        <Header
          text={`Single Line Analysis`}
          size={2}
        />
        <Col>
          {sentences.map((sentence, sentenceIndex) => {
            const hasMatch = sentence.some((word) =>
              entities.some((entity) => entity.endingPos === word.endingPos)
            );

            if (!hasMatch) {
              return null;
            }

            return (
              <GraphCard
                key={sentenceIndex}
                graph={
                  <p>
                    {sentence.map((word, wordIndex) => {
                      const isMatched = entities.some(
                        (entity) => entity.endingPos === word.endingPos
                      );

                      const isPunctuation = [',', '.', '!', '?', ';', ':'].includes(word.token);

                      return (
                        <span
                          key={wordIndex}
                          style={{
                            fontWeight: isMatched ? 'bold' : 'normal',
                            color: isMatched ? 'red' : 'black',
                          }}
                        >
                          {!isPunctuation && ' '}
                          {word.token}
                        </span>
                      );
                    })}
                  </p>
                }
              />
            );
          }
          )}
        </Col>
      </Container>
    </>
  );
}

export default function Dashboard() {
  const files = useSelector((state: RootState) => state.fileMgr.files);
  const selectedFile = useSelector(
    (state: RootState) => state.fileMgr.selectedFile
  );

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
      {selectedFile === '' || selectedFile === null ? (
        <EmptyDashboardContent />
      ) : (
        <DashboardContent {...files[selectedFile]} />
      )}
    </Container>
  );
}
