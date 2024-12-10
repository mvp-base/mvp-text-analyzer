'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '@/redux/fileMgrSlice';
import { RootState } from '@/redux/store';
import { Container, Form, OverlayTrigger, Popover, Row, Col } from 'react-bootstrap';
import { IDashboardData } from '@/interfaces/global';
import Header from '@/components/Header';
import ActionCards from '@/components/cards/ActionCards';
import DashboardCard from '@/components/cards/DashboardCard';
import {
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

import styles from './dashboard.module.scss'

function EmptyDashboardContent() {
  return (
    <Container>
      <Row className={styles.dashboard}>
        <Col xs={12} md={6}>
          <DashboardCard header='No File Selected' caption='Please, select a file to display analyzed data.' />
        </Col>
      </Row>
    </Container>
  );
}

function DashboardContent({ globalTopics, rows }: IDashboardData) {
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#964141',
    '#16538d',
  ];

  const processedText = (text: string, entities: any) => {
    const words = text.split(/\s+/);

    const highligtedText = words.map((word: string, index) => {
      const matchedEntity = entities?.find(
        (entity: any) =>
          entity.matchedText.toLowerCase() === word.trim().toLowerCase()
      );

      const popover = (
        <Popover id={`popover-${index}`}>
          <Popover.Body>{matchedEntity?.wikiLink}</Popover.Body>
        </Popover>
      );

      return (
        <>
          {index > 0 && <span> </span>}
          {matchedEntity ? (
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popover}
            >
              <span>{word}</span>
            </OverlayTrigger>
          ) : (
            <span>{word}</span>
          )}
        </>
      );
    });

    return highligtedText;
  };

  return (
    <>
      <Container>
        <div>
          <h2>Overall file analysis</h2>
        </div>
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie
              data={globalTopics}
              nameKey="label"
              dataKey="count"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {globalTopics.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Container>

      <Container >
        <h2>Single Line Analysis</h2>
        {rows.map((row, index) => {
          if (row) {
            return (
              <Container
                fluid
                key={index}
              >
                <div
                  className={`horizontal-sepaarator-dark`}
                />
                {processedText(row.rowText, row.entities)}
              </Container>
            );
          }
          return null;
        })}
      </Container>
    </>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.fileMgr.files);
  const sortedFileNames = Object.keys(files).sort();
  const selectedFile = useSelector(
    (state: RootState) => state.fileMgr.selectedFile
  );

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedFile(event.target.value));
  };

  return (
    <Container className='flexCol' fluid>
      <Header
        text="Dashboard"
        description="Select a file to view detailed analysis. The dashboard displays overall
        topic distribution and single line analysis of the selected file."
        size={1}
      />

      <ActionCards />

      {/* <Container>
        <Form>
          <Form.Label>Select file</Form.Label>
          <Form.Select value={selectedFile} onChange={handleSelectionChange}>
            <option value="">No file selected</option>
            {sortedFileNames.map((key, index) => {
              return <option key={index}>{key}</option>;
            })}
          </Form.Select>
        </Form>
      </Container> */}

      <Container className={styles.dashboard}>
        {selectedFile === '' || selectedFile === null ? (
          <EmptyDashboardContent />
        ) : (
          <DashboardContent {...files[selectedFile]} />
        )}
      </Container>
    </Container>
  );
}
