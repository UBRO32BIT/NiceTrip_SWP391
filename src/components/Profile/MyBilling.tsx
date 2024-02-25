import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import * as React from "react";
import {useSelector} from "react-redux";
import {ChangeEvent} from "react";
import {UpdateUser} from "../../services/auth.service";
import {styled} from "@mui/joy";
interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: any;
    };
}
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
export default function MyBilling(){
    const user = useSelector((state: RootState) => state?.auth?.user);
    const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);

    return (
        <Box>
            <Typography>
                HELLO DAY LA BILL
            </Typography>
        </Box>
    )
}
