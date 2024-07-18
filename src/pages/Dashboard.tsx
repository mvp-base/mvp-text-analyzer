import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';
import { Container, Form } from 'react-bootstrap';
import { IDashboardData } from '../interfaces/global';

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
    <Container fluid>
      <p>Please, select imported file to display analyzed data.</p>
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

    const highligtedText = words.map((word: string) => {
      const isMatching = entities.find(
        (entity: any) => entity.matchedText.toLowerCase() === word.toLowerCase()
      );

      if (isMatching) {
        return <span className="fw-bold">{word}</span>;
      } else return <span>{word}</span>;
    });

    return highligtedText;
  };

  return (
    <Container fluid>
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

      <Container className="card">
        <h2>Single Line Analysis</h2>
        {rows.map((row, index) => {
          if (row) {
            return (
              <Container fluid className="my-4" key={index}>
                <div className="horizontal-separator bg-dark mb-3" />
                {processedText(row.rowText, row.entities)}
              </Container>
            );
          }
          return null;
        })}
      </Container>
    </Container>
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
    <Container fluid>
      <h1 className="m-3">Dashboard</h1>

      <Container>
        <Form.Select value={selectedFile} onChange={handleSelectionChange}>
          <option value="">No file selected</option>
          {sortedFileNames.map((key, index) => {
            return <option key={index}>{key}</option>;
          })}
        </Form.Select>
      </Container>

      <Container fluid>
        {selectedFile === '' || selectedFile === null ? (
          <EmptyDashboardContent />
        ) : (
          <DashboardContent {...files[selectedFile]} />
        )}
      </Container>
    </Container>
  );
}
