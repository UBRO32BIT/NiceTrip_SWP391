import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled, Grid, TabPanel, Button, FormLabel, Input, CardOverflow, CardContent, Card, Divider, Stack, FormControl, CardActions, Textarea, Chip, AspectRatio, FormHelperText } from '@mui/joy';
import { Routes, Route, Navigate, useNavigate, NavLink, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import React from 'react';
import { Add, InfoOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GetResortById, UploadResort } from '../../services/resort.service';

interface Unit {
    name: string,
    sleeps: number,
    roomType: string,
    bathrooms: number,
    kitchenType: string,
    image: File,
    features: string[],
}
const unitSchema = yup.object().shape({
    name: yup.string()
        .required("Unit name is required!")
        .max(100, "Unit name cannot exceed 100 characters!"),
    sleeps: yup.number()
        .required("Number of sleeps is required!")
        .min(1, "Must be a positive number"),
    bathrooms: yup.number()
        .required("Number of bathrooms is required!")
        .min(0, "Must not less than 0!"),
    kitchenType: yup.string()
        .required("Kitchen type is required!")
        .max(50, "Kitchen type cannot exceed 50 characters"),
    roomType: yup.string()
        .required("Room type is required")
        .max(50, "Room type cannot exceed 50 characters")
})
const resortSchema = yup.object().shape({
    name: yup.string()
        .required("Resort name is required!")
        .max(100, "Unit name cannot exceed 100 characters"),
    description: yup.string()
        .required("Description is required!")
        .max(1000, "Kitchen type cannot exceed 1000 characters"),
    location: yup.string()
        .required("Location is required!")
        .max(150, "Location cannot exceed 150 characters"),
})

export default function EditResort() {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [resort, setResort] = React.useState<any>(null);
    const [facilities, setFacilities] = React.useState<string[]>([]);
    const [attractions, setAttractions] = React.useState<string[]>([]);
    const [policies, setPolicies] = React.useState<string[]>([]);
    const [images, setImages] = React.useState<File[]>([]);
    const [units, setUnits] = React.useState<Unit[]>([]);
    const [unitImage, setUnitImage] = React.useState<File>();
    const [newFacility, setNewFacility] = React.useState<string>('');
    const [newAttraction, setNewAttraction] = React.useState<string>('');
    const [newPolicy, setNewPolicy] = React.useState<string>('');
    const [newImage, setNewImage] = React.useState<string>('')
    // States for add unit form
    const [features, setFeatures] = React.useState<string[]>([]);
    const [newFeature, setNewFeature] = React.useState<string>('')
    const [uploading, setUploading] = React.useState<boolean>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        register: registerUnit,
        handleSubmit: handleUnitSubmit,
        formState: { errors: unitErrors }
    } = useForm({
        resolver: yupResolver(unitSchema),
    })
    const {
        register: registerResort,
        handleSubmit: handleResortSubmit,
        formState: { errors: resortErrors }
    } = useForm({
        resolver: yupResolver(resortSchema),
    })

    React.useEffect(() => {
        GetResort();
    }, [])
    const GetResort = async () => {
        if (id) {
            const data = await GetResortById(id);
            console.log(data);
            setResort(data);
            setFacilities(data.facilities);
            setPolicies(data.policies);
            setAttractions(data.nearby_attractions);
            setIsLoaded(true);
        }
        else {
            navigate('/admin/resort-list');
            enqueueSnackbar(`Page not found`, { variant: "error" });
        }
    }
    const addAttraction = () => {
        console.log(newAttraction)
        if (newAttraction.trim() !== '') {
            setAttractions([...attractions, newAttraction]);
            setNewAttraction('');
        }
    }
    const deleteAttraction = (index: number) => {
        const updatedAttractions = [...attractions];
        updatedAttractions.splice(index, 1);
        setAttractions(updatedAttractions);
    }
    const addPolicy = () => {
        console.log(newPolicy)
        if (newPolicy.trim() !== '') {
            setPolicies([...policies, newPolicy]);
            setNewPolicy('');
        }
    }
    const deletePolicy = (index: number) => {
        const updatedPolicies = [...policies];
        updatedPolicies.splice(index, 1);
        setPolicies(updatedPolicies);
    }
    const addFacitity = () => {
        console.log(newFacility)
        if (newFacility.trim() !== '') {
            setFacilities([...facilities, newFacility]);
            setNewFacility('');
        }
    }
    const deleteFacility = (index: number) => {
        const updatedFacilities = [...facilities];
        updatedFacilities.splice(index, 1);
        setFacilities(updatedFacilities);
    }
    const addFeature = () => {
        if (newFeature.trim() !== '') {
            setFeatures([...features, newFeature]);
            setNewFeature('');
        }
    }
    const deleteFeature = (index: number) => {
        const updatedFeatures = [...features];
        updatedFeatures.splice(index, 1);
        setFeatures(updatedFeatures);
    }
    async function addUnit(e: any) {
        try {
            if (!unitImage) {
                throw Error("Unit image is required!")
            }
            if (!(features && features.length > 0)) {
                throw Error("At least one feature is required!");
            }
            const unit: Unit = {
                name: e.name,
                sleeps: e.sleeps,
                roomType: e.roomType,
                bathrooms: e.bathrooms,
                kitchenType: e.kitchenType,
                image: unitImage,
                features: features,
            }
            console.log(unit);
            setUnits([...units, unit]);
        }
        catch (error: any) {
            if (error.response) {
                enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
            }
            else enqueueSnackbar(`${error}`, { variant: "error" });
        }
    }
    async function uploadResort(e: any) {
        try {
            setUploading(true);
            if (!(facilities && facilities.length > 0)) {
                throw Error("At least one facility is required");
            }
            if (!(policies && policies.length > 0)) {
                throw Error("At least one policy is required");
            }
            if (!(images && images.length > 0)) {
                throw Error("At least one resort image is required")
            }
            const formData = new FormData();
            formData.append('name', e.name);
            formData.append('description', e.description);
            formData.append('location', e.location);
            formData.set('facilities', [] as any);
            facilities.forEach(function (facility) {
                formData.append('facilities', facility);
            });
            attractions.forEach(function (attraction) {
                formData.append('attractions', attraction);
            });
            policies.forEach(function (policy) {
                formData.append('policies', policy);
            });
            images.forEach(function (image) {
                formData.append('images', image);
            });
            console.log(JSON.stringify(units))
            // Serialize the object to JSON
            formData.append('units', JSON.stringify(units));
            // Append unit images
            units.forEach((unit, index) => {
                formData.append(`unitImages`, unit.image);
            });
            const data = await UploadResort(formData);
            setUploading(false);
            enqueueSnackbar("Upload successully", { variant: "success" });
            navigate('/admin/resort-list');
        }
        catch (error: any) {
            console.log(error);
            if (error.message) {
                enqueueSnackbar(`${error.message}`, { variant: "error" });
            }
            else enqueueSnackbar(`${error}`, { variant: "error" });
            setUploading(false);
        }
    }
    return (<>
        <Box sx={{ flex: 1, width: '100%', padding: '10px' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    // zIndex: 9995,
                }}
            >
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    <Box
                        component="main"
                        className="MainContent"
                        sx={{
                            px: { xs: 2, md: 6 },
                            pt: {
                                xs: 'calc(12px + var(--Header-height))',
                                sm: 'calc(12px + var(--Header-height))',
                                md: 3,
                            },
                            pb: { xs: 2, sm: 2, md: 3 },
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            height: '100dvh',
                            gap: 1,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Breadcrumbs
                                size="sm"
                                aria-label="breadcrumbs"
                                separator={<ChevronRightRoundedIcon fontSize='small' />}
                                sx={{ pl: 0 }}
                            >
                                <Link
                                    underline="none"
                                    color="neutral"
                                    href="#some-link"
                                    aria-label="Home"
                                >
                                    <HomeRoundedIcon />
                                </Link>
                                <Link
                                    underline="hover"
                                    color="neutral"
                                    href="#some-link"
                                    fontSize={12}
                                    fontWeight={500}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    underline="hover"
                                    color="neutral"
                                    href="#some-link"
                                    fontSize={12}
                                    fontWeight={500}
                                >
                                    Resorts
                                </Link>
                                <Typography color="primary" fontWeight={500} fontSize={12}>
                                    Edit
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                        <Box
                            sx={{
                                mb: 1,
                                gap: 1,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'start', sm: 'center' },
                                flexWrap: 'wrap',
                            }}
                        >
                            <Typography level="h2" component="h1">
                                Edit resort
                            </Typography>
                        </Box>
                        <Card>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Edit resort</Typography>
                                <Typography level="body-sm">
                                    TAO LA SIEU PHAN DONG VO CUC.
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack
                                direction="row"
                                spacing={3}
                                sx={{ display: { xs: '12', md: 'flex' }, my: 1 }}
                            >
                                {isLoaded && (
                                    <>
                                        <Stack direction="column" spacing={1}>

                                        </Stack>
                                        <Stack spacing={2} sx={{ flexGrow: 1, gap: 2, display: { sm: 'flex-column', md: 'flex-row' } }}>
                                            <Stack spacing={1}>
                                                <Box
                                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                                >
                                                    <form onSubmit={handleResortSubmit(uploadResort)} id="upload-resort">
                                                        <FormLabel sx={{ mt: 2 }}>Name</FormLabel>
                                                        <Input
                                                            type="text"
                                                            size="sm"
                                                            placeholder="Name of the resort"
                                                            defaultValue={resort.name}
                                                            {...registerResort("name")}
                                                        />
                                                        {resortErrors.name &&
                                                            <FormHelperText>
                                                                <InfoOutlined />
                                                                {resortErrors.name.message}
                                                            </FormHelperText>
                                                        }
                                                        <FormLabel sx={{ mt: 2 }}>Description</FormLabel>
                                                        <Textarea
                                                            size="sm"
                                                            placeholder="Details of the resort"
                                                            defaultValue={resort.description}
                                                            {...registerResort("description")}
                                                        />
                                                        {resortErrors.description &&
                                                            <FormHelperText>
                                                                <InfoOutlined />
                                                                {resortErrors.description.message}
                                                            </FormHelperText>
                                                        }
                                                        <FormLabel sx={{ mt: 2 }}>Location</FormLabel>
                                                        <Input
                                                            type="text"
                                                            size="sm"
                                                            placeholder="Location of the resort"
                                                            defaultValue={resort.location}
                                                            {...registerResort("location")}
                                                        />
                                                        {resortErrors.location &&
                                                            <FormHelperText>
                                                                <InfoOutlined />
                                                                {resortErrors.location.message}
                                                            </FormHelperText>
                                                        }
                                                        <FormLabel sx={{ mt: 2 }}>Facilities</FormLabel>
                                                        <Box sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                        }}>
                                                            <Input
                                                                type="text"
                                                                size="sm"
                                                                placeholder="Facilities"
                                                                name="facilities"
                                                                value={newFacility}
                                                                onChange={(e: any) => setNewFacility(e.target.value)}
                                                            />
                                                            <Button variant="soft" size="sm" onClick={addFacitity}><Add /></Button>
                                                        </Box>
                                                        <Box sx={{
                                                            mt: 2
                                                        }}>
                                                            {facilities && facilities.map && facilities.map((facility: string, index: number) => {
                                                                return (
                                                                    <Box key={index}>
                                                                        <Box sx={{
                                                                            display: "flex",
                                                                            gap: 1,
                                                                            my: 1
                                                                        }}>
                                                                            <Chip
                                                                                color="neutral"
                                                                                size="md"
                                                                                variant="soft"
                                                                            >
                                                                                {facility}
                                                                            </Chip>
                                                                            <Button size="sm" color='danger' variant='soft' onClick={() => deleteFacility(index)}><DeleteIcon /></Button>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>
                                                        <FormLabel sx={{ mt: 2 }}>Nearby Attractions</FormLabel>
                                                        <Box sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                        }}>
                                                            <Input
                                                                type="text"
                                                                size="sm"
                                                                placeholder="Nearby Acctractions"
                                                                name="attractions"
                                                                value={newAttraction}
                                                                onChange={(e: any) => setNewAttraction(e.target.value)}
                                                            />
                                                            <Button variant="soft" size="sm" onClick={addAttraction}><Add /></Button>
                                                        </Box>
                                                        <Box sx={{
                                                            mt: 2
                                                        }}>
                                                            {attractions && attractions.map && attractions.map((attraction: string, index: number) => {
                                                                return (
                                                                    <Box key={index}>
                                                                        <Box sx={{
                                                                            display: "flex",
                                                                            gap: 1,
                                                                            my: 1
                                                                        }}>
                                                                            <Chip
                                                                                color="neutral"
                                                                                size="md"
                                                                                variant="soft"
                                                                            >
                                                                                {attraction}
                                                                            </Chip>
                                                                            <Button size="sm" color='danger' variant='soft' onClick={() => deleteAttraction(index)}><DeleteIcon /></Button>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>
                                                        <FormLabel sx={{ mt: 2 }}>Policies</FormLabel>
                                                        <Box sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                        }}>
                                                            <Input
                                                                type="text"
                                                                size="sm"
                                                                placeholder="Policies"
                                                                name="Policies"
                                                                value={newPolicy}
                                                                onChange={(e: any) => setNewPolicy(e.target.value)}
                                                            />
                                                            <Button variant="soft" size="sm" onClick={addPolicy}><Add /></Button>
                                                        </Box>
                                                        <Box sx={{
                                                            mt: 2
                                                        }}>
                                                            {policies && policies.map && policies.map((policy: string, index: number) => {
                                                                return (
                                                                    <Box key={index}>
                                                                        <Box sx={{
                                                                            display: "flex",
                                                                            gap: 1,
                                                                            my: 1
                                                                        }}>
                                                                            <Chip
                                                                                color="neutral"
                                                                                size="md"
                                                                                variant="soft"
                                                                            >
                                                                                {policy}
                                                                            </Chip>
                                                                            <Button size="sm" color='danger' variant='soft' onClick={() => deletePolicy(index)}><DeleteIcon /></Button>
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Box>

                                                        <FormLabel sx={{ mt: 2 }}>Resort images</FormLabel>
                                                        <Input
                                                            size="sm"
                                                            type="file"
                                                            slotProps={{
                                                                input: {
                                                                    accept: "image/*",
                                                                }
                                                            }}
                                                            placeholder="Image"
                                                            onChange={(e) => {
                                                                const files = e?.target?.files;
                                                                if (files) {
                                                                    if (images.length < 15) {
                                                                        setImages((prev) => [...prev, ...Array.from(files)]);
                                                                    }
                                                                    else enqueueSnackbar(`You can only upload up to 15 images!`, { variant: "error" });
                                                                }
                                                            }}
                                                        />
                                                        {images?.length !== 0 && (
                                                            <Box sx={{ display: 'flex', width: 1, flexWrap: 'wrap', mt: 2 }}>
                                                                {images.map(function (url, imageIndex) {
                                                                    return (<div style={{ position: "relative" }}>
                                                                        <img src={URL.createObjectURL(url)} alt="Pasted Image" height={90} style={{ borderRadius: "5px", margin: '2px' }} />
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                setImages((prev) => prev.filter((_, index) => index !== imageIndex));
                                                                            }}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: 5,
                                                                                right: 5,
                                                                            }}
                                                                        >
                                                                            <DeleteForeverIcon />
                                                                        </button>
                                                                    </div>
                                                                    )
                                                                })}
                                                            </Box>
                                                        )}
                                                        <FormLabel sx={{ mt: 2 }}>Units</FormLabel>
                                                    </form>
                                                </Box>
                                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2, }}>
                                                    <CardContent orientation="horizontal">
                                                        <div>
                                                            <Typography level="body-xs">Total units:</Typography>
                                                            <Typography fontSize="lg" fontWeight="lg">
                                                                {units.length}
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                                        <Button size="sm" variant="outlined" color="neutral">
                                                            Cancel
                                                        </Button>
                                                        <Button form="upload-resort" loading={uploading} size="sm" variant="solid" type='submit'>
                                                            Save
                                                        </Button>
                                                    </CardActions>
                                                </CardOverflow>
                                            </Stack>
                                        </Stack>
                                    </>
                                )}
                            </Stack>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
    );
}