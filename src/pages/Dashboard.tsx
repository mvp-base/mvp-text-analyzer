import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../redux/fileMgrSlice';
import { RootState } from '../redux/store';
import { Container, Form } from 'react-bootstrap';

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

interface RowData {
  id: number;
  row: string;
  entities: any[];
  topics: any[];
  language: string;
}

interface DataInterface {
  globalStats: any;
  rows: RowData[];
}

function DashboardContent({ globalStats, rows }: DataInterface) {
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#964141',
    '#16538d',
  ];

  return (
    <Container fluid>
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie
            data={globalStats}
            nameKey="label"
            dataKey="count"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {globalStats.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
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
      {/* <Container fluid className="body-header">
        <h1>Dashboard</h1>
      </Container> */}
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
