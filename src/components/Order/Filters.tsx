import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';

function valueText(value: number) {
    return `$${value.toLocaleString('en-US')}`;
}

interface FiltersProps {
    onApplyFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters }) => {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [priceRange, setPriceRange] = React.useState<[number, number]>([2000, 4900]);
    const handleApplyFilters = () => {
        const filters = {
            startDate,
            endDate,
            priceRange,
        };
        onApplyFilters(filters);
    };
    return (
        <Stack
            useFlexGap
            direction="row"
            spacing={{ xs: 0, sm: 2 }}
            justifyContent={{ xs: 'space-between' }}
            flexWrap="wrap"
            sx={{ width: 1 }}
        >
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<FilterAltOutlined />}
                onClick={() => setOpen(true)}
            >
                Filters
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} anchor={'right'} sx={{ right: 0 }}>
                <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
                    <DialogTitle>Filters</DialogTitle>
                    <ModalClose />
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr',
                            gridTemplateRows: 'auto auto',
                            gap: 1,
                        }}
                    >
                        <FormLabel htmlFor="filters-start-date">Start date</FormLabel>
                        <div />
                        <FormLabel htmlFor="filters-end-date">End date</FormLabel>

                        <Input
                            id="filters-start-date"
                            type="date"
                            placeholder="Jan 6 - Jan 13"
                            aria-label="Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <Box sx={{ alignSelf: 'center' }}>-</Box>
                        <Input
                            id="filters-end-date"
                            type="date"
                            placeholder="Jan 6 - Jan 13"
                            aria-label="Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Box>
                    <FormControl>
                        <FormLabel>Price range</FormLabel>
                        <Slider
                            // defaultValue={[2000, 4900]}
                            value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue as [number, number])}
                            step={100}
                            min={0}
                            max={10000}
                            getAriaValueText={valueText}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valueText}
                            marks={[
                                { value: 0, label: '$0' },
                                { value: 5000, label: '$5,000' },
                                { value: 10000, label: '$10,000' },
                            ]}
                            sx={{
                                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                                    transform: 'none',
                                },
                                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                                    transform: 'translateX(-100%)',
                                },
                            }}
                        />
                    </FormControl>
                    <Button color="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
                </Stack>
            </Drawer>
        </Stack>
    );
}
export default Filters;