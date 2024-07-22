import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';
import { Container, Form } from 'react-bootstrap';
import styles from './Dashboard.module.scss';
import { IDashboardData } from '../interfaces/global';
import PageHeader from '../components/PageHeader';
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

function EmptyDashboardContent() {
  return (
    <>
      <p>Please, select a file to display analyzed data.</p>
    </>
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

    const highligtedText = words.map((word: string) => {
      const isMatching = entities.find(
        (entity: any) => entity.matchedText.toLowerCase() === word.toLowerCase()
      );
      var displayedWord = '';

      if (word !== '.') {
        displayedWord = word + ' ';
      }

      if (isMatching) {
        return <span className="fw-bold">{displayedWord}</span>;
      } else return <span>{displayedWord}</span>;
    });

    return highligtedText;
  };

  return (
    <>
      <Container className="card">
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

      <Container className="card">
        <h2>Single Line Analysis</h2>
        {rows.map((row, index) => {
          if (row) {
            return (
              <Container
                fluid
                className={styles['line-analysis-row']}
                key={index}
              >
                <div
                  className={`${styles['separator-margin']}} horizontal-separator-dark`}
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
    <Container fluid className={styles['dashboard-container']}>
      <PageHeader
        text="Dashboard"
        description="Select a file to view detailed analysis. The dashboard displays overall
        topic distribution and single line analysis of the selected file."
      />

      <Container>
        <Form.Select value={selectedFile} onChange={handleSelectionChange}>
          <option value="">No file selected</option>
          {sortedFileNames.map((key, index) => {
            return <option key={index}>{key}</option>;
          })}
        </Form.Select>
      </Container>

      <Container>
        {selectedFile === '' || selectedFile === null ? (
          <EmptyDashboardContent />
        ) : (
          <DashboardContent {...files[selectedFile]} />
        )}
      </Container>
    </Container>
  );
}
