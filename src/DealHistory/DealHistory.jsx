import { useEffect, useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow } from '@mui/material';

const Dealhistory = ({ features, user }) => {
  const [groupedDeals, setGroupedDeals] = useState([]);

  useEffect(() => {
    query('deals').whereNot('id', user?.id).orderByDesc('createdAt').fetch().then(results => {
      const groups = results.reduce((groups, deal) => {
        const date = deal.createdAt.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(deal);
        return groups;
      }, {});
      
      const groupedDeals = Object.keys(groups).map((date) => {
        return {
          date,
          deals: groups[date]
        };
      });

      setGroupedDeals(groupedDeals)
    })
  }, [user?.id]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontFamily: 'Poppins',
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#E6E6E6',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className='dealHistory-container'>
      <h1>Minhas compras</h1>
      {groupedDeals?.map(group => {
        return <>
          <h2 key={group.date}>{new Date(group.date).toLocaleString().split(" ")[0]}</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {group.deals?.map((deal) => {
                  const feature = features.find(f => f.id === deal.productsId);
                  return <StyledTableRow key={deal.id}>
                    <StyledTableCell align="center">{feature.title}</StyledTableCell>
                    <StyledTableCell align="left">{feature.description}</StyledTableCell>
                    <StyledTableCell align="left">${feature.price}</StyledTableCell>
                    <StyledTableCell align="left">{deal.reason}</StyledTableCell>
                  </StyledTableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br/>
        </>
      })}
    </div>
  );

}

export default Dealhistory