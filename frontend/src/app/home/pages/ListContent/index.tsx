import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Wallpaper, TableDiv, LabelDiv, Rick } from './style';
import RickImage from "../../../../shared/assets/rick_astley2.png";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiButton from '../../../../shared/components/MuiButton';

const ListContent: React.FC = () => {
   
  

    // =====================================================================
    interface Data {
        artist: number;
        carbs: number;
        album: string;
        release_date: number;
        id: number;
        protein: number;
    }

    interface ColumnData {
        dataKey: keyof Data;
        label: string;
        numeric?: boolean;
        width: number;
    }

    type Sample = [string, string, number, number, number];

    const sample: readonly Sample[] = [
        ['Frozen yoghurt', 'teste', 6.0, 24, 4.0],
        ['Ice cream sandwich', 'teste2', 9.0, 37, 4.3],
        ['Eclair', 'teste3', 16.0, 24, 6.0],
        ['Cupcake', 'teste4', 3.7, 67, 4.3],
        ['Gingerbread', 'teste5', 16.0, 49, 3.9],
    ];

    function createData(
    id: number,
    album: string,
    artist: number,
    release_date: number,
    carbs: number,
    protein: number,
    ): Data {
    return { id, album, artist, release_date, carbs, protein };
    }

    const columns: ColumnData[] = [
        {
          width: 200,
          label: 'Albums',
          dataKey: 'album',
        },
        {
          width: 120,
          label: 'Artist',
          dataKey: 'artist',
          numeric: true,
        },
        {
          width: 120,
          label: 'Release Date',
          dataKey: 'release_date',
          numeric: true,
        },
        {
          width: 120,
          label: 'Foo',
          dataKey: 'carbs',
          numeric: true,
        },
        {
          width: 120,
          label: 'Bar',
          dataKey: 'protein',
          numeric: true,
        },
    ];
      
    const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
      const randomSelection = sample[Math.floor(Math.random() * sample.length)];
      return createData(index, ...randomSelection);
    });

    const VirtuosoTableComponents: TableComponents<Data> = {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
          <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
          <TableBody {...props} ref={ref} />
        )),
    };

    function fixedHeaderContent() {
        return (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        );
    }

    function rowContent(_index: number, row: Data) {
        return (
          <React.Fragment>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? 'right' : 'left'}
              >
                {row[column.dataKey]}
              </TableCell>
            ))}
          </React.Fragment>
        );
    }

    // =====================================================================

    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }
    
    function CustomTabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
     
    
    return (
        <Wallpaper>
          <LabelDiv>
            {/* <Chip label="LIST CONTENT" size='medium' color="default" style={{ fontSize: 15, width: '100%'}} /> */}
          </LabelDiv>
          {/* <Rick src={RickImage}></Rick> */}

          {/* <TableDiv>
              <Paper style={{ height: 400, width: '100%' }}>
                <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
              </Paper> 
          </TableDiv> */}

          <TableDiv>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered textColor="secondary" indicatorColor="secondary" >
                  <Tab label="Albuns" {...a11yProps(0)} />
                  <Tab label="Músicas" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Paper style={{ height: 400, width: '100%', marginBottom: '20px'}}>
                  <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                  />
                </Paper> 
                <MuiButton />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <Paper style={{ height: 400, width: '100%', marginBottom: '20px'}}>
                  <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                  />
                </Paper>
                <MuiButton />
              </CustomTabPanel>
            </Box>
          </TableDiv>
        </Wallpaper>
    );
};

export default ListContent;
