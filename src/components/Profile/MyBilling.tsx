import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { styled } from "@mui/joy";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from "@mui/joy/Input";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import { CreateVNPay } from "../../services/auth.service";
import Table from '@mui/joy/Table';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}
function createData(
    name: string,
    calories: any,
  ) {   
    return { name, calories};
  }
  function createDataBoolean(
    calories: any,
  ) {
    return {calories};
  }
  const tableCellStyle: React.CSSProperties = {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left', // hoặc 'right', 'center', 'justify'
  };

const rowsBasic = [
    createData('E-mail alerts to prospective renters',<DoneIcon color="success"/> ),
    createData('"New" flag for first 30 days ', <DoneIcon color="success"/>),
    createData('RedWeek Verified flag', <CloseIcon sx={{ color: red[500] }}/>),
    createData('Rental agreement creation', <CloseIcon sx={{ color: red[500] }}/>),
    createData('Easy online booking', <CloseIcon sx={{ color: red[500] }}/>),
  ];

const rowNormal = [
    createData('E-mail alerts to prospective renters', <DoneIcon color="success"/>),
    createData('"New" flag for first 30 days ', <DoneIcon color="success"/>),
    createData('RedWeek Verified flag', <DoneIcon color="success"/>),
    createData('Rental agreement creation', <CloseIcon sx={{ color: red[500] }}/>),
    createData('Easy online booking', <CloseIcon sx={{ color: red[500] }}/>),
  ];

  const rowFullService = [
    createDataBoolean(<DoneIcon color="success"/>),
    createDataBoolean(<DoneIcon color="success"/>),
    createDataBoolean(<DoneIcon color="success"/>),
    createDataBoolean(<DoneIcon color="success"/>),
    createDataBoolean(<DoneIcon color="success"/>)
  ];
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

// Custom CSS styles
const formLabelStyle = {
    marginBottom: '10px', 
    fontSize: 'large', // Set font size to large for Typography
    color: 'red'
};

export default function MyBilling(props: any) {
    const [amount, setAmount] = useState("100000");
    const [language, setLanguage] = useState("vn");
    const [selectedService, setSelectedService] = useState("BASIC");

    const handleAmountChange = (value: string) => {
        setAmount(value);
        // Automatically set the selected service based on the chosen amount
        if (value === "100000") {
            setSelectedService("BASIC");
        } else if (value === "200000") {
            setSelectedService("FULL-SERVICE");
        }
    };
  
    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((form as any).entries());
        console.log(formJson);
        const result = await CreateVNPay(form);
        if (result) {
            console.log(result);
            window.location.replace(result);
        }
        console.log(formJson);
    };
  
    return (
        <Container className="ms-3">
    <Row className="justify-content-center">
        <Col md={8}>
            <Typography component="h3">Bạn đang là User lỏ, hãy nạp tiền ở phía bên dưới</Typography>
            <Box className="mt-3 p-3 border border-secondary rounded">
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <FormLabel component="legend">Choose Payment Method:</FormLabel>
                        <RadioGroup
                            aria-label="bankCode"
                            name="bankCode"
                            value=""
                        >
                            <FormControlLabel
                                value=""
                                control={<Radio />}
                                label="VNPay"
                            />
                        </RadioGroup>
                    </div>
                    <div className="mb-3">
                        <FormLabel component="legend">Language:</FormLabel>
                        <RadioGroup
                            aria-label="language"
                            name="language"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <FormControlLabel
                                value="vn"
                                control={<Radio />}
                                label="Vietnamese"
                            />
                            <FormControlLabel
                                value="en"
                                control={<Radio />}
                                label="English"
                            />
                        </RadioGroup>
                    </div>
                    {/* Hidden input field to include amount in the form data */}
                    <input type="hidden" name="amount" value={amount} />
                    <div className="mb-3">
                        <Row>
                            <Col>
                                <Box className="mb-3">
                                    <Typography component="h5">Picture Here</Typography>

                                    <Table sx={{ '& thead th:nth-child(1)': { width: '50%' } }}>
                                    <thead>
                                        <tr>
                                        <th>Ad duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsBasic.map((rowsBasic) => (
                                        <tr key={rowsBasic.name}>
                                            <td >{rowsBasic.name}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </Table>
                                </Box>
                            </Col>
                            <Col>
                                <Box className="mb-3">
                                    
                                    <Typography component="h5">BASIC</Typography>                                    
                                    <Typography component="h5">100.000</Typography>
                                    <Typography>no commissions</Typography>
                                    <Table sx={{ '& thead th:nth-child(1)': { width: '50%' } }}>
                                    <thead>
                                        <tr>
                                        <th>Up to 6 months</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsBasic.map((rowsBasic) => (
                                        <tr key={rowsBasic.name}>
                                            <td>{rowsBasic.calories}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </Table>
                                    <Button type="submit" onClick={() => handleAmountChange("100000")}>Pay now</Button>
                                </Box>
                            </Col>
                            <Col>
                                <Box className="mb-3">
                                    <Typography component="h5">PROTECTED</Typography>                                    
                                    <Typography component="h5">150.000</Typography>
                                    <Typography>no commissions</Typography>
                                    <Table sx={{ '& thead th:nth-child(1)': { width: '50%' } }}>
                                    <thead>
                                        <tr>
                                        <th>Up to 6 months</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowNormal.map((rowNormal) => (
                                        <tr key={rowNormal.name}>
                                            <td>{rowNormal.calories}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </Table>
                                    <Button type="submit" onClick={() => handleAmountChange("150000")}>Pay now</Button>
                                </Box>
                            </Col>
                            <Col>
                                <Box className="mb-3">
                                    <Typography component="h5">FULL-SERVICE</Typography>
                                    <Typography component="h5">200.000</Typography>
                                    <Typography>+$99 only when rented</Typography>
                                    <Table sx={{ '& thead th:nth-child(1)': { width: '50%' } }}>
                                    <thead>
                                        <tr>
                                        <th>Until Rented</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowFullService.map((rowFullService) => (
                                        <tr >
                                                <td>{rowFullService.calories}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </Table>
                                    <Button type="submit" onClick={() => handleAmountChange("200000")}>Pay now</Button>
                                </Box>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Box>  
        </Col>
    </Row>
</Container>

    );
}