import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteData } from '../redux/dataSlice';
import { Container, Form, Button } from 'react-bootstrap';

export default function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);

  console.log(data);

  const handleDelete = (filename: string) => {
    dispatch(deleteData({ filename }));
  };

  return (
    <Container className="my-5">
      <h1>Dashboard</h1>
    </Container>
  );
}
