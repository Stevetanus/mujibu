import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IPaginationProps {
  count?: number;
  page: number;
  onClick?: Function;
}

const CustomPagination = (props: IPaginationProps) => {
  const { onClick, count = 1, page = 1 } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onClick && onClick(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        renderItem={(item) => <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />}
      />
    </Stack>
  );
};

export default CustomPagination;
