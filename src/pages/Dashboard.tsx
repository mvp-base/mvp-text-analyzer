import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Container } from 'react-bootstrap';

export default function Dashboard() {
  const data = useSelector((state: RootState) => state.data.data);

  console.log(data);

  return (
    <Container className="my-5">
      <h1>Dashboard</h1>
    </Container>
  );
}
