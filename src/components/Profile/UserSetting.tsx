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
export default function UserSetting(){
    const user = useSelector((state: RootState) => state?.auth?.user);
    const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
    const [selectedImage, setSelectedImage] = React.useState<any>(null);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [uploading, setUploading] = React.useState<boolean>();
    React.useEffect(() => {
        setIsLoaded(false);
        if (user) {
            setFormData({
                firstname: user?.firstname,
                lastname: user?.lastname,
                email: user?.email,
                phone: user?.phone,
            })
            if (user?.profilePicture) {
                setSelectedImage(user?.profilePicture)
            }
        }
        setIsLoaded(true);
    }, [user, isAuthenticated === true])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleUpdateUser = async (e: any) => {
        setUploading(true)
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        if (selectedImage instanceof File) {
            form.append('profilePicture', selectedImage);
        }
        const result = await UpdateUser(user._id, form)
        if (result) {
            setUploading(false)
        }
        window.location.reload();
    }
    return (
        <Stack
            spacing={4}
            sx={{
                display: 'flex',
                maxWidth: '800px',
                // mx: 'auto',
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
            }}
        >
            {isLoaded && (<><Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Personal info</Typography>
                    <Typography level="body-sm">
                        Customize how your profile information will apper to the networks.
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: '12', md: 'flex' }, my: 1 }}
                >
                    <Stack direction="column" spacing={1}>
                        <AspectRatio
                            ratio="1"
                            maxHeight={200}
                            sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                        >
                            {selectedImage && (
                                <img
                                    src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                                    loading="lazy"
                                    alt=""
                                />
                            )}
                            {!selectedImage && <img
                                src=''
                                loading="lazy"
                                alt=""
                            />}
                        </AspectRatio>
                        <IconButton
                            component="label"
                            aria-label="upload new picture"
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            sx={{
                                bgcolor: 'background.body',
                                position: 'absolute',
                                zIndex: 2,
                                borderRadius: '50%',
                                left: 100,
                                top: 170,
                                boxShadow: 'sm',
                            }}
                        ><VisuallyHiddenInput type="file" onChange={(e) => {
                            if (e?.target?.files) {
                                console.log(e.target.files[0])
                                setSelectedImage(e?.target?.files[0]);
                            }

                        }} />
                            <EditRoundedIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                            <FormControl
                                sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 1 }}
                            >
                                <form onSubmit={handleUpdateUser}>
                                    <FormLabel>First name</FormLabel>
                                    <Input
                                        size="sm"
                                        placeholder="First name"
                                        name="firstname"
                                        defaultValue={formData.firstname}
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Last name</FormLabel>
                                    <Input
                                        size="sm"
                                        placeholder="Last name"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Email</FormLabel>
                                    <Input
                                        size="sm"
                                        type="email"
                                        startDecorator={<EmailRoundedIcon />}
                                        placeholder="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <FormLabel sx={{ mt: 2 }}>Phone</FormLabel>
                                    <Input
                                        size="sm"
                                        placeholder="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        sx={{ flexGrow: 1 }}
                                    />
                                    {/* Add more form fields as needed */}
                                    {/* <CountrySelector
                    value={formData.country}
                    onChange={handleInputChange} /> */}
                                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2 }}>
                                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                            <Button size="sm" variant="outlined" color="neutral">
                                                Cancel
                                            </Button>
                                            {uploading ? (<Button loading size="sm" variant="solid" type='submit'>
                                                Save
                                            </Button>) : <Button size="sm" variant="solid" type='submit'>
                                                Save
                                            </Button>}
                                        </CardActions>
                                    </CardOverflow>
                                </form>


                            </FormControl>

                        </Stack>

                    </Stack>

                </Stack>

            </Card></>)}


        </Stack>
    )
}
